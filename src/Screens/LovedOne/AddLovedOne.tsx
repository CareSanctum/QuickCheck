import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Header from "@/src/Components/Header";
import AddLovedOneForm from "./AddLovedOneForm";
const AddLovedOne = () => {
    return (
        <SafeAreaView className="flex-1 px-5 bg-background">
            <Header />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bottomOffset={10} keyboardShouldPersistTaps="handled">
                    <View className="my-10 justify-center">
                        <Text className="font-semibold text-foreground text-[30px]">Add Someone Special</Text>
                        <Text className="font-medium text-mutedForeground text-[16px] ">Add the contact details of someone you care about and never worry about missing their urgent calls.</Text>
                    </View>
                    <AddLovedOneForm />
                </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default AddLovedOne;