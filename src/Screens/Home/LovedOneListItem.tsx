import { QuickCheckListItem } from "@/src/Hooks/QuickCheck.hook";
import { View, TouchableOpacity, Text } from "react-native";
import { Avatar, AvatarFallbackText,  } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const LovedOneListItem = ({item}: {item: QuickCheckListItem}) => {
    return (
        <TouchableOpacity
            onPress={() => {console.log(item)}}
        >
            <View className="items-center">
                <View className="flex-row items-center px-4 py-3">
                    <Avatar className="bg-primary mr-3" size="md">
                        <AvatarFallbackText className="text-xl text-primaryForeground">{item.nickname}</AvatarFallbackText>
                    </Avatar>
                    <View className="flex-1">
                        <View className="flex-1 flex-row items-center justify-between">
                            <Text className="text-foreground text-xl font-semibold" >
                                {item.nickname}
                            </Text>
                            <Text className="text-mutedForeground ">7:28pm</Text>
                        </View>
                        <View className="flex-1 flex-row items-center">
                            <Text
                                numberOfLines={1}
                                className={`flex-1 mr-2 ${item.latest_response_is_seen ? "text-md text-mutedForeground" : "text-md font-semibold text-foreground"}`}
                            >
                            {item.latest_response_preview 
                                ? item.latest_response_preview 
                                : "You can check up on this person!"}
                            </Text>
                            <View className="rounded-full bg-destructive px-2 py-1">
                                <Text className="text-foreground text-xs">{item.latest_response_urgency?.replaceAll("_", " ") || "URGENT"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Button className="w-full bg-primary w-[50%]" style={{borderRadius: 10}}>
                    <Text className="text-foreground text-sm font-semibold">Check Up</Text>
                </Button>
            </View>
        </TouchableOpacity>
    )
}

export default LovedOneListItem;