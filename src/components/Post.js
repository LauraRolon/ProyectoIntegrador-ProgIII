import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Image } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
/* import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons' */


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

    recieveLikes() {
        let likes = this.props.postData.data.likes;
        if (likes) {
            this.setState({
                likes: likes.lengh
            })

        }
        if (likes.includes(auth.currentUser.email)) {
            this.setState({
                liked: true
            })
        }
    } 

    likePost(){
        this.setState({
            likes: this.state.likes + 1,
            liked: true
        })
        console.log('puse like')
    }

    unlikePost(){
        this.setState({
            likes: this.state.likes - 1,
            liked: false
        })
        console.log('elimine like')
    }

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
        let { data } = this.props.postData //Destructuring
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.postData.data.foto }}
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

                {
                    ! this.state.liked ?
                        <TouchableOpacity onPress={() => this.likePost()}>
                            <Text>Likear</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity  onPress={() => this.unlikePost()}>
                            <Text>Deslikear</Text>
                        </TouchableOpacity>
                }
                

            </View>
//Revisar: No cambia a dislike

        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 400
    },

    container: {
        marginTop:20,
        paddingHorizontal: 0,
        
    }

})

export default Post
