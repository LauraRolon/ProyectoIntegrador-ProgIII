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

                <View style={{alignItems:"center"}}>
                    <Icon size={50} name="user-circle" color="#CCA9DD" solid/>
                </View>
                <Text style={styles.welcome}>{auth.currentUser.displayName} </Text>
                
                <View style={styles.iconos}> 
                    <Icon size={20} name="at" color="#6213DF" />
                    <Text style={styles.element}> {auth.currentUser.email} </Text>
                </View>

                <View style={styles.iconos}>
                    <Icon size={25} name="images" color="#6213DF" />
                    <Text style={styles.element}><Text style={{ fontWeight: "bold" }}>{this.state.posts.length} </Text> Publicaciones</Text>
                </View>

                <View style={styles.iconos}>
                    <Icon size={25} name="clock" color="#6213DF" />
                    <Text style={styles.element}><Text style={{fontWeight: "bold"}}> Último login: </Text> {auth.currentUser.metadata.lastSignInTime}</Text>
                </View>

                <View style={styles.iconos}>
                    <Icon size={25} name="calendar-check" color="#6213DF" />
                    <Text style={styles.element}><Text style={{ fontWeight: "bold" }}>Creación perfil: </Text> {auth.currentUser.metadata.creationTime} </Text>
                </View>

                {
                    this.state.posts == "" ?
                        <Text style={styles.publicaciones}>Aún no hay publicaciones.</Text>
                    :
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(post) => post.id}
                            renderItem={({ item }) => <Post postData={item} />}
                            style={{marginTop: 40}}
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
        marginBottom: 50

    },
    touchable: {
        marginLeft: 370,
        marginTop: 10,
    },
    element:{
        lineHeight: 30,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10

    },
    publicaciones:{
        fontSize: 16,
        textAlign: "center",
        marginTop: 30
    },
    iconos:{
        alignItems:"center",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingVertical: 15
    }
    
})


export default Perfil
