import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock } from "lucide-react-native";
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { useThemeVariables } from "../components/ThemeVariables";
import { useState } from "react";

const NewPassword = () => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');

    const styles = useLoginStyles();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <View style={{gap: 15}}>
                <View className="flex-row items-center">
                    <TouchableOpacity>
                        <ArrowLeft color={foreground} size={26} />
                    </TouchableOpacity>
                </View>

                <View className="my-10 justify-center">
                    <Text className="font-semibold text-foreground text-[30px]">Update Password</Text>
                    <Text className="font-medium text-mutedForeground text-[16px] ">Enter your new password</Text>
                </View>

                <View className="gap-[10px]">
                    <Input className='bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]' 
                        style={{borderRadius: 10, height: 55}}
                    >
                        <InputField placeholder="New Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"}/>
                        <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                            <InputIcon as={showPassword ? EyeOff : Eye}  color={mutedForeground} />
                        </InputSlot>
                    </Input>

                    <Input className='bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]' 
                        style={{borderRadius: 10, height: 55}}
                    >
                        <InputField placeholder="Confirm Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"}/>
                        <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                            <InputIcon as={showPassword ? EyeOff : Eye}  color={mutedForeground} />
                        </InputSlot>
                    </Input>
                </View>

                <View className="flex-row justify-center"> 
                <TouchableOpacity 
                    className="px-6 py-3 bg-primary w-[75%] h-[50px] items-center justify-center" 
                    style= {{borderRadius: 10}}  
                >
                    <View className="flex-row items-center gap-2">
                        <Text className="text-primaryForeground font-medium">
                            Update Password
                        </Text>
                        <ArrowRight color={primaryForeground} size={20} />
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    );
}

function useLoginStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
      input: {
        color: foreground,
        fontSize: 16,
        fontWeight: '500',
      }
    })
  }

export default NewPassword;