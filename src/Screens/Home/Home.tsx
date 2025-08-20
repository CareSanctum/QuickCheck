import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, RefreshControl } from "react-native";
import { HomeHeader } from "@/src/Components/Header";
import HomeSearch from "./HomeSearch";
import QuickCheckList from "./QuickCheckList";
import { Fab, FabIcon } from "@/components/ui/fab";
import { UserPlus } from "lucide-react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/src/App.Navigation";
import AddLovedOneBanner from "./AddLovedOneBanner";
import { useQuickCheckList } from "@/src/Hooks/QuickCheck.hook";

const Home = () => {
  const primaryForeground = useThemeVariables('--primary-foreground');
  const navigation = useNavigation<NavigationProp>();
  const { data: quickCheckList, status: quickCheckListStatus, isLoading, refetch } = useQuickCheckList();
  
  // Check if the list is empty
  const isListEmpty = !quickCheckList || quickCheckList.length === 0;
  
  return (
    <SafeAreaView className="flex-1 bg-background">
      <HomeHeader title="QuickCheck"/>
      <HomeSearch/>
      
      {/* Conditional rendering: Show either the list or empty state */}
      {isListEmpty ? (
        <ScrollView 
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={[primaryForeground || '#6366f1']}
              tintColor={primaryForeground || '#6366f1'}
            />
          }
        >
          <AddLovedOneBanner />
        </ScrollView>
      ) : (
        <QuickCheckList />
      )}
      
      {/* Show FAB only when there are items in the list */}
      {!isListEmpty && (
        <Fab
          placement="bottom right"
          className="bg-primary p-6"
          onPress={() => navigation.navigate('AddLovedOne')}
        >
          <FabIcon as={UserPlus} color={primaryForeground}/>
        </Fab>
      )}
    </SafeAreaView>
  );
};

export default Home;    