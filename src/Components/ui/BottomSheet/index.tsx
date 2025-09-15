import React, { Ref, useRef } from 'react';
import {
    BottomSheetModal as GHBottomSheetModal,
    type BottomSheetModalProps as GHBottomSheetModalProps,
    BottomSheetView,
    BottomSheetBackdrop,
    type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useThemeVariables } from '@/src/Components/ThemeVariables';

type BottomSheetModalProps = GHBottomSheetModalProps & {
    ref?: Ref<GHBottomSheetModal>;
};

function DefaultBackdrop(props: BottomSheetBackdropProps) {
    return (
        <BottomSheetBackdrop
            opacity={0.6}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
            {...props}
        />
    );
}

export function BottomSheetModal(props: BottomSheetModalProps) {
    const { ref: externalRef, ...otherProps } = props;
    const innerRef = useRef<GHBottomSheetModal>(null);

    const card = useThemeVariables('--card');
    const mutedForeground = useThemeVariables('--muted-foreground');

    return (
        <GHBottomSheetModal
            ref={externalRef ?? innerRef}
            backgroundStyle={{ backgroundColor: card }}
            handleIndicatorStyle={{ backgroundColor: mutedForeground }}
            backdropComponent={DefaultBackdrop}
            enablePanDownToClose={true}
            {...otherProps}
        />
    );
}

export { BottomSheetView, BottomSheetBackdrop, BottomSheetModalProps};
