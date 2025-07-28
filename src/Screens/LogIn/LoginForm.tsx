import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { useThemeVariables } from "../../Components/ThemeVariables";
import { useState } from "react";
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

const schema = z.object({
    email: z.email({message: 'Invalid email address'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
});

const LoginForm = () => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const styles = useLoginFormStyles();
    const [showPassword, setShowPassword] = useState(true);
    return (
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

       </View>
    );
}

function useLoginFormStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
      input: {
        color: foreground,
        fontSize: 16,
        fontWeight: '500',
      }
    })
  }

export default LoginForm;
