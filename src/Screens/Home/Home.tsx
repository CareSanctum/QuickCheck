import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { HomeHeader } from "@/src/Components/Header";
import HomeSearch from "./HomeSearch";
import QuickCheckList from "./QuickCheckList";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <HomeHeader title="QuickCheck"/>
        <HomeSearch/>
        <QuickCheckList />
    </SafeAreaView>
  );
};

export default Home;    