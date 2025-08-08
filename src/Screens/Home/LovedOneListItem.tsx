import { QuickCheckListItem, useCreateQuickCheck } from "@/src/Hooks/QuickCheck.hook";
import { View, TouchableOpacity, Text } from "react-native";
import { Avatar, AvatarFallbackText,  } from "@/components/ui/avatar";
import { Button, ButtonSpinner } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { formatDate, getPriorityColor } from "./utils";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
const LovedOneListItem = ({item}: {item: QuickCheckListItem}) => {
    const navigation = useNavigation<NavigationProp>();
    const {mutate: createQuickCheck, status: createQuickCheckStatus, error: createQuickCheckError} = useCreateQuickCheck(item.id);
    const primaryForeground = useThemeVariables('--primary-foreground');
    return (
        <TouchableOpacity
            onPress={() => {navigation.navigate('LovedOneHistory', {loved_one_id: item.id});}}
            delayPressIn={100}
        >
            <View className="items-center">
                <View className="flex-row items-center px-4 py-3">
                    <Avatar className="bg-primary mr-3" size="md">
                        <AvatarFallbackText className="text-xl text-primaryForeground">{item.nickname}</AvatarFallbackText>
                    </Avatar>
                    <View className="flex-1">
                        <View className="flex-1 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                            <Text className="text-foreground text-xl font-semibold mr-3" >
                                {item.nickname}
                            </Text>
                            {item.latest_response_status === "IN_PROGRESS" && (
                                <View className="rounded-full bg-sky-300 px-2 py-1">
                                    <Text className="text-primaryForeground text-xs">{item.latest_response_status?.replaceAll("_", " ")}</Text>
                                </View>
                            )}
                            {item.latest_response_status === "ATTENDED" && (
                                item.latest_response_is_seen ? (
                                    null
                                ): (
                                    <View className={`px-2 py-1 rounded-full ${getPriorityColor(item.latest_response_urgency)}`}>
                                        <Text className="text-xs font-medium text-white">
                                            {item.latest_response_urgency?.replaceAll("_", " ")}
                                        </Text>
                                    </View>
                                )
                            )}
                            </View>
                            <Text className="text-mutedForeground ">{item.latest_response_closed_at && formatDate(item.latest_response_closed_at)}</Text>
                        </View>
                        <View className="flex-1 flex-row items-center justify-between">
                            <Text
                                numberOfLines={1}
                                className={`flex-1 mr-2 ${item.latest_response_is_seen ? "text-md text-mutedForeground" : "text-md  text-foreground"}`}
                            >
                                {item.latest_response_preview 
                                    ? item.latest_response_preview 
                                    : "You can check up on this person!"}
                            </Text>
                            <Button className="bg-primary rounded-full" onPress={() => createQuickCheck()} isDisabled={createQuickCheckStatus === 'pending'}>
                                {
                                    createQuickCheckStatus === 'pending' ? 
                                    <ButtonSpinner color={primaryForeground} /> : 
                                    <Text className="text-primaryForeground text-sm font-semibold">+</Text>
                                }
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LovedOneListItem;

