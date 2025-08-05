import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { Eye, EyeOff, ArrowRight } from "lucide-react-native"
import { useThemeVariables } from "../../Components/ThemeVariables"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { useResetPassword } from "../../Hooks/PasswordReset.hook"
import { getItem, KEYS, removeMany } from "@/src/Storage";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";

const schema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/^(?!\d+$).*/, 'Password cannot consist of numbers only'),
    confirmPassword: z.string()
})
.refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

const VALID_ERROR_CODES = [
    'password_too_common',
    'password_too_similar',
    'invalid_password',
  ] as const;
  
type ErrorCode = typeof VALID_ERROR_CODES[number];

const ERROR_MESSAGES: Record<ErrorCode, string> = {
    'password_too_common': 'The password you entered is too common. Please try again.',
    'password_too_similar': 'The password cannot be same as your email. Please try again.',
    'invalid_password': 'The password you entered is invalid. Please try again.',
};

function isErrorCode(code: unknown): code is ErrorCode {
    return typeof code === 'string' && VALID_ERROR_CODES.includes(code as ErrorCode);
}

export const NewPasswordForm = ({setApiErrorMsg}: {setApiErrorMsg: (msg: string) => void}) => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const styles = useNewPasswordFormStyles();
    const [showPassword, setShowPassword] = useState(false);
    const {mutate: resetPassword, status: resetPasswordStatus, error: resetPasswordError} = useResetPassword();
    const navigation = useNavigation<NavigationProp>();
    const { control, handleSubmit, formState: { errors }, watch, reset} = useForm({
        resolver: zodResolver(schema),
    });
    // console.log(errors.password);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        resetPassword({
            password: data.password,
        }, {
            onSuccess: () => {
                console.log("Password reset successful");
                reset();
                removeMany([KEYS.PASSWORD_RESET_KEY, KEYS.PASSWORD_RESET_TOKEN]);
                navigation.navigate('PasswordResetSuccess');
            },
            onError: (error: any) => {
                if (error?.response?.status === 400){
                    const errors = error?.response?.data?.errors;
                    if (errors && Array.isArray(errors)) {
                        const errorCode: ErrorCode = isErrorCode(errors[0]?.code) ? errors[0].code : 'invalid_password';
                        setApiErrorMsg(ERROR_MESSAGES[errorCode]);
                        return;
                    } 
                }else{
                    setApiErrorMsg("Something went wrong. Please try again later.");
                    return;
                }
                setApiErrorMsg("Something went wrong. Please try again later.");
            }
        });
    }

    return (
        <>
            <View className="gap-[10px]">
                <Input className={`bg-muted border-[1px] ${errors.password ? ' border-destructive' : ' data-[focus=true]:border-foreground'}`}
                    style={{borderRadius: 10, height: 55}}
                >
                    <Controller 
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <InputField placeholder="New Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"} value={field.value} onChangeText={field.onChange} />
                        )}
                    />
                    <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                        <InputIcon as={showPassword ? EyeOff : Eye}  color={mutedForeground} />
                    </InputSlot>
                </Input>
                {errors.password && <Text className="text-destructive text-[14px] font-medium">{errors.password.message}</Text>}

                <Input className={`bg-muted border-[1px] ${errors.confirmPassword ? ' border-destructive' : ' data-[focus=true]:border-foreground'}`}
                    style={{borderRadius: 10, height: 55}}
                >
                    <Controller 
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <InputField placeholder="Confirm Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"} value={field.value} onChangeText={field.onChange} />
                        )}
                    />
                    <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                        <InputIcon as={showPassword ? EyeOff : Eye}  color={mutedForeground} />
                    </InputSlot>
                </Input>
                {errors.confirmPassword && <Text className="text-destructive text-[14px] font-medium">{errors.confirmPassword.message}</Text>}
            </View>

            <View className="flex-row justify-center"> 
                <Button className="px-6 py-3 w-[75%] h-[50px] items-center justify-center bg-primary" 
                    style={{borderRadius: 10}} 
                    onPress={handleSubmit(onSubmit)}
                    isDisabled={!watch('password') || !watch('confirmPassword') || resetPasswordStatus === 'pending'}
                >
                    {
                        resetPasswordStatus === 'pending' ? 
                        <ButtonSpinner color={primaryForeground} /> : 
                        <ButtonText className="text-primaryForeground font-medium">Update</ButtonText>
                    }
                </Button>
            </View>
        </>
    )
}

function useNewPasswordFormStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
      input: {
        color: foreground,
        fontSize: 16,
        fontWeight: '500',
      }
    })
  }