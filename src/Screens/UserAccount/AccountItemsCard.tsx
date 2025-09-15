import { View, TouchableOpacity, Text, ActivityIndicator, Linking, BackHandler, Platform } from "react-native";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { ChevronRightIcon, Handshake, KeyRound, LogOutIcon, Trash2, UserPen, X, FileText, ArrowUpRight, ExternalLinkIcon } from "lucide-react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useLogout } from "@/src/Hooks/Logout.hook";
import { Fragment, useRef, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NavigationProp } from "@/src/App.Navigation";
import { BottomSheetModal, BottomSheetView } from "@/src/Components/ui/BottomSheet";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useDeleteAccount } from "@/src/Hooks/DeleteAccount.hook";
import { generateUrl } from "@/src/Network/Urls";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from "sp-react-native-in-app-updates";

// const inAppUpdates = new SpInAppUpdates(
//     true,
// );
type AccountItemsCardProps = {
  onEditProfile: () => void;
};

const AccountItemsCard = ({ onEditProfile }: AccountItemsCardProps) => {
    const insets = useSafeAreaInsets();
    const foreground = useThemeVariables('--foreground'); 
    const destructive = useThemeVariables('--destructive');
    const { mutate: logout, status: logoutStatus } = useLogout();
    const navigation = useNavigation<NavigationProp>();
    const SignOutBottomSheetModalRef = useRef<any>(null);
    const isSignOutSheetOpenRef = useRef(false);
    const DeleteAccountBottomSheetModalRef = useRef<any>(null);
    const isDeleteAccountSheetOpenRef = useRef(false);
    const shouldLogoutAfterDeleteDismissRef = useRef(false);

    const pressDeleteAccount = () => {
        isDeleteAccountSheetOpenRef.current = true;
        DeleteAccountBottomSheetModalRef.current?.present();
    }

    const handleCancelDeleteAccount = () => {
        DeleteAccountBottomSheetModalRef.current?.dismiss();
    }

    const pressSignOut = () => {
        isSignOutSheetOpenRef.current = true;
        SignOutBottomSheetModalRef.current?.present();
    }

    const handleCancelSignOut = () => {
        SignOutBottomSheetModalRef.current?.dismiss();
    }

    useFocusEffect(
        useCallback(() => {
          const onBack = () => {
            if (isDeleteAccountSheetOpenRef.current) {
              DeleteAccountBottomSheetModalRef.current?.dismiss();
              return true;
            }
            if (isSignOutSheetOpenRef.current) {
              SignOutBottomSheetModalRef.current?.dismiss();
              return true;
            }
            return false;
          };
      
          const backSub = BackHandler.addEventListener('hardwareBackPress', onBack);
          const navUnsub = navigation.addListener('beforeRemove', (e) => {
            if (isDeleteAccountSheetOpenRef.current || isSignOutSheetOpenRef.current) {
              e.preventDefault();
              onBack();
            }
          });
      
          return () => {
            backSub.remove();
            navUnsub();
          };
        }, [navigation])
      );

    const menuItems = [
        { id: 1, title: "Edit Profile", onPress: () => { onEditProfile() }, icon: <UserPen size={22} color={foreground} />, isExternal: false },
        { id: 2, title: "Change Password", onPress: () => { navigation.navigate('ChangePassword') }, icon: <KeyRound size={22} color={foreground} />, isExternal: false },
        // { id: 3, title: "Check Updates", onPress: () => { checkUpdates() }, icon: <ArrowUpRight size={22} color={foreground} /> },
        { id: 4, title: "Privacy Policy", onPress: () => {Linking.openURL(generateUrl('PRIVACY_POLICY'))}, icon: <Handshake size={22} color={foreground} />, isExternal: true },
        { id: 5, title: "Terms & Conditions", onPress: () => {Linking.openURL(generateUrl('TERMS_AND_CONDITIONS'))}, icon: <FileText size={22} color={foreground} />, isExternal: true },
		{ id: 6, title: "Delete Account", onPress: pressDeleteAccount, icon: <Trash2 size={22} color={foreground} />, isExternal: false },
        
    ];
	const { mutateAsync: deleteAccountAsync, isPending: deleteAccountPending } = useDeleteAccount();
    const handleDeleteAccount = async () => {
        try {
          await deleteAccountAsync();
          shouldLogoutAfterDeleteDismissRef.current = true;
          DeleteAccountBottomSheetModalRef.current?.dismiss();
        } catch (e) {
          // no-op: optionally surface an error toast/state here
        }
      };
    return (
        <Card className="p-4 bg-card gap-4 border-border" style={{borderRadius: 10, borderWidth: 1}}>
            {menuItems.map((item, index) => (
                <Fragment key={item.id}>
                    <View key={item.id}>
                        <TouchableOpacity onPress={item.onPress}>
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    {item.icon}
                                    <Text className="pl-2 text-lg text-foreground">
                                        {item.title}
                                    </Text>
                                </View>
                                {item.isExternal ? <ExternalLinkIcon size={22} color={foreground}/> : <ChevronRightIcon size={22} color={foreground}/>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Divider className="bg-border" />
                    <BottomSheetModal ref={DeleteAccountBottomSheetModalRef}
                    onChange={(index) => { isDeleteAccountSheetOpenRef.current = index >= 0; }}
                    onDismiss={() => { 
                        isDeleteAccountSheetOpenRef.current = false; 
                        if (shouldLogoutAfterDeleteDismissRef.current) {
                            shouldLogoutAfterDeleteDismissRef.current = false;
                            logout();
                        }
                    }}
                    >
                        <BottomSheetView
                            className="px-4 pt-4" 
                            style={{ paddingBottom: insets.bottom + 20 }}
                        >
                            {deleteAccountPending ? (
                                <ButtonSpinner color={destructive} />
                            ) : (
                                <>
                                    <View className="mb-4">
                                        <Text className="text-foreground font-semibold text-2xl">Are you sure?</Text>
                                        <Text className="text-mutedForeground font-semibold text-lg">If you proceed, your account and all the associated data will be permanently deleted from our system under 90 days.</Text>
                                    </View>        
                                    <Button className="bg-destructive h-[50px]" style={{ borderRadius: 10 }} onPress={handleDeleteAccount}>
                                        <ButtonText className="text-destructiveForeground text-lg font-medium">Request Account Deletion</ButtonText>
                                    </Button>
                                    <TouchableOpacity className="flex-row justify-center p-2 my-4" onPress={handleCancelDeleteAccount}>
                                        <Text className="text-foreground font-medium">Cancel</Text>
                                    </TouchableOpacity>
                                </>
                            )}

                        </BottomSheetView>
                    </BottomSheetModal>
                </Fragment>
            ))}
            <View>
                <TouchableOpacity onPress={pressSignOut}>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                                <LogOutIcon size={22} color={destructive}/>
                                <Text className="pl-2 text-lg text-destructive">
                                    Sign Out
                                </Text>
                        </View>
                        <ChevronRightIcon size={22} color={destructive}/>
                    </View>
                </TouchableOpacity>
                <BottomSheetModal
                    ref={SignOutBottomSheetModalRef}
                    onChange={(index) => { isSignOutSheetOpenRef.current = index >= 0; }}
                    onDismiss={() => { isSignOutSheetOpenRef.current = false; }}
                >
                    <BottomSheetView
                    className="px-4 pt-4" 
                    style={{ paddingBottom: insets.bottom + 20 }}
                    >
                        {logoutStatus === "pending" ? (
                            <ButtonSpinner color={destructive} />
                        ) : (
                            <>
                                <View className="mb-4">
                                    <Text className="text-foreground font-semibold text-2xl">Sign Out ?</Text>
                                    <Text className="text-mutedForeground font-semibold text-lg">Do you want to sign out of your account?</Text>
                                </View>
                                <Button className="bg-destructive h-[50px]" style={{ borderRadius: 10 }} onPress={() => logout()}>
                                    <ButtonText className="text-destructiveForeground text-lg font-medium">Sign Out</ButtonText>
                                </Button>
                                <TouchableOpacity className="flex-row justify-center p-2 my-4" onPress={handleCancelSignOut}>
                                    <Text className="text-foreground font-medium">Cancel</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </Card>
    )
}

export default AccountItemsCard;