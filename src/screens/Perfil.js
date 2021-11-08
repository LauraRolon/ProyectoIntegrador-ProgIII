import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import { auth } from "../firebase/config";

class Perfil extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <View>
                <Text style={styles.welcome}>Bienvenido: {auth.currentUser.email} </Text>
                <Text style={styles.element}>Usuario creado el: {auth.currentUser.metadata.creationTime} </Text>
                <Text style={styles.element}>Último login: {auth.currentUser.metadata.lastSignInTime} </Text>
                <TouchableOpacity style={styles.touchable} onPress={ () => this.props.Logout()}>
                    <Text style={styles.touchableText}>Logout</Text>
                </TouchableOpacity>
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
