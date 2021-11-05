import React from 'react'
import { SafeAreaView, Text, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux';

function Profile(props) {
    return (
        <SafeAreaView>
            <Text>name: {props.currentUser.name}</Text>
            <Text>email: {props.currentUser.email}</Text>
            {props.posts.map(post => {
                return <Text key={post.id}>{post.caption}</Text>
            })}
        </SafeAreaView>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
});

export default connect(mapStateToProps, null)(Profile);