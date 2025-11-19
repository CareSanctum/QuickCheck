import { EllipsisVertical } from "lucide-react-native";
import { View, Text, ActivityIndicator } from "react-native";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { useThemeVariables } from "./ThemeVariables";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Modal, ModalBackdrop, ModalHeader, ModalContent, ModalBody, ModalFooter, ModalCloseButton } from "@/components/ui/modal";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/src/App.Navigation";

type HamburgerMenuProps = {
    onConfirmDelete?: () => void;
    deleteStatus: "idle" | "pending" | "success" | "error";
};

const HamburgerMenu = ({ onConfirmDelete, deleteStatus }: HamburgerMenuProps) => {
    const foreground = useThemeVariables('--foreground');
    const destructiveForeground = useThemeVariables('--destructive-foreground');
    const [deleteLovedOneModalOpen, setDeleteLovedOneModalOpen] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const hasHandledDeleteSuccessRef = useRef(false);

    // When deletion succeeds and modal is open, close it first
    useEffect(() => {
        if (deleteStatus === "success" && deleteLovedOneModalOpen) {
            setDeleteLovedOneModalOpen(false);
        }
    }, [deleteStatus, deleteLovedOneModalOpen]);

    // After modal is closed post-success, navigate once
    useEffect(() => {
        if (
            deleteStatus === "success" &&
            !deleteLovedOneModalOpen &&
            !hasHandledDeleteSuccessRef.current
        ) {
            hasHandledDeleteSuccessRef.current = true;
            navigation.navigate('HomeTabNavigator', { screen: 'HomeTab' });
        }
    }, [deleteStatus, deleteLovedOneModalOpen, navigation]);

    // Reset guard when status changes away from success
    useEffect(() => {
        if (deleteStatus !== "success") {
            hasHandledDeleteSuccessRef.current = false;
        }
    }, [deleteStatus]);

    return (
        <>
            <Menu
                placement="bottom right"
                offset={5}
                crossOffset={10}
                className="border border-border py-0 px-0 "
                trigger={({ ...triggerProps}) => {
                    return (
                        <Button {...triggerProps} className="bg-transparent px-2 py-2">
                            <EllipsisVertical color={foreground} size={22} />
                        </Button>
                    )
                }}>
                    <MenuItem
                        key="delete-loved-one"
                        textValue="Delete Loved One"
                        className="py-3"
                        onPress={() => {
                            setDeleteLovedOneModalOpen(true);
                        }}
                    >
                        <MenuItemLabel className=" font-base">Delete Loved One</MenuItemLabel>
                    </MenuItem>
            </Menu>

            <Modal
                isOpen={deleteLovedOneModalOpen}
                onClose={() => {
                    if (deleteStatus !== "pending") {
                        setDeleteLovedOneModalOpen(false);
                    }
                }}
            >
                <ModalBackdrop className="bg-black/50" />
                <ModalContent className="bg-card border border-border">
                    <ModalHeader>
                        <Text className="text-2xl font-medium text-foreground">This action is irreversible</Text>
                        {deleteStatus !== "pending" ? <ModalCloseButton /> : null}
                    </ModalHeader>
                    <ModalBody>
                        <Text className="text-foreground">
                            If you proceed, all related data  will be permanently deleted.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="bg-transparent rounded-full "
                            isDisabled={deleteStatus === "pending"}
                            onPress={() => {
                                setDeleteLovedOneModalOpen(false);
                            }}
                        >
                            <Text className="text-cardForeground font-semibold">Cancel</Text>
                        </Button>
                        <Button
                            className="bg-destructive rounded-full"
                            isDisabled={deleteStatus === "pending"}
                            onPress={() => {
                                onConfirmDelete?.();
                            }}
                        >
                            <Text className="text-destructiveForeground font-semibold">
                                {deleteStatus === "pending" ? <ActivityIndicator size="small" color={destructiveForeground} /> : "Delete"}
                            </Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {null}
        </>
    )
}


export default HamburgerMenu;