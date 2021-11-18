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

    borrarPost(){
        console.log(this.props.postData.id)
       db.collection("posteos").doc(this.props.postData.id).delete()
        .then(() => {
            console.log("el posteo fue eliminado")
        })
        .catch(err => console.log(err))
    }

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

                {
                    auth.currentUser.email === data.user ? 
                    <TouchableOpacity onPress={() => this.borrarPost()}>
                        <Text>Borrar</Text>
                    </TouchableOpacity> 
                    :
                    console.log("no se puede borrar el post")
                }

               

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
