import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/src/App.Navigation";

/**
 * AddLovedOneBanner Component
 * 
 * Displays when no loved ones are added to the app.
 * Provides a call-to-action to add the first loved one.
 * 
 * Features:
 * - Large adaptive icon for visual appeal
 * - Clear messaging about the empty state
 * - Prominent "Add Now" button
 * - Dashed border design for premium feel
 */
export default function AddLovedOneBanner() {
  // Navigation hook for handling button press
  const navigation = useNavigation<NavigationProp>();
  
  // Theme variables for consistent styling
  const primary = useThemeVariables("--primary");
  const foreground = useThemeVariables("--foreground");

  /**
   * Handles navigation to the Add Loved One screen
   */
  const handleAddLovedOne = () => {
    navigation.navigate("AddLovedOne");
  };

  return (
    // Main container - centers content vertically and horizontally
    <View className="flex-1 justify-center items-center px-4">
      
      {/* Dashed outline wrapper for premium visual appeal */}
      <View
        className="rounded-3xl border-2 p-6 items-center w-full max-w-sm"
        style={{
          borderStyle: "dashed",
          borderColor: "rgba(99, 102, 241, 0.25)", // Subtle indigo border
          backgroundColor: "rgba(255,255,255,0.6)", // Semi-transparent white background
        }}
      >
        
        {/* Large adaptive icon for visual impact */}
        <View className="items-center mb-2">
          <Image
            source={require("../../../assets/icons/adaptive-icon.png")}
            className="w-48 h-48" // 192x192 pixels for prominence
            resizeMode="contain"
          />
        </View>

        {/* Main heading - bold and prominent */}
        <Text className="text-xl font-bold text-foreground text-center mb-2">
          No Loved Ones Added
        </Text>

        {/* Descriptive text - provides context and guidance */}
        <Text className="text-mutedForeground text-center text-base">
          Ensure you are always available for your family by adding your first loved one
        </Text> 

        {/* Primary call-to-action button */}
        <TouchableOpacity
          className="mt-5 w-full items-center justify-center rounded-full h-12 bg-primary"
          onPress={handleAddLovedOne}
          accessibilityRole="button"
          accessibilityLabel="Add Loved One"
        >
          <Text className="text-white font-semibold">Add Now</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
