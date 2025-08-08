import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { useThemeVariables } from "../../Components/ThemeVariables";
import { useState } from "react";
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useLogin } from "../../Hooks/Login.hook";
import { NavigationProp } from "../../App.Navigation";
import { useNavigation } from "@react-navigation/native";

const schema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .refine((value) => {
            // Check if it's a valid email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) return true;
            
            // Check if it's a 10-digit phone number
            const phoneRegex = /^\d{10}$/;
            if (phoneRegex.test(value)) return true;
            
            return false;
        }, "Username is not valid"),
    password: z.string(),
});

const LoginForm = ({setApiErrorMsg}: {setApiErrorMsg: (msg: string) => void}) => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const styles = useLoginFormStyles();
    const navigation = useNavigation<NavigationProp>();
    const [showPassword, setShowPassword] = useState(true);

    const { control, handleSubmit, formState: { errors }, reset, watch} = useForm({
        resolver: zodResolver(schema),
    });
    const {mutate: login, status: loginStatus, error: loginError} = useLogin();

    const onSubmit = (data: z.infer<typeof schema>) => {
        login({username: data.username, password: data.password}, {
            onSuccess: () => {
              reset();
            },
            onError: (error: any) => {
                switch(error?.response?.status){
                    case 400:
                        setApiErrorMsg("Username password mismatch");
                        break;
                    case 401:
                        setApiErrorMsg("Email not verified, Please verify your email");
                        break;
                    default:
                        setApiErrorMsg("Something went wrong. Please try again later.");
                        break;
                }
            }
        });
    }

    return (
      <>
        <View className="gap-[10px]">
          <Input className='bg-card border border-border data-[focus=true]:border-foreground'
            style={{borderRadius: 10, height: 55}}
          >
            <InputSlot className="pl-3">
              <InputIcon as={Mail}  color={foreground} />
            </InputSlot>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <InputField placeholder="Email or Phone" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
              )}
            />
          </Input>
          {errors.username && <Text className="text-destructive text-[14px] font-medium">{errors.username.message}</Text>}

          <Input className='bg-card border border-border data-[focus=true]:border-foreground' 
            style={{borderRadius: 10, height: 55}}
          >
            <InputSlot className="pl-3">
              <InputIcon as={Lock}  color={foreground} />
            </InputSlot>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <InputField placeholder="Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"} value={field.value} onChangeText={field.onChange} />
              )}
            />
            <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
              <InputIcon as={showPassword ? EyeOff : Eye}  color={foreground} />
            </InputSlot>
          </Input>
          {errors.password && <Text className="text-destructive text-[14px] font-medium">{errors.password.message}</Text>}
        </View>

        <View className="flex-row justify-center"> 
          <Button 
            className="px-6 py-3 bg-primary w-[75%] h-[50px] items-center justify-center" 
            style= {{borderRadius: 10}}
            onPress={handleSubmit(onSubmit)}
            isDisabled={!watch('username') || !watch('password') || loginStatus === 'pending'}
          >
            {loginStatus === 'pending' ? <ButtonSpinner className="text-primaryForeground" /> : <ButtonText className="text-primaryForeground font-medium">Sign in</ButtonText>}
          </Button>
        </View>      
      </>
    );
}

function useLoginFormStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
      input: {
        color: foreground,
        fontSize: 16,
        fontWeight: '400',
      }
    })
  }

export default LoginForm;
