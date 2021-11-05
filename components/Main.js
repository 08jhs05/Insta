import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts } from '../redux/actions';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Landing from './auth/Landing';
import Feed from './main/Feed';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Add from './main/Add';
import Profile from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
});

const mapDispatchProps = (dispatch) => bindActionCreators(
    { fetchUser, fetchUserPosts }, dispatch
);

const EmptyScreen = () => {return null;};

function Main(props) {

    useEffect(() => {
        props.fetchUser();
        props.fetchUserPosts();
    }, []);

    return (
        // props.currentUser == undefined ? 
        // <SafeAreaView>
        //     <Text>log in first</Text>
        // </SafeAreaView> :
        <Tab.Navigator initialRouteName="Feed" labeled={false}>
            <Tab.Screen name="Home" component={Feed}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={26} />
                }}/>
            <Tab.Screen name="AddContainer" component={EmptyScreen}
                listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="plus" color={color} size={26} />
                }}/>
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                }}/>
        </Tab.Navigator>
    )
}

export default connect(mapStateToProps, mapDispatchProps)(Main);