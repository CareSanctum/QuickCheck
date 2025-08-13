import { generateUrl } from "../Network/Urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";


async function createLovedOne(data: any) {
    try{
        const response = await axiosInstance.post(generateUrl('LOVED_ONE_CREATE'), data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export interface LovedOneDetails {
    id: number;
    name: string;
    phone: string;
    relationship: string;
    preferred_language: string;
    address: string;
    notes: string;
}

async function detailsLovedOne(id: number) {
    try{
        const response = await axiosInstance.get(generateUrl('LOVED_ONE_DETAILS', {id}));
        const data: LovedOneDetails = {
            id: response.data.id,
            name: response.data.nickname,
            phone: response.data.phone_number,
            relationship: response.data.relationship,
            preferred_language: response.data.preferred_contact_language,
            address: response.data.metadata.address,
            notes: response.data.metadata.notes,
        }
        return {data: data};
    } catch (error) {
        throw error;
    }
}

interface updateLovedOne {
    nickname: string;
    phone_number: string;
    relationship: string;
    preferred_contact_language: string;
    metadata: {
        address: string;
        notes: string;
    }
}

async function updateLovedOne({id, data}: {id: number, data: updateLovedOne}) {
    try{
        const response = await axiosInstance.put(generateUrl('LOVED_ONE_UPDATE', {id}), data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function useUpdateLovedOne() {   
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateLovedOne,
        onSuccess: (_, {id}) => {
            queryClient.invalidateQueries({ queryKey: ['loved-one-details', id] });
        },
    })
}

export function useLovedOneDetails(id: number) {
    return useQuery({
        queryKey: ['loved-one-details', id],
        queryFn: () => detailsLovedOne(id),
    })
}

export function useCreateLovedOne() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLovedOne,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quick-check-list'] });
            
        },
    })
}