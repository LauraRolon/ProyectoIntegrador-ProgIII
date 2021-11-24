import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MyCamera from '../components/MyCamera';

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titulo: "",
            description: "",
            showCamera: true,
        }
    }

    submitPost() {
        db.collection("posteos").add({
            user: auth.currentUser.email,
            createdAt: Date.now(),
            titulo: this.state.titulo,
            description: this.state.description,
            userName: auth.currentUser.displayName,
            likes: [],
            comments: [], //array de objetos literales
            foto: this.state.url
        })
            .then(() => {
                console.log("se posteó exitosamente")
                this.setState({
                    titulo: "",
                    description: ""
                })
            })
            .catch(err => console.log(err))
    }

    imageUpload(url) {
        this.setState({
            url: url,
            showCamera: false
        })
    }


    render() {
        return (
            this.state.showCamera ?

                <MyCamera imageUpload={(url) => this.imageUpload(url)} /> :

                <View style={styles.form}>

                    <TextInput

                        placeholder="Título"
                        keyboardType="default"
                        onChangeText={text => this.setState({ titulo: text })}
                        value={this.state.titulo}
                        style={styles.placeholder}
                    />

                    <TextInput

                        placeholder="Descripción"
                        keyboardType="default"
                        onChangeText={text => this.setState({ description: text })}
                        value={this.state.description}
                        multiline={true}
                        style={styles.placeholder}
                    />

                    <TouchableOpacity style={styles.boton} onPress={() => this.submitPost()}>
                        <Text>Postear</Text>
                    </TouchableOpacity>

                </View>
        )
    }
}

const styles = StyleSheet.create({

    form: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    placeholder: {
        height: 50,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 10,
        backgroundColor: '#dbdbdb'
    },
    boton: {
        height: 40,
    textAlign:"center",
    padding: 5,
    backgroundColor: "#6213DF",
    borderRadius:4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: "#ffff"
    },
    

})

export default NewPost;