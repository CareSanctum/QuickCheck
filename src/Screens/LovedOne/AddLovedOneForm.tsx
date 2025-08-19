import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { User, Phone, MapPin, Globe} from "lucide-react-native";
import { useThemeVariables } from "../../Components/ThemeVariables"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { useResetPassword } from "../../Hooks/Password.hook"
import { getItem, KEYS, removeMany } from "@/src/Storage";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { useCreateLovedOne, useUpdateLovedOne } from "../../Hooks/LovedOne.hook";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Dropdown } from 'react-native-element-dropdown';
import INFlag from "../../Components/Icons/IN";

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().length(10, {message: 'Must be 10 digits'}),
    relationship: z.string(),
    preferred_language: z.string(),
    address: z.string().regex(/^\d{6}$/, 'Must be Numeric and 6 digits').optional(),
    notes: z.string().optional(),
})

const relationshipOptions = [
    {label: 'Father', value: 'FATHER'},
    {label: 'Mother', value: 'MOTHER'},
    {label: 'Grandfather', value: 'GRANDFATHER'},
    {label: 'Grandmother', value: 'GRANDMOTHER'},
    {label: 'Brother', value: 'BROTHER'},
    {label: 'Sister', value: 'SISTER'},
    {label: 'Spouse', value: 'SPOUSE'},
    {label: 'Mother-in-law', value: 'MOTHER_IN_LAW'},
    {label: 'Father-in-law', value: 'FATHER_IN_LAW'},
    {label: 'Son', value: 'SON'},
    {label: 'Daughter', value: 'DAUGHTER'},
    {label: 'Friend', value: 'FRIEND'},
    {label: 'Relative', value: 'RELATIVE'},
    {label: 'Other', value: 'OTHER'},
]

