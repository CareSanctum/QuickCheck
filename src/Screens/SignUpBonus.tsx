import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../App.Navigation";
import { useThemeVariables } from "../Components/ThemeVariables";
import { LinearGradient } from "expo-linear-gradient";
import { Star, Sparkles } from "lucide-react-native";

/**
 * SignUpBonus Component
 * 
 * Displays after successful sign-up to showcase the bonus QuickCheck.
 * Features a celebratory design with coin, credits, and routing to home.
 */
export default function SignUpBonus() {
  const navigation = useNavigation<NavigationProp>();
  const primary = useThemeVariables("--primary");
  const foreground = useThemeVariables("--foreground");

  /**
   * Handles navigation to home screen
   */
  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-background">
      {/* Main content container */}
      <View className="flex-1 justify-center items-center px-6">
        
        {/* White card container with shadow */}
        <View 
          className="bg-white rounded-3xl p-8 w-full max-w-sm items-center"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(99, 102, 241, 0.2)',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          
          {/* Top decorative elements */}
          <View className="absolute top-6 left-6">
            <Star size={16} color={primary} style={{ opacity: 0.6 }} />
          </View>
          <View className="absolute top-8 right-8">
            <Sparkles size={14} color={primary} style={{ opacity: 0.5 }} />
          </View>
          
          {/* Gold coin with number 7 - using coin.png asset */}
          <View className="items-center mb-8">
            <View className="items-center mb-2 relative">
              {/* Coin image background */}
              <Image
                source={require("../../assets/coin.png")}
                className="w-28 h-28"
                resizeMode="contain"
              />
              
              {/* Number 7 overlay on top of the coin */}
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-4xl font-black text-white" style={{ textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}>
                  7
                </Text>
              </View>
            </View>
            
            {/* Credits text below coin */}
            <Text className="text-amber-800 font-semibold text-sm uppercase tracking-wide">
              Credits
            </Text>
          </View>
          
          {/* Main heading */}
          <Text className="text-3xl font-bold text-center mb-2" style={{ color: primary }}>
            You've got 1
          </Text>
          <Text className="text-3xl font-bold text-center mb-4" style={{ color: primary }}>
            free QuickCheck!
          </Text>
          
          {/* Bonus explanation */}
          <Text className="text-mutedForeground text-center text-base leading-6 mb-8">
            As a sign-up bonus, you receive 7 credits.
          </Text>
          
          {/* OK button */}
          <TouchableOpacity
            className="w-full items-center justify-center rounded-2xl h-14"
            style={{ backgroundColor: primary }}
            onPress={handleContinue}
            accessibilityRole="button"
            accessibilityLabel="Continue to home"
          >
            <Text className="text-white font-semibold text-lg uppercase tracking-wide">
              OK
            </Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    </View>
  );
}
