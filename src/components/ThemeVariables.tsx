import { useColorScheme } from "nativewind";
import { rawColors } from "@/components/ui/gluestack-ui-provider/config";

export function useThemeVariables(name: string): string | undefined {
  const { colorScheme } = useColorScheme();
  const themeVars = colorScheme === "dark" ? rawColors.dark : rawColors.light;
  return themeVars[name as keyof typeof themeVars];
}