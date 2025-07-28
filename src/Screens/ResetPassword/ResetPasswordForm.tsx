import { View, Text, StyleSheet } from "react-native";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App.Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mail } from 'lucide-react-native';
import { useRequestPasswordReset } from "../../Hooks/PasswordReset.hook";
import { useThemeVariables } from "../../Components/ThemeVariables";

const schema = z.object({
    email: z.email({message: 'Invalid email address'}),
});

const ResetPasswordForm = () => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { mutate: requestPasswordReset, status: requestPasswordResetStatus, error: requestPasswordResetError } = useRequestPasswordReset();
    const styles = useResetPaswordFormStyles();
    const { control, handleSubmit, formState: { errors }, getValues, watch} = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmit = (data: z.infer<typeof schema>) => {
        requestPasswordReset(data.email, {
            onSuccess: () => {
                navigation.navigate('PasswordResetOTP');
            },
            onError: (error) => {
                console.log('Password reset request failed', error);
            }
        });
      };
    return (
        <>
                <View>
                    <Input
                        className={`bg-muted border-[1px] ${errors.email ? ' border-destructive' : ' data-[focus=true]:border-foreground'}`}
                        style={{borderRadius: 10, height: 55}}
                    >
                        <InputSlot className="pl-3">
                            <InputIcon as={Mail}  color={mutedForeground} />
                        </InputSlot>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <InputField placeholder="Email" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
                            )}
                        />
                    </Input>
                    {errors.email && <Text className="text-destructive text-[14px] font-medium mt-2">{errors.email.message}</Text>}
                </View>

                <View className="flex-row justify-center"> 
                    <Button className="px-6 py-3 w-[75%] h-[50px] items-center justify-center bg-primary" 
                        style={{borderRadius: 10}} 
                        onPress={handleSubmit(onSubmit)}
                        isDisabled={requestPasswordResetStatus === "pending" || !watch('email') }
                    >
                            {
                                requestPasswordResetStatus === "pending" ? (
                                    <ButtonSpinner color={primaryForeground} />
                                ) : (
                                    <ButtonText className="text-primaryForeground font-medium">Continue</ButtonText>
                                )
                            }
                    </Button>
                </View>
        </>
    );
};

function useResetPaswordFormStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
      input: {
        color: foreground,
        fontSize: 16,
        fontWeight: '500',
      }
    })
  }

export default ResetPasswordForm;