import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { Mail, Phone, Eye, EyeOff, Lock } from "lucide-react-native";
import { useState } from "react";
import { useThemeVariables } from "../../components/ThemeVariables";
import { StyleSheet } from "react-native";


const SignupForm = () => {
    const mutedForeground = useThemeVariables('--muted-foreground');
    const foreground = useThemeVariables('--foreground');
    const styles = useSignUpStyles();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <Input className="bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]"
                style={{borderRadius: 10, height: 55}}
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Mail} className="text-foreground" />
                </InputSlot>
                <InputField placeholder="Email Address" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input}/>
            </Input>

            <Input className="bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]"
                style={{borderRadius: 10, height: 55}}
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Phone}  className="text-foreground" />
                </InputSlot>
                <InputField placeholder="Phone Number" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input}/>
            </Input>

            <Input className='bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]' 
                style={{borderRadius: 10, height: 55}}
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Lock}  className="text-foreground" />
                </InputSlot>
                <InputField placeholder="Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"}/>
                <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon as={showPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>

            <Input className="bg-muted data-[focus=true]:border-foreground data-[focus=true]:border-[1px]"
                style={{borderRadius: 10, height: 55}}
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Lock}  className="text-foreground" />
                </InputSlot>
                <InputField placeholder="Confirm Password" placeholderTextColor={mutedForeground} cursorColor={foreground} style={styles.input} type={showPassword ? "text" : "password"}/>
                <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon as={showPassword ? EyeOff : Eye}  color={mutedForeground} />
                </InputSlot>
            </Input>
        </>
    )
}

function useSignUpStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
        input: {
          color: foreground,
          fontSize: 16,
          fontWeight: '500',
        }
      })
}

export default SignupForm;
