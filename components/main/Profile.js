import React, {useEffect, useState} from 'react'
import { SafeAreaView, Text, View, FlatList, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserPosts, fetchOneUser } from '../../redux/actions';

function Profile(props) {
    useEffect(() => {
        props.navigation.addListener('focus', profileOnFocus)
        return () => {
            props.navigation.removeListener('focus', profileOnFocus)
        }
    }, []);

    const profileOnFocus = () => {
        props.fetchOneUser(props.route.params.uid);
        props.fetchUserPosts();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>name: {props.currentUser.name}</Text>
            <Text>email: {props.currentUser.email}</Text>
            <View>
                <Text>Posts</Text>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={props.posts}
                    renderItem={({item}) => (
                        <View style={styles.imageContainer}>
                            <Image source={{uri: item.downloadURL}} style={styles.image}/>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    galleryContainer: {
        flex: 1
    },
    imageContainer: {
        flex: 1/3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
});

const mapDispatchProps = (dispatch) => bindActionCreators(
    { fetchUserPosts, fetchOneUser }, dispatch
);

export default connect(mapStateToProps, mapDispatchProps)(Profile);