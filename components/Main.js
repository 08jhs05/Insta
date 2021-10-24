import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
});

const mapDispatchProps = (dispatch) => bindActionCreators(
    { fetchUser }, dispatch
);

function Main(props) {

    useEffect(() => {
        props.fetchUser();
    }, []);

    return (
        props.currentUser == undefined ? 
        <SafeAreaView>
            <Text>log in first</Text>
        </SafeAreaView> :
        <SafeAreaView>
            <Text>User {props.currentUser.name} is logged in.</Text>
        </SafeAreaView>
    )
}

export default connect(mapStateToProps, mapDispatchProps)(Main);