import {
    type ImagePickerOptions,
    launchImageLibraryAsync
} from 'expo-image-picker';

export async function openImagePicker(options?: ImagePickerOptions) {
    const response = await launchImageLibraryAsync({
        exif: false,
        mediaTypes: ['images'],
        quality: 1,
        selectionLimit: 1,
        ...options,
        legacy: true,
    });

    return (response.assets ?? [])
        .filter((asset) => {
            if (asset.mimeType?.startsWith('image/')) return true;
            return false;
        })
        .map(image => ({
            mime: image.mimeType || 'image/jpeg',
            path: image.uri,
            name: image.fileName?.replace(/\s+/g, "_") || 'profile.jpeg'
        }))
}