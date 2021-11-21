import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
<<<<<<< HEAD
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
/* import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons' */

=======
>>>>>>> e3e8e7d6d9926a5df8684a32add5de8ca1f6b2c3

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal: false,
            comments: [{
                comentario: "",
                usuario: ""
            }],
            commented: false,
            text: ""
        }
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
       db.collection("posteos").doc(this.props.postData.id).delete()
        .then(() => {
            console.log("el posteo fue eliminado")
        })
        .catch(err => console.log(err))
    }

    openModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    // COMENTARIOS
    recieveComments() {
        let comentarios = this.props.postData.data.comments;
        console.log(comentarios)
        if (this.props.postData.data.comments) {
            this.setState({
                comments: comentarios.lengh
            })
        }
    }

    comentarPost() {
        let post = db.collection("posteos").doc(this.props.postData.id)
        post.update({
            comments: {
                comentario: this.state.text,
                usuario: auth.currentUser.email
            }
        })
        .then(() => {
            this.setState({
                commented: true
            })
            console.log("se ha comentado el post")
            console.log(this.state.comments.comentario)
            console.log(this.props.postData.data.comments.usuario)
        })
        .catch(err => console.log(err))
    }

    verComentarios() {
        console.log(this.state.text)
        console.log(this.state.comments)
        console.log(this.props.postData.data.comments)
        return (
            <Text>{this.props.postData.data.comments}</Text>
        )
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
                    ""
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

                {/* COMENTARIOS */}
                {
                    !this.state.commented ?
                        <Text>Aún no hay comentarios. ¡Sé el primero en comentar!</Text>
                    :
                        ""
                }
                {
                    !this.state.showModal ?
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => this.openModal()}
                        >
                            <Text>Ver/Agregar comentarios</Text>
                        </TouchableOpacity>
                        :
                        <Modal
                            visible={this.state.showModal}
                            animationType="slide"
                            transparent={false}
                        >
                            <TouchableOpacity style={styles.boton} onPress={() => this.closeModal()}>
                                <Text>X</Text>
                            </TouchableOpacity>

                            <FlatList
                                data={this.state.comments}
                                keyExtractor={(item) => item.usuario}
                                renderItem={({item}) => {
                                    <View>
                                        <Text>Comentario: {item.comentario}</Text>
                                        <Text>Usuario: {item.usuario}</Text>
                                    </View>
                                    
                                    console.log(`Flatlist: ${item}`)
                                }}
                            />
                            
                            <TextInput
                                placeholder="Agrega un comentario..."
                                keyboardType="default"
                                onChangeText={text => {
                                    this.setState({
                                        text: text,
                                        comments: {
                                            comentario: this.state.text,
                                            usuario: auth.currentUser.email
                                        }
                                    })
                                }}
                                value={this.state.text}
                                style={styles.placeholder}
                            />

                            <TouchableOpacity
                                style={styles.boton}
                                onPress={() => this.comentarPost()}
                            >
                                <Text>Publicar</Text>
                            </TouchableOpacity>
                        </Modal>
                }


            </View>
//Revisar: No cambia a dislike

        )
    }
}

const styles = StyleSheet.create({
    image: {
<<<<<<< HEAD
        height: 400
    },

    container: {
        marginTop:20,
        paddingHorizontal: 0,
        
=======
        height: 200
    },
    boton: {
        padding: 5,
        backgroundColor: "pink",
        marginBottom: 10,
        borderRadius: 5,
    },
    placeholder: {
        height: 40,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "blue",
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginVertical: 7,
    },
    flatlist:{
        width: 100,
        flex: 1
>>>>>>> e3e8e7d6d9926a5df8684a32add5de8ca1f6b2c3
    }

})

export default Post