const preferredLanguageOptions = [
    {label: 'English', value: 'ENGLISH'},
    {label: 'Hindi', value: 'HINDI'},

]
interface AddLovedOneFormProps {
    defaultValues?: z.infer<typeof schema>;
    isEdit?: boolean;
    lovedOneId?: number;
}
const AddLovedOneForm = ({defaultValues, isEdit = false, lovedOneId}: AddLovedOneFormProps) => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const navigation = useNavigation<NavigationProp>();
    const foreground = useThemeVariables('--foreground');
    const card = useThemeVariables('--card');
    const border = useThemeVariables('--border');
    const [showPassword, setShowPassword] = useState(false);
    const styles = useAddLovedOneFormStyles();
    const primaryForeground = useThemeVariables('--primary-foreground');
    const cardForeground = useThemeVariables('--card-foreground');
    const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
    const { mutate: createLovedOne, status: createLovedOneStatus, error: createLovedOneError } = isEdit ? useUpdateLovedOne() : useCreateLovedOne();
    const insets = useSafeAreaInsets();
    const { control, handleSubmit, formState: { errors }, reset, watch} = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });
    const onSubmit = async (data: z.infer<typeof schema>) => {
        const request_obj = {
            nickname: data.name,
            phone_number: data.phone,
            relationship: data.relationship,
            preferred_contact_language: data.preferred_language,
            metadata: {
                address: data.address,
                notes: data.notes,
            }
        }
        createLovedOne(isEdit ? {id: lovedOneId, data: request_obj} : request_obj, {
            onSuccess: () => {
                reset();
                navigation.navigate('HomeTabNavigator', { screen: 'HomeTab' });
            },
        });
    }
    return(
        <View className="flex-1 pb-5">
            <View className="flex-row items-center justify-start gap-2 mb-2">
                <User color={foreground} size={16} />
                <Text className="text-foreground text-[16px] font-semibold">Name</Text>
            </View>
            <Input className="bg-card border border-border data-[focus=true]:border-foreground mb-2"
                style={{borderRadius: 10, height: 55}}
            >

                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <InputField placeholder="e.g., Dad, Mom" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} />
                    )}
                />
            </Input>
            {errors.name && <Text className="text-destructive text-[14px] font-medium mb-2">{errors.name.message}</Text>}
            
            <View className="flex-row items-center justify-start gap-2 mb-2">
                <Phone color={foreground} size={16} />
                <Text className="text-foreground text-[16px] font-semibold">Phone Number</Text>
            </View>
            
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
            {errors.phone && <Text className="text-destructive text-[14px] font-medium mb-2">{errors.phone.message}</Text>}
            
            <View className="flex-row items-center justify-start gap-2 mt-2 mb-2">
                <Text className="text-foreground text-[16px] font-semibold">Relationship</Text>
            </View>
            <Controller 
                control={control}
                name="relationship"
                render={({ field }) => (
                    <>
                    <Dropdown
                        style={{
                            borderWidth: 1,
                            borderColor: errors.relationship ? 'red' : border,
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            height: 48,
                            backgroundColor: card,
                        }}
                        containerStyle={{
                            backgroundColor: card,
                            borderWidth: 0,
                            borderRadius: 10,
                            marginTop: insets.top,
                            marginBottom: insets.bottom,
                            maxHeight: '85%',
                        }}
                        itemTextStyle={{
                            color: cardForeground
                        }}
                        activeColor={card}
                        autoScroll={false}
                        mode="modal"
                        backgroundColor="rgba(0,0,0,0.5)"
                        placeholderStyle={{ color: mutedForeground, fontWeight: '500' }}
                        selectedTextStyle={{ color: foreground }}
                        data={relationshipOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Relationship"
                        value={field.value}
                        onChange={(item) => field.onChange(item.value)}
                    />
                    </>
                )}
            />

            <View className="flex-row items-center justify-start gap-2 mt-2 mb-2">
                <Globe color={foreground} size={16} />
                <Text className="text-foreground text-[16px] font-semibold">Preferred Language</Text>
            </View>
            <Controller 
                control={control}
                name="preferred_language"
                render={({ field }) => (
                    <>
                    <Dropdown
                        style={{
                            borderWidth: 1,
                            borderColor: errors.preferred_language ? 'red' : border,
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            height: 48,
                            backgroundColor: card,
                        }}
                        containerStyle={{
                            backgroundColor: card,
                            borderWidth: 0,
                            borderRadius: 10,
                            marginTop: insets.top,
                            marginBottom: insets.bottom,
                            maxHeight: '85%',
                        }}
                        itemTextStyle={{
                            color: cardForeground
                        }}
                        activeColor={card}
                        mode="modal"
                        autoScroll={false}
                        placeholderStyle={{ color: mutedForeground, fontWeight: '500' }}
                        selectedTextStyle={{ color: foreground }}
                        showsVerticalScrollIndicator={false}
                        data={preferredLanguageOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Language"
                        value={field.value}
                        onChange={(item) => field.onChange(item.value)}
                    />
                    </>
                )}
            />

            <View className="flex-row items-center justify-start gap-2  mt-2 mb-2">
                <MapPin color={foreground} size={16} />
                <Text className="text-foreground text-[16px] font-semibold">Address(Optional)</Text>
            </View>
            <Input className="bg-card border border-border data-[focus=true]:border-foreground mb-2"
                style={{borderRadius: 10, height: 55}}
            >
                <Controller
                    control={control}
                    rules={{
                        required: false,
                    }}
                    name="address"
                    render={({ field }) => (
                        <InputField placeholder="PIN Code" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} multiline={true}/>
                    )}
                />
            </Input>
            {errors.address && <Text className="text-destructive text-[14px] font-medium mb-2">{errors.address.message}</Text>}

            <View className="flex-row items-center justify-start gap-2 mb-2">
                <Text  className="text-foreground text-[16px] font-semibold">Notes(Optional)</Text>
            </View>
            <Input className="bg-card border border-border data-[focus=true]:border-foreground mb-2"
                style={{borderRadius: 10, height: 55}}
            >
                <Controller
                    control={control}
                    rules={{
                        required: false,
                    }}
                    name="notes"
                    render={({ field }) => (
                        <InputField placeholder="Notes" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} value={field.value} onChangeText={field.onChange} multiline={true}/>
                    )}
                />
            </Input>
            {errors.notes && <Text className="text-destructive text-[14px] font-medium">{errors.notes.message}</Text>}

            <Button className="px-6 py-3  h-[50px] items-center justify-center bg-primary" 
                style={{borderRadius: 10}}
                onPress={handleSubmit(onSubmit)}
                isDisabled={!watch('name') || !watch('phone') || createLovedOneStatus === 'pending' || !watch('relationship') || !watch('preferred_language')}
            >
                {
                    createLovedOneStatus === 'pending' ? 
                    <ButtonSpinner color={primaryForeground} /> : 
                    <ButtonText className="text-primaryForeground text-sm font-semibold">
                        {isEdit ? 'Update Loved One' : 'Add Loved One'}
                    </ButtonText>
                }
            </Button>
            
        </View>
    )
}

function useAddLovedOneFormStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
        input: {
          color: foreground,
          fontSize: 16,
          fontWeight: '500',
        }
      })
}

export default AddLovedOneForm;