import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { Mail, Phone, Eye, EyeOff, Lock } from "lucide-react-native";
import { useState } from "react";
import { useThemeVariables } from "../../Components/ThemeVariables";
import { StyleSheet, Text, View} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSignup } from "../../Hooks/Signup.hook";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { NavigationProp } from "@/src/App.Navigation";
import { useNavigation } from "@react-navigation/native";
import INFlag from "../../Components/Icons/IN";

const schema = z.object({
    email: z.email({message: 'Invalid email address'}),
    phone: z.string().length(10, {message: 'Phone number must be 10 digits'}),
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


const SignupForm = () => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const styles = useSignUpStyles();
    const [showPassword, setShowPassword] = useState(false);
    const primaryForeground = useThemeVariables('--primary-foreground');
    const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
    const { control, handleSubmit, formState: { errors }, reset, watch} = useForm({
        resolver: zodResolver(schema),
    });
    const {mutate: signup, status: signupStatus, error: signupError} = useSignup();
    const navigation = useNavigation<NavigationProp>();
    const onSubmit = async (data: z.infer<typeof schema>) => {
        signup({email: data.email, phone_number: data.phone, password: data.password}, {
            onSuccess: () => {
                reset();
                console.log("Signup successful");
                navigation.navigate('SignupVerifyOTP');
            },
            onError: (error: any) => {
                setApiErrorMsg("Something went wrong. Please try again later.");
            }
        });
    }

    return (
        <>
            <Input className="bg-card border border-border data-[focus=true]:border-foreground"
                style={{borderRadius: 10, height: 55}}
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Mail} className="text-foreground" />
                </InputSlot>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <InputField placeholder="Email Address" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
                    )}
                />
            </Input>
            {errors.email && <Text className="text-destructive text-[14px] font-medium">{errors.email.message}</Text>}

            <View className="flex-row items-center gap-3">
                <View className="flex-row items-center bg-card border border-border" style={{borderRadius: 10, paddingHorizontal: 12, height: 55}}>
                    <View className="items-center justify-center">
                        <INFlag width={24} height={16} />
                    </View>
                    <Text className="ml-2 text-foreground text-base">+91</Text>
                </View>
                <Input className="flex-1 bg-card border border-border data-[focus=true]:border-foreground"
                    style={{borderRadius: 10, height: 55}}
                >
                    <Controller 
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <InputField placeholder="Phone Number" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
                        )}
                    />
                </Input>
            </View>
            {errors.phone && <Text className="text-destructive text-[14px] font-medium">{errors.phone.message}</Text>}

            <Input className='bg-card border border-border data-[focus=true]:border-foreground'  
                style={{borderRadius: 10, height: 55}}
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Lock}  className="text-foreground" />
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

            <Input className="bg-card border border-border data-[focus=true]:border-foreground"  
                style={{borderRadius: 10, height: 55}}
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Lock}  className="text-foreground" />
                </InputSlot>
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <InputField placeholder="Confirm Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"} value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon as={showPassword ? EyeOff : Eye}  color={foreground} />
                </InputSlot>
            </Input>
            {errors.confirmPassword && <Text className="text-destructive text-[14px] font-medium">{errors.confirmPassword.message}</Text>}

            <View className="flex-row justify-center"> 
                <Button className="px-6 py-3 w-[75%] h-[50px] items-center justify-center bg-primary" 
                    style={{borderRadius: 10}} 
                    onPress={handleSubmit(onSubmit)}
                    isDisabled={!watch('password') || !watch('confirmPassword') || signupStatus === 'pending'}
                >
                    {
                        signupStatus === 'pending' ? 
                        <ButtonSpinner color={primaryForeground} /> : 
                        <ButtonText className="text-primaryForeground font-medium">Sign Up</ButtonText>
                    }
                </Button>
            </View>
        </>
    )
}

function useSignUpStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
        input: {
          color: foreground,
          fontSize: 16,
          fontWeight: '400',
        }
      })
}

export default SignupForm;
