import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from "react-native-reanimated";

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

                <View style={{ alignItems: "center" }}>
                    <Icon size={50} name="user-circle" color="#CCA9DD" solid />
                </View>
                <Text style={styles.welcome}>{auth.currentUser.displayName} </Text>
                <View style={styles.info}>
                    <View>
                        <Text style={styles.mail}> {auth.currentUser.email} </Text>
                    </View>

                    <View >
                        <Text style={styles.publicaciones}> {this.state.posts.length} Publicaciones</Text>
                    </View>
                </View>

                <View style={styles.iconos}>
                    <Icon size={20} name="clock" color="#45384f" />
                    <View>
                        <Text style={styles.dato}> Último login:</Text>
                        <Text style={styles.element}>{auth.currentUser.metadata.lastSignInTime}</Text>
                    </View>

                </View>

                <View style={styles.iconos}>
                    <Icon size={20} name="calendar-check" color="#45384f" />
                    <View>
                        <Text style={styles.dato}> Miembro desde</Text>
                        <Text style={styles.element}>{auth.currentUser.metadata.lastSignInTime}</Text>
                    </View>

                </View>


               

                {
                    this.state.posts == "" ?
                        <Text style={styles.publicaciones}>Aún no hay publicaciones.</Text>
                        :
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(post) => post.id}
                            renderItem={({ item }) => <Post postData={item} />}
                            style={{ marginTop: 40 }}
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
        marginBottom: 8

    },
    info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
    touchable: {
        marginLeft: 275,
        marginTop: 10,
    },
    element: {
        lineHeight: 20,
        fontSize: 14,
        marginLeft: 15,
        color: "#fffff",
        fontWeight: "bold"
    },
    dato: {
        lineHeight: 20,
        fontSize: 13,
        marginLeft: 15,
        color: "#303030"
    },
    mail: {
        fontSize: 16,
        marginLeft: 10,
        textAlign: "center",
        color: "#7c7c7c"

    },

    publicaciones: {
        fontSize: 16,
        marginLeft: 10,
        textAlign: "center",
        color: "#7c7c7c"
    },
    iconos: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingVertical: 15,
        marginLeft: 10
    }

})


export default Perfil
