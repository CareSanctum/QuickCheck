import { View, Text } from "react-native"

const NewPasswordRules = () => {
    return (
        <View>
            <Text className="text-foreground text-medium font-base mt-4">Your new password must contain atleast 8 characters and must not consist of numbers only.</Text>
        </View>
    )
}

export default NewPasswordRules;