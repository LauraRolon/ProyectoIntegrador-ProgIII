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

    componentDidMount() {

    }

    recieveLikes(){
        if (this.props.postData.data.likes){
            this.setState({
                likes: this.props.postData.data.likes.lenght
            })
        }
    } //EN PROCESO

    render() {
        console.log(this.props.postData)
        let {data} = this.props.postData //Destructuring
        return (
            <View>
                 <Image
                    style={styles.image}
                    source={{uri: this.props.postData.data.foto}}
                />
                
                <Text> {data.titulo} </Text>
                <Text> {data.description} </Text>
                <Text> {data.user} </Text>
                <Text> {this.state.likes} </Text>

               

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
