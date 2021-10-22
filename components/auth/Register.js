import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native';

import firebase from 'firebase';

export default function Register(props) {
    const [state, setState] = useState(
        {
            email: '',
            password: '',
            name: ''
        }
    );

    const onSignUp = () => {
        const { email, password, name } = state;
        props.firebaseApp.auth().createUserWithEmailAndPassword( email, password )
        .then( (result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid);
            console.log("log in success!!")
        }).catch( (error) => {
            console.log(error)
        })
    };

    return (
        <View>
            <TextInput
                style={styles.textinput}
                placeholder='name'
                onChangeText={(name) => {
                    setState({ ...state, name: name})
                }}
            />
            <TextInput
                style={styles.textinput}
                placeholder='email'
                onChangeText={(email) => {
                    setState({ ...state, email: email})
                }}
            />
            <TextInput
                style={styles.textinput}
                placeholder='password'
                secureTextEntry={true}
                onChangeText={(password) => {
                    setState({ ...state, password: password})
                }}
            />
            <Button 
                title='Sign up'
                onPress={onSignUp}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textinput: {
        height: 60,
        backgroundColor: '#ededed',
        borderWidth: 2
    },
});