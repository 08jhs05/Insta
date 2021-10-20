import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native';

export default function Login(props) {

    const [state, setState] = useState(
        {
            email: '',
            password: ''
        }
    );

    const onSignIn = () => {
        const { email, password, name } = state;
        props.firebaseApp.auth().signInWithEmailAndPassword( email, password )
        .then( (result) => {
            console.log("success!!")
        }).catch( (error) => {
            console.log(error);
            console.log("failed!!");
        })
    };

    return (
        <View>
            <TextInput
                style={styles.textinput}
                placeholder='email'
                onChangeText={(email) => {
                    setState({ ...state, email: email })
                }}
            />
            <TextInput
                style={styles.textinput}
                placeholder='password'
                secureTextEntry={true}
                onChangeText={(password) => {
                    setState({ ...state, password: password })
                }}
            />
            <Button 
                title='Log In'
                onPress={onSignIn}
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