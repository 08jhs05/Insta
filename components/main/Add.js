import React, { useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

export default function Add( { navigation } ) {

    const [state, setState] = useState({
        hasGalleryPermission: null,
        image: 'https://pbs.twimg.com/profile_images/1285016142692548608/aMPcy4Xp_400x400.jpg',
      });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });
        if (!result.cancelled) {
            setState({...state, image: result.uri});
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
              setState({...state, hasGalleryPermission: (status === "granted")});
            }
          })();
    }, []);

    let saveImage = state.image;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button title="Pick Image from Gallery" onPress={ pickImage }/>
            <Button title="Save" onPress={ () => { navigation.navigate('Save', { saveImage }) } }/>
            <Image source={{ uri: state.image }} style={{ width: 400, height: 400 }} />
        </SafeAreaView>
    )
}
