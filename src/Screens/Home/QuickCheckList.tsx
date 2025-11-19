import { FlatList, Text } from "react-native";
import { useQuickCheckList } from "@/src/Hooks/QuickCheck.hook";
import { LoadingScreen } from "../LoadingScreen";
import { useQuickCheckStream } from "@/src/Hooks/QuickCheckStream.hook";
import LovedOneListItem from "./LovedOneListItem";
const QuickCheckList = () => {
    const {data: quickCheckList, isLoading, status: quickCheckListStatus, error: quickCheckListError, refetch} = useQuickCheckList();
    useQuickCheckStream(quickCheckListStatus === 'success');
    if (quickCheckListStatus === 'pending') {
        return <LoadingScreen />
    }
    if (quickCheckListStatus === 'error') {
        return <Text>Error: {quickCheckListError.message}</Text>
    }
    return (
        <FlatList 
            data={quickCheckList}
            refreshing={isLoading}
            onRefresh={refetch}
            
            keyExtractor={(item) => item.id.toString()}
            className="flex-1 px-4 mt-4"
            renderItem={({item}) => <LovedOneListItem item={item} />}            
        />
    )   
}
export default QuickCheckList;