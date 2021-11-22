import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
/* import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons' */


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

    likePost() {
        this.setState({
            likes: this.state.likes + 1,
            liked: true
        })
        console.log('puse like')
    }

    unlikePost() {
        this.setState({
            likes: this.state.likes - 1,
            liked: false
        })
        console.log('elimine like')
    }

    borrarPost() {
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
            <View style={styles.container}>
                <Text style={styles.user}> {data.user} </Text>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.postData.data.foto }}
                />
                <View style={styles.interaction}>
                    <Text style={styles.likes}> {this.state.likes} </Text>
                    {
                        !this.state.liked ?
                            <TouchableOpacity
                                style={styles.botonLike}
                                onPress={() => this.likePost()}>
                                <Icon size={25} name="heart" color="#6d6d6d" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={styles.botonLike}
                                onPress={() => this.unlikePost()}>
                                <Icon size={25} name="heart" color="#d61525" solid />
                            </TouchableOpacity>
                    }


                    {/* COMENTARIOS */}
                    {
                        !this.state.showModal ?
                            <TouchableOpacity
                                style={styles.botonComment}
                                onPress={() => this.openModal()}
                            >
                                <Text>
                                    {`${this.props.postData.data.comments.length}  `}
                                    <Icon size={25} name="comment" color="#6d6d6d" regular /> 
                                </Text>
                                
                            </TouchableOpacity>

                            :

                            <Modal
                                visible={this.state.showModal}
                                animationType="slide"
                                transparent={false}
                            >
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                    <Icon style={styles.salir} size={22} name="arrow-left" color="#6d6d6d"/>
                                </TouchableOpacity>
                                
                                {
                                    this.props.postData.data.comments.length == 0 ?
                                        <Text style={{lineHeight: 30, fontSize: 16}}>Aún no hay comentarios, ¡sé el primero en comentar!</Text>
                                        :
                                        <View>
                                            <FlatList
                                                style={styles.flatlist}
                                                data={this.props.postData.data.comments}
                                                keyExtractor={(data) => data.fecha.toString()}
                                                renderItem={({item}) => {
                                                    return(
                                                        <View>
                                                            <Text style={{lineHeight: 25}}>
                                                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{`${item.usuario} `}</Text>
                                                                <Text style={{ fontSize: 16 }}>{item.comentarioRealizado}</Text>
                                                            </Text>
                                                        </View>
                                                    )
                                                }}
                                            />
                                        </View>
                                }
                            
                                <TextInput
                                    placeholder="Agregar comentario..."
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
                                    disabled={this.state.text == "" ? true : false}
                                    style={this.state.text == "" ? styles.boton :styles.botonPublicar}
                                    onPress={() => this.comentarPost()}
                                >
                                    <Text style={ {color: "white", fontSize: 17} }>Publicar</Text>
                                </TouchableOpacity>

                                {

                                }
                            </Modal>
                    }
                    {
                        auth.currentUser.email === data.user ?
                            <TouchableOpacity
                                style={styles.trash}
                                onPress={() => this.borrarPost()}>
                                <Icon size={25} name="trash" color="#c44242" />
                            </TouchableOpacity>
                            :
                            ""
                    }
                </View>

                <Text style={styles.titulo}> {data.titulo} </Text>
                <Text style={styles.description}> {data.description} </Text>

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
        marginTop: 20,
        paddingHorizontal: 0,

    },
    interaction: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',

    },
    botonLike: {
        
        marginBottom: 10,
        borderRadius: 5,
        marginRight: 210
    },

    botonComment: {
        marginRight: 50,
        marginBottom: 10,
        borderRadius: 5,
         
    },
    trash: {
        
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

    flatlist: {
        flex: 1,
        paddingHorizontal: 7

    },

    user: {
        color: "#1e1e1e",
        fontWeight: 'bold',
        padding: 10
    },
    titulo: {
        color: "#1e1e1e",
        fontWeight: 'bold',
        padding: 10,

    },
    description: {
        color: "#1e1e1e",
        paddingHorizontal: 10,

    },
    likes: {
        color: "#1e1e1e",
        paddingVertical: "5",
        flex: '1'

    },
    botonPublicar: {
        height: 40,
        textAlign: "center",
        padding: 5,
        backgroundColor: "#6213DF",
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        color: "#ffff",
    },
    boton: {
        height: 40,
        textAlign: "center",
        padding: 5,
        backgroundColor: "#cdc3db",
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        color: "#ffff",
    }, 
    salir:{ 
        paddingVertical: 10, 
        paddingHorizontal: 7
    }
})

export default Post
