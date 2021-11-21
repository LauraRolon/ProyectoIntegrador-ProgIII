import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal: false,
            comments: [],
            text: ""
        }
    }

    componentDidMount(){
        this.recieveComments()
    }

    recieveLikes() {
        let likes = this.props.postData.data.likes;
        if (likes) {
            this.setState({
                likes: likes.length
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
                comments: comentarios.length
            })
        }
    }

    comentarPost() {
        let comentarioPost = db.collection("posteos").doc(this.props.postData.id)
        let oneComment = {
            fecha: Date.now(),
            usuario: auth.currentUser.email,
            comentarioRealizado: this.state.text
        }
        
        comentarioPost.update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(() => {
            console.log("se ha comentado el post")
            console.log(this.props.postData.data.comments.usuario)
            console.log(this.props.postData.data.comments.comentarioRealizado)
        })
        .catch(err => console.log(err))
    }
   

    render() {
        console.log(this.props.postData)
        let { data } = this.props.postData //Destructuring
        return (
            <View>
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
                            <Text> Likear</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity  onPress={() => this.unlikePost()}>
                            <Text>Deslikear</Text>
                        </TouchableOpacity>
                }

                {/* COMENTARIOS */}
                {
                    
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

                            {
                                this.props.postData.data.comments.length == 0 ?
                                    <Text>No hay comentarios</Text>
                                :
                                <View>
                                <Text>Acá van los comentarios</Text>
                                   <FlatList
                                        data={this.props.postData.data.comments} 
                                        keyExtractor={(comment) => comment.fecha.toString()}
                                        renderItem={({item}) => {
                                            <Text>{item.comentarioRealizado}</Text>
                                            console.log(`Flatlist: ${item.comentarioRealizado}`)
                                            console.log(`Flatlist: ${item.usuario}`)
                                        }}
                                    /> 
                                </View>
                            }
                            
                            
                            <TextInput
                                placeholder="Agrega un comentario..."
                                keyboardType="default"
                                onChangeText={text => {
                                    this.setState({
                                        text: text,
                                        comments: {
                                            comentarioRealizado: this.state.text
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
    }
})

export default Post
