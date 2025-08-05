import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { Text, View } from "react-native";
import QuickCheckList from "./QuickCheckList";

const HomeSearch = () => {
    const foreground = useThemeVariables('--foreground');
    const mutedForeground = useThemeVariables('--muted-foreground');

    return (
        <View className="px-4 py-4">
            <Input className='h-12 bg-card border border-border data-[focus=true]:border-foreground rounded-full'>
                <InputSlot className="pl-5">
                    <InputIcon as={Search} color={foreground} />
                </InputSlot>
                <InputField placeholder="Search" className="text-xl"/>
            </Input>
        </View>
    )

}
export default HomeSearch;
