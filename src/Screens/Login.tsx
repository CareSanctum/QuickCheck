import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import { useThemeVariables } from '../components/ThemeVariables';
import { Input, InputField, InputSlot, InputIcon} from '@/components/ui/input';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react-native';



const Login = () => {
  const mutedForeground = useThemeVariables('--muted-foreground');
  const foreground = useThemeVariables('--foreground');
  const [showPassword, setShowPassword] = useState(true);
  const styles = useLoginStyles();
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
          {/* Main container with padding and spacing */}
          <View style={{gap: 15}}>
            {/* Sign in title */}
            <View className="flex-row items-center gap-4">
              <TouchableOpacity>
                <Icon
                  name="ArrowLeft"
                  className="text-foreground"
                  size={26}
                />
              </TouchableOpacity>
            </View>

            <View className="my-10 justify-center items-center">
              <Text className="font-semibold text-foreground text-[30px]">Welcome Back</Text>
            </View>
    
            {/* Account section */}
            <View style={{gap: 10}}>
              <Input className='bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]'
                style={{borderRadius: 10, height: 55}}
              >
                <InputSlot className="pl-3">
                  <InputIcon as={Mail}  color={mutedForeground} />
                </InputSlot>
                <InputField placeholder="Email or Phone" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input}/>
              </Input>
    
              <Input className='bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]' 
                style={{borderRadius: 10, height: 55}}
              >
                 <InputSlot className="pl-3">
                   <InputIcon as={Lock}  color={mutedForeground} />
                 </InputSlot>
                 <InputField placeholder="Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"}/>
                 <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                   <InputIcon as={showPassword ? EyeOff : Eye}  color={mutedForeground} />
                 </InputSlot>
              </Input>

             </View>
    
            {/* Button row */}
            <View className="flex-row justify-center"> 
              <TouchableOpacity 
                className="px-6 py-3 bg-primary w-[75%] h-[50px] items-center justify-center" 
                style= {{borderRadius: 10}}  
              >
                <Text className="text-primaryForeground font-medium">
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-4">
              <TouchableOpacity 
                className="px-4 py-2 self-end"
                style={{borderRadius: 5}}
               >
                 <Text className="text-foreground font-medium text-lg">Forgot password?</Text>
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


export default Login;