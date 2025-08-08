import { FlatList, Text } from "react-native";
import { useQuickCheckList } from "@/src/Hooks/QuickCheck.hook";
import { LoadingScreen } from "../LoadingScreen";
import LovedOneListItem from "./LovedOneListItem";
const QuickCheckList = () => {
    const {data: quickCheckList, isLoading, status: quickCheckListStatus, error: quickCheckListError, refetch} = useQuickCheckList();
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
            className="flex-1"
            renderItem={({item}) => <LovedOneListItem item={item} />}            
        />
    )   
}
export default QuickCheckList;