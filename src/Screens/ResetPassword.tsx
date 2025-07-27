import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../components/Icon';
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { ArrowRight, Mail } from 'lucide-react-native';
import { useThemeVariables } from '../components/ThemeVariables';

const ResetPassword = () => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const styles = useLoginStyles();
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <View style={{gap: 15}}>
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity>
                        <Icon
                            name="ArrowLeft"
                            className="text-foreground"
                            size={26}
                        />
                    </TouchableOpacity>
                </View>

                <View className="my-10 justify-center">
                    <Text className="font-semibold text-foreground text-[30px]">Reset Password</Text>
                    <Text className="font-medium text-mutedForeground text-[16px] ">We'll email you instructions on how to reset your password</Text>
                </View>

                <View>
                    <Input className='bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]'
                        style={{borderRadius: 10, height: 55}}
                    >
                        <InputSlot className="pl-3">
                            <InputIcon as={Mail}  color={mutedForeground} />
                        </InputSlot>
                        <InputField placeholder="Email" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input}/>
                    </Input>
                </View>

                <View className="flex-row justify-center"> 
                    <TouchableOpacity 
                        className="px-6 py-3 bg-primary w-[75%] h-[50px] items-center justify-center" 
                        style= {{borderRadius: 10}}  
                    >
                        <View className="flex-row items-center gap-2">
                            <Text className="text-primaryForeground font-medium">
                                Continue
                            </Text>
                            <ArrowRight color={primaryForeground} size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
  );
};

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

export default ResetPassword;