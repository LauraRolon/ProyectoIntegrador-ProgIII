import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native"
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

class Perfil extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        this.posteosUsuario()
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

    borrarPost(){
        
    }

    render(){
        return(
            <View>
                <Text style={styles.welcome}>Nombre usuario: {auth.currentUser.email} </Text>
                <Text>Email: {auth.currentUser.email} </Text>
                <Text style={styles.element}>Usuario creado el: {auth.currentUser.metadata.creationTime} </Text>
                <Text style={styles.element}>Cantidad de posteos:  </Text>
                <Text style={styles.element}>Último login: {auth.currentUser.metadata.lastSignInTime} </Text>
                <TouchableOpacity style={styles.touchable} onPress={ () => this.props.Logout()}>
                    <Text style={styles.touchableText}>Logout</Text>
                </TouchableOpacity>

                <FlatList
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({ item }) => <Post postData={item} />}
                />
            </View>
        )
    }
}


const styles={
    welcome:{

    },
    element:{

    },
    touchable: {
        padding: 5,
        backgroundColor: "green",
        marginBottom: 10,
        borderRadius: 5,
    },
    touchableText:{

    }
}

export default Perfil
