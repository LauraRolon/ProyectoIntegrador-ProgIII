import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Image } from 'react-native'
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

    render() {
        return (
            <View >
                
                <Image
                    style={styles.image}
                    source={{uri: this.props.postData.data.foto}}
                />

                <Text> {this.props.postData.data.user} </Text>
                <Text> {this.props.postData.data.description} </Text>
                <Text> {this.props.postData.data.createdAt} </Text>

                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    image:{
        height: 100
    }
})

export default Post