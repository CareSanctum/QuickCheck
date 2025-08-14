import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/src/Hooks/Profile.hook";

const schema = z.object({
    full_name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    email: z.string().email({ message: "Enter a valid email" }),
    profile_picture_url: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof schema>;

const EditProfileForm = () => {
    const { data: profile } = useProfile();

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(schema),
        values: {
            full_name: profile?.full_name ?? "",
            phone: profile?.phone ?? "",
            email: profile?.email ?? "",
            profile_picture_url: profile?.profile_picture_url ?? null,
        },
    });

    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');

    const styles = useEditProfileFormStyles();

    const onSubmit = (values: FormValues) => {
        // TODO: hook up to update profile mutation when available
        console.log("submit profile:", values);
    };

    return (
        <View className="flex-1 px-4">
            <View className="items-center mb-6">
                <Avatar size="xl" className="bg-primary overflow-hidden rounded-full">
                    {profile?.profile_picture_url ? (
                        <AvatarImage
                            source={{ uri: profile.profile_picture_url }}
                            resizeMode="cover"
                            className="absolute inset-0 w-full h-full"
                            style={{ transform: [{ scale: 2 }] }}
                        />
                    ) : null}
                </Avatar>
                <Text className="text-mutedForeground mt-2">Avatar</Text>
            </View>

            <Text className="text-foreground text-base my-2">Name</Text>
            <Input className="bg-card border border-border data-[focus=true]:border-foreground" style={{ borderRadius: 10, height: 55 }}>
                <Controller
                    control={control}
                    name="full_name"
                    render={({ field }) => (
                        <InputField
                            placeholder="Your name"
                            placeholderTextColor={mutedForeground}
                            cursorColor={foreground}
                            style={styles.input}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                    )}
                />
            </Input>

            <Text className="text-foreground text-base my-2">Phone</Text>
            <Input className="bg-card border border-border opacity-75" style={{ borderRadius: 10, height: 55 }}>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <InputField
                            placeholder="Your phone"
                            placeholderTextColor={mutedForeground}
                            cursorColor={foreground}
                            style={styles.input}
                            value={field.value}
                            onChangeText={field.onChange}
                            keyboardType="phone-pad"
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    )}
                />
            </Input>

            <Text className="text-foreground text-base my-2">Email</Text>
            <Input className="bg-card border border-border opacity-75" style={{ borderRadius: 10, height: 55 }}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <InputField
                            placeholder="Email"
                            placeholderTextColor={mutedForeground}
                            cursorColor={foreground}
                            style={styles.input}
                            value={field.value}
                            onChangeText={field.onChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    )}
                />
            </Input>

            <View className="flex-row justify-center mt-6">
                <Button className="px-6 py-3 w-[75%] h-[50px] items-center justify-center bg-primary" style={{ borderRadius: 10 }} onPress={handleSubmit(onSubmit)}>
                    <ButtonText className="text-primaryForeground font-medium">Save Changes</ButtonText>
                </Button>
            </View>
        </View>
    );
};

function useEditProfileFormStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
        input: {
            color: foreground,
            fontSize: 16,
            fontWeight: '400',
        },
    });
}

export default EditProfileForm;
