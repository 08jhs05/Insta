import React, { useState, useEffect } from 'react'
import firebase from  'firebase';
import { View, FlatList, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
require('firebase/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            });
            setUsers(users);
        })
    }, [])

    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .where('name', '<=', search + '\uf8ff')
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            });
            setUsers(users);
        })
    }
    return (
        <View>
            <TextInput 
                placeholder="Type Here..."
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(search) => {
                    fetchUsers(search)}
                }
            />
            <Text>Search</Text>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("Profile", { uid: item.id })
                        }}
                        >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
        minHeight: 40
    }
})