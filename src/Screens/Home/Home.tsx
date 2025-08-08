import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { HomeHeader } from "@/src/Components/Header";
import HomeSearch from "./HomeSearch";
import QuickCheckList from "./QuickCheckList";
import { Fab, FabIcon } from "@/components/ui/fab";
import { UserPlus } from "lucide-react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/src/App.Navigation";

const Home = () => {
  const primaryForeground = useThemeVariables('--primary-foreground');
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView className="flex-1 bg-background">
      <HomeHeader title="QuickCheck"/>
        <HomeSearch/>
        <QuickCheckList />
        <Fab
        placement="bottom right"
        className="bg-primary p-6"
        onPress={() => navigation.navigate('AddLovedOne')}
        >
          <FabIcon as={UserPlus} color={primaryForeground}/>
        </Fab>
    </SafeAreaView>
  );
};

export default Home;    