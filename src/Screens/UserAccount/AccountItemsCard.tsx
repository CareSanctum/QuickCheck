import { View, TouchableOpacity, Text, ActivityIndicator, Linking } from "react-native";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { ChevronRightIcon, Handshake, KeyRound, LogOutIcon, Trash2, UserPen, X } from "lucide-react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useLogout } from "@/src/Hooks/Logout.hook";
import { Fragment, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/src/App.Navigation";
import { Modal, ModalBackdrop, ModalHeader, ModalContent, ModalBody, ModalFooter, ModalCloseButton } from "@/components/ui/modal";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useDeleteAccount } from "@/src/Hooks/DeleteAccount.hook";
import ErrorBox from "@/src/Components/ErrorBox";
import { generateUrl } from "@/src/Network/Urls";

type AccountItemsCardProps = {
  onEditProfile: () => void;
};

const AccountItemsCard = ({ onEditProfile }: AccountItemsCardProps) => {
    const foreground = useThemeVariables('--foreground'); 
    const destructive = useThemeVariables('--destructive');
    const { mutate: logout, status: logoutStatus } = useLogout();
    const handleLogout = () => {
        logout();
    }
    const navigation = useNavigation<NavigationProp>();
    const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
	const [deleteError, setDeleteError] = useState<string>("");

	const openDeleteModal = () => {
		setDeleteError("");
		setDeleteAccountModalOpen(true);
	};
    const menuItems = [
        { id: 1, title: "Edit Profile", onPress: () => { onEditProfile() }, icon: <UserPen size={22} color={foreground} /> },
        { id: 2, title: "Change Password", onPress: () => { navigation.navigate('ChangePassword') }, icon: <KeyRound size={22} color={foreground} /> },
        // { id: 3, title: "QuickCheck History", onPress: () => {}, icon: <History size={22} color={foreground} /> },
        { id: 4, title: "Privacy Policy", onPress: () => {Linking.openURL(generateUrl('PRIVACY_POLICY'))}, icon: <Handshake size={22} color={foreground} /> },
		{ id: 5, title: "Delete Account", onPress: openDeleteModal, icon: <Trash2 size={22} color={foreground} /> },
        
    ];
	const { mutateAsync: deleteAccountAsync, isPending: deleteAccountPending } = useDeleteAccount();
    const handleDeleteAccount = async () => {
        setDeleteError("");
        try {
          await deleteAccountAsync();          // 1) delete on server
          setDeleteAccountModalOpen(false);    // 2) close modal first
          requestAnimationFrame(() => {        // 3) defer global updates to next paint
            logout();
          });
        } catch (e) {
          setDeleteError("Something went wrong. Please try again.");
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
                                <ChevronRightIcon size={22} color={foreground}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Divider className="bg-border" />
						<Modal isOpen={deleteAccountModalOpen} onClose={() => setDeleteAccountModalOpen(false)}>
                        <ModalBackdrop className="bg-black/50" />
                        <ModalContent className="bg-card border border-border">
                            <ModalHeader>
                                <Text className="text-2xl font-semibold text-foreground">Are you sure?</Text>
                            </ModalHeader>
                            <ModalBody>
                                <Text className="text-foreground">
                                    If you proceed, your account and all the associated data will be permanently deleted from our system under 90 days.
                                </Text>
									{deleteError ? (
										<View className="mt-3">
											<ErrorBox message={deleteError} />
										</View>
									) : null}
                            </ModalBody>
                            <ModalFooter>
									<Button className="bg-destructive rounded-full" onPress={handleDeleteAccount} isDisabled={deleteAccountPending}>
										{deleteAccountPending ? (
											<ButtonSpinner />
										) : (
											<ButtonText className="text-destructiveForeground">Request Account Deletion</ButtonText>
										)}
									</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Fragment>
            ))}
            <View>
                <TouchableOpacity onPress={handleLogout}>
                    { logoutStatus === "pending" ? 
                        ( <ActivityIndicator size="small" color={destructive} />) : 
                        (
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <LogOutIcon size={22} color={destructive}/>
                                    <Text className="pl-2 text-lg text-destructive">
                                        Sign Out
                                    </Text>
                                </View>
                                <ChevronRightIcon size={22} color={destructive}/>
                            </View>
                        )
                    }
                </TouchableOpacity>
            </View>
        </Card>
    )
}

export default AccountItemsCard;