import React, { useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

export default function Add() {

    const [state, setState] = useState({
        hasGalleryPermission: null,
        image: null,
      });

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        console.log(result);

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button title="Pick Image from Gallery" onPress={ pickImage }/>
            {state.image && <Image source={{ uri: state.image }} style={{ width: 200, height: 200 }} />}
        </SafeAreaView>
    )
}
