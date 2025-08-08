import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

const schema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
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
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log(data);
    }
    const styles = useChangePasswordFormStyles();

    return (
        <View className="flex-1 p-4">
            <Text className="text-foreground text-base  mb-2">Current Password</Text>
            <Input className="bg-card border border-border data-[focus=true]:border-foreground"
                style={{borderRadius: 10, height: 55}}
            >
                <Controller 
                    control={control}
                    name="oldPassword"
                    render={({ field }) => (
                        <InputField placeholder="Old Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <InputSlot className="pr-3" onPress={() => setShowOldPassword(!showOldPassword)}>
                    <InputIcon as={showOldPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>

            <Text className="text-foreground text-base  mb-2">New Password</Text>
            <Input className="bg-card border border-border data-[focus=true]:border-foreground"
                style={{borderRadius: 10, height: 55}}
            >
                <Controller 
                    control={control}
                    name="newPassword"
                    render={({ field }) => (
                        <InputField placeholder="New Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <InputSlot className="pr-3" onPress={() => setShowNewPassword(!showNewPassword)}>
                    <InputIcon as={showNewPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>

            <Text className="text-foreground text-base  mb-2">Confirm Password</Text> 
            <Input className="bg-card border border-border data-[focus=true]:border-foreground"
                style={{borderRadius: 10, height: 55}}
            >
                <Controller 
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <InputField placeholder="Confirm Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <InputSlot className="pr-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <InputIcon as={showConfirmPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>
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