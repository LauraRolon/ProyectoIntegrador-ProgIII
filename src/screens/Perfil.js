import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import Icon from 'react-native-vector-icons/FontAwesome5';

class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: ""
        }
    }

    componentDidMount() {
        this.posteosUsuario()
        console.log(`Esto hay en posteos: ${this.state.posts}`)
    }

    posteosUsuario() {
        db.collection("posteos").where("user", "==", auth.currentUser.email).orderBy("createdAt", "desc").onSnapshot((docs) => {
            let posteos = []
            docs.forEach((doc) => {
                console.log(posteos)
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: posteos
            })
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.touchable} onPress={() => this.props.Logout()}>
                    <Icon size={25} name="sign-out-alt" color="grey" regular />

                </TouchableOpacity>
                <Text style={styles.welcome}>{auth.currentUser.email} </Text>
                <Text style={styles.mail}> {auth.currentUser.email} </Text>
                <Text style={styles.element}><Text style={{fontWeight: "bold"}}>Último login: </Text> {auth.currentUser.metadata.lastSignInTime}</Text>
                <Text style={styles.element}><Text style={{fontWeight: "bold"}}>Cantidad de posteos: </Text> {this.state.posts.length}</Text>
                <Text style={styles.element}><Text style={{ fontWeight: "bold" }}>Creación del perfil: </Text> {auth.currentUser.metadata.creationTime} </Text>

                {
                    this.state.posts == "" ?
                        <Text style={styles.publicaciones}>Aún no hay publicaciones.</Text>
                    :
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(post) => post.id}
                            renderItem={({ item }) => <Post postData={item} />}
                        />
                }

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: '500',

    },
    mail: {
        textAlign: "center",
        fontSize: 14,
        padding: 5,
        marginBottom: 30
        
    },
    touchable: {
        marginLeft: 370,
        marginTop: 10,
    },
    element:{
        lineHeight: 30,
        fontSize: 16,

    },
    publicaciones:{
        fontSize: 16,
        textAlign: "center",
        marginTop: 25
    }
    
})


export default Perfil
