import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import EventSource from 'react-native-sse';
import { generateUrl } from '../Network/Urls';
import { getItem, KEYS } from '../Storage';
import type { QuickCheckListItem } from './QuickCheck.hook';

type StreamPayload = {
  loved_one_id: number;
  latest_quickcheck_id: number;
  latest_response: string | null;
  latest_response_status: string | null;
  latest_response_urgency: string | null;
  latest_response_closed_at: string | null;
  latest_response_is_seen: boolean | null;
};

type CustomEvent = 'quickcheck_updated';

export function useQuickCheckStream(enabled: boolean = true) {
  const queryClient = useQueryClient();
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const token = getItem(KEYS.SESSION_TOKEN);
    if (!token) return;

    const url = generateUrl('QUICK_CHECK_STREAM');
    const es = new EventSource<CustomEvent>(url, {
      headers: {
        'X-Session-Token': token,
      },
    //   retryTime: 3000,, {DefaultEventMap}, {DefaultEventMap}
    });
    esRef.current = es;

    es.addEventListener('quickcheck_updated', (event) => {
      try {
        const payload: StreamPayload = JSON.parse(event.data as unknown as string);
        queryClient.setQueryData<QuickCheckListItem[] | undefined>(['quick-check-list'], (old) => {
          if (!old) return old;
          return old.map((item) => {
            if (item.id !== payload.loved_one_id) return item;
            return {
              ...item,
              latest_quickcheck_id: payload.latest_quickcheck_id ?? item.latest_quickcheck_id,
              latest_response_preview: payload.latest_response ?? item.latest_response_preview,
              latest_response_status: payload.latest_response_status ?? item.latest_response_status,
              latest_response_urgency: payload.latest_response_urgency ?? item.latest_response_urgency,
              latest_response_closed_at: payload.latest_response_closed_at ?? item.latest_response_closed_at,
              latest_response_is_seen: payload.latest_response_is_seen ?? item.latest_response_is_seen,
              unseen_count: payload.latest_response_is_seen ? item.unseen_count : (item.unseen_count ?? 0) + 1,
            } as QuickCheckListItem;
          });
        });
      } catch (e) {
        // ignore malformed payload
      }
    });

    es.addEventListener('error', () => {
      // errors are auto-retried by react-native-sse
    });

    return () => {
    console.log('closing stream');
      es.close();
      esRef.current = null;
    };
  }, [enabled, queryClient]);
}



