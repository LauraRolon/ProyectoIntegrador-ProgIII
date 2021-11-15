import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
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
        console.log(this.props.postData)
        let {data} = this.props.postData //Destructuring
        return (
            <View>
                <Text> {data.titulo} </Text>
                <Text> {data.description} </Text>
                <Text> {data.user} </Text>
                
                

            </View>
        )
    }
}

export default Post 