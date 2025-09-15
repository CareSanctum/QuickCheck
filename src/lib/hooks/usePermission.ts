import * as MediaLibrary from 'expo-media-library';
import { Alert, Linking } from 'react-native';

const openPermissionAlert = (perm: string) => {
    Alert.alert(
      'Permission needed',
      `CareSanctum does not have permission to access your ${perm}.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Open Settings', onPress: () => Linking.openSettings()},
      ],
    )
}

export function usePhotoLibraryPermission() {
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
        granularPermissions: ['photo']
    });  
    
    const handleRequestPermission = async () => {
        if(permissionResponse?.granted) {
            return true;
        }else if (!permissionResponse || permissionResponse.status === 'undetermined' || permissionResponse?.canAskAgain) {
            const {canAskAgain, granted, status} = await requestPermission();
            if (!canAskAgain && status === 'undetermined') {
                openPermissionAlert('photo library')
              }
            return granted;

        }else {
            openPermissionAlert('photo library')
            return false;
        }
    }   

    return {handleRequestPermission}
}