/* import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text> {this.props.postData.data.user} </Text>
                <Text> {this.props.postData.data.description} </Text>

            </View>
        )
    }
}

export default Post */