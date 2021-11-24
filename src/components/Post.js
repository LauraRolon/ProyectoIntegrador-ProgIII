import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome5';



class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal: false,
            comments: [],
            text: "",
            borrado: false
        }
    }

    componentDidMount() {
        this.recieveComments()
        this.recieveLikes()
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

    likePost(id) {
        console.log(id)
        db.collection("posteos").doc(id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email + ",")
        }).then(() => {
            this.setState({
                likes: this.state.likes + 1,
                liked: true
            })
        })
            .catch((err) => { console.log(err) })
        console.log('puse like')
    }

    unlikePost() {
        db.collection("posteos").doc(id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email + ",")
        }).then(() => {
            this.setState({
                likes: this.state.likes - 1,
                liked: false
            })
        })
            .catch((err) => { console.log(err) })
        console.log('elimine like')
    }

    borrarPost() {
        db.collection("posteos").doc(this.props.postData.id).delete()
            .then(() => {
                this.setState({borrado: false})
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
        if (comentarios) {
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
            comentarioRealizado: this.state.text,
            userName: auth.currentUser.displayName,
        }

        comentarioPost.update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(() => {
            console.log("se ha comentado el post")
        })
        .catch(err => console.log(err))
    }


    render() {
        let { data } = this.props.postData //Destructuring
        return (
            <View style={styles.container}>
                <Text style={styles.user}> {data.userName} </Text>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.postData.data.foto }}
                />

                <View style={styles.interaction} >

                    <Text> {this.props.postData.data.likes.length} </Text>

                    {
                        ! this.state.liked ?
                            <TouchableOpacity
                                onPress={() => this.likePost(this.props.postData.id)}>
                                    <Icon size={25} name="heart" color="#6d6d6d" />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity
                                onPress={() => this.unlikePost(this.props.postData.id)}>
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
                                <Text>{`${this.props.postData.data.comments.length} `}</Text>
                                <Icon size={25} name="comment" color="#6d6d6d" regular />
                            </TouchableOpacity>
                        :
                            <Modal
                                visible={this.state.showModal}
                                animationType="slide"
                                transparent={false}
                            >
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                    <Icon style={styles.salir} size={22} name="arrow-left" color="#6d6d6d" />
                                </TouchableOpacity>

                                {
                                    this.props.postData.data.comments.length == 0 ?
                                        <Text style={{ lineHeight: 30, fontSize: 16 }}>Aún no hay comentarios, ¡sé el primero en comentar!</Text>
                                    :
                                        <View>
                                            <FlatList
                                                style={styles.flatlist}
                                                data={this.props.postData.data.comments}
                                                keyExtractor={(data) => data.fecha.toString()}
                                                renderItem={({ item }) => 
                                                    <View>
                                                        <Text style={{ lineHeight: 25 }}>
                                                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{`${item.userName} `}</Text>
                                                            <Text style={{ fontSize: 16 }}>{item.comentarioRealizado}</Text>
                                                        </Text>
                                                    </View>  
                                                }
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
                                    style={this.state.text == "" ? styles.boton : styles.botonPublicar}
                                    onPress={() => this.comentarPost()}
                                >
                                    <Text style={{ color: "white", fontSize: 17 }}>Publicar</Text>
                                </TouchableOpacity>

                                {

                                }
                            </Modal>
                    }
                    
                    {
                        (auth.currentUser.email === data.user && !this.state.borrado) ?
                            <TouchableOpacity
                                style={styles.trash}
                                onPress={() => this.setState({borrado: true})}>
                                    <Icon size={25} name="trash" color="#c44242" />
                            </TouchableOpacity>
                        :
                            <Modal
                                visible={this.state.borrado}
                                animationType="slide"
                                transparent={false}
                            >
                                <View>
                                    <Text style={styles.textos}>¿Está seguro de borrar la publicación?</Text>
                                    <View style={styles.opcionesBorrado}>
                                        <TouchableOpacity style={styles.opciones} onPress={() => this.borrarPost()}>
                                            <Icon size={25} name="check" color="#6d6d6d" regular />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.opciones} onPress={() => this.setState({borrado: false})}>
                                            <Icon size={25} name="times" color="#6d6d6d" regular />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                    }
                </View>

                <Text style={styles.titulo}> {data.titulo} </Text>
                <Text style={styles.description}> {data.description} </Text>

            </View>


        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 400
    },
    trash:{
        paddingLeft: 200
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 0,

    },
    interaction:{
        display: "flex",
        flexDirection: 'row',
        alignItems:"center",
        marginTop: 5
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
        marginTop: 25
    },
    botonComment:{
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        marginLeft: 10
    },
    flatlist: {
        flex: 1,
        paddingHorizontal: 7

    },

    user: {
        color: "#1e1e1e",
        fontWeight: 'bold',
        padding: 10,
        fontSize: 16
    },
    titulo: {
        color: "#1e1e1e",
        fontWeight: 'bold',
        padding: 10,
        fontSize: 15

    },
    description: {
        color: "#1e1e1e",
        paddingHorizontal: 10,
        fontSize: 15

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
    salir: {
        paddingVertical: 10,
        paddingHorizontal: 7
    },
    opciones: {
        padding: 20,
        alignItems: "center",
    },
    opcionesBorrado: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    textos: { 
        lineHeight: 30, 
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 10 
    }
})

export default Post
