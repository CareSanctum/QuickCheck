import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useChangePassword } from "@/src/Hooks/Password.hook";
import ErrorBox from "@/src/Components/ErrorBox";
import SuccessBox from "@/src/Components/SuccessBox";
import { ALLAUTH_API_CODE, ALLAUTH_CODES, getErrorMessage, isAllauthCode } from "@/src/Network/AllauthCodes";
const schema = z.object({
    currentPassword: z.string(),
    newPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?!\d+$).*/, { message: "Password cannot consist of numbers only" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})
.refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});


const ChangePasswordForm = () => {
    const { control, handleSubmit, formState: { errors }, reset, watch} = useForm({
        resolver: zodResolver(schema),
    });
    
    const [showcurrentPassword, setShowcurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiMessage, setApiMessage] = useState<{message: string, type: 'success' | 'error'} | null>(null);
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const {mutate: changePassword, status: changePasswordStatus, error: changePasswordError} = useChangePassword();
    const onSubmit = (data: z.infer<typeof schema>) => {
        changePassword({current_password: data.currentPassword, new_password: data.newPassword}, {
            onSuccess: () => {
                reset();
                setApiMessage({message: 'Password changed successfully', type: 'success'});
            },
            onError: (error: any) => {
                switch (error?.response?.status) {
                    case 429:
                        setApiMessage({message: "Too many requests. Please try again later.", type: 'error'});
                        break;
                    case 400:
                        const errors = error?.response?.data?.errors;
                        if (errors && Array.isArray(errors)) {
                            const errorCode: ALLAUTH_API_CODE = isAllauthCode(errors[0]?.code) ? errors[0].code : ALLAUTH_CODES.DEFAULT_ERROR;
                            setApiMessage({message: getErrorMessage(errorCode), type: 'error'});
                            return;
                        }
                    case 500:
                        setApiMessage({message: "Something went wrong. Please try again later.", type: 'error'});
                        break;
                    default:
                        setApiMessage({message: "Something went wrong. Please try again later.", type: 'error'});
                        break;
                }
            }
        });
    }
    const styles = useChangePasswordFormStyles();

    return (
        <View className="flex-1 p-4">
            <Text className="text-foreground text-medium font-semibold  my-2">Current Password</Text>
            <Input className={`bg-card border border-border ${errors.currentPassword ? 'border-destructive' : 'data-[focus=true]:border-foreground'}`}
                style={{borderRadius: 10, height: 55}}
            >
                <Controller 
                    control={control}
                    name="currentPassword"
                    render={({ field }) => (
                        <InputField placeholder="Current Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showcurrentPassword ? "text" : "password"} value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <InputSlot className="pr-3" onPress={() => setShowcurrentPassword(!showcurrentPassword)}>
                    <InputIcon as={showcurrentPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>
            {errors.currentPassword && <Text className="text-destructive text-[14px] font-medium">{errors.currentPassword.message}</Text>}

            <Text className="text-foreground text-medium font-semibold  my-2">New Password</Text>
            <Input className={`bg-card border border-border ${errors.newPassword ? 'border-destructive' : 'data-[focus=true]:border-foreground'}`}
                style={{borderRadius: 10, height: 55}}
            >
                <Controller 
                    control={control}
                    name="newPassword"
                    render={({ field }) => (
                        <InputField placeholder="New Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showNewPassword ? "text" : "password"} value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <InputSlot className="pr-3" onPress={() => setShowNewPassword(!showNewPassword)}>
                    <InputIcon as={showNewPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>
            {errors.newPassword && <Text className="text-destructive font-medium">{errors.newPassword.message}</Text>}

            <Text className="text-foreground text-medium font-semibold  my-2">Confirm Password</Text> 
            <Input className={`bg-card border border-border ${errors.confirmPassword ? 'border-destructive' : 'data-[focus=true]:border-foreground'}`}
                style={{borderRadius: 10, height: 55}}
            >
                <Controller 
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <InputField placeholder="Confirm Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showConfirmPassword ? "text" : "password"} value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <InputSlot className="pr-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <InputIcon as={showConfirmPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>
            {errors.confirmPassword && <Text className="text-destructive font-medium">{errors.confirmPassword.message}</Text>}



            <View className="flex-row justify-center mt-4"> 
                <Button 
                    className="px-6 py-3 w-[75%] h-[50px] items-center justify-center bg-primary" 
                    style={{borderRadius: 10}} 
                    onPress={handleSubmit(onSubmit)}
                    isDisabled={changePasswordStatus === 'pending' || !watch('currentPassword') || !watch('newPassword') || !watch('confirmPassword')}
                >
                    {changePasswordStatus === 'pending' ? <ButtonSpinner color={primaryForeground} /> : <ButtonText className="text-primaryForeground font-medium">Change Password</ButtonText>   }
                </Button>
            </View>
            {apiMessage?.type === 'success' && <SuccessBox message={apiMessage.message} />}        
            {apiMessage?.type === 'error' && <ErrorBox message={apiMessage.message} />}
        </View>
    )
}

function useChangePasswordFormStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
        input: {
          color: foreground,
          fontSize: 16,
          fontWeight: '400',
        }
      })
}

export default ChangePasswordForm;