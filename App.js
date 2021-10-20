import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import * as firebase from 'firebase';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAL9heY2h4vyPLU-lL5EKbjuKJ-DA-lG0s",
  authDomain: "reactnative-practice-e0f72.firebaseapp.com",
  databaseURL: "https://reactnative-practice-e0f72-default-rtdb.firebaseio.com",
  projectId: "reactnative-practice-e0f72",
  storageBucket: "reactnative-practice-e0f72.appspot.com",
  messagingSenderId: "780719410338",
  appId: "1:780719410338:web:fbda50f172f49c6e6e9bfb"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {

  const [state, setState] = useState({
    loaded: false 
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {
      if(!user){
        setState({
          loaded: true,
          loggedIn: false
        });
      } else {
        setState({
          loaded: true,
          loggedIn: true
        });
      }
    })
  }, []);

  return (
    state.loaded ?
      state.loggedIn ?
        <SafeAreaView>
          <Text>you are logged in.</Text>
        </SafeAreaView> : 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }}/>
          <Stack.Screen name="Register">
            {props => <Register {...props} firebaseApp={firebase} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {props => <Login {...props} firebaseApp={firebase} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer> :
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
