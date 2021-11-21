import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Post from '../components/Post';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busqueda: "",
        }
    }

    buscar() {
        db.collection("posteos").where("user", "==", this.state.busqueda).onSnapshot((docs) => {
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

    consola() {
        console.log(this.state.busqueda)
    }

    render() {
        return (
            <View style={styles.form}>

                <TextInput
                    placeholder="Buscar..."
                    keyboardType="default"
                    onChangeText={text => {
                        this.setState({ busqueda: text })
                        this.consola()
                    }}
                    value={this.state.busqueda}
                    style={styles.placeholder}
                />

                <TouchableOpacity style={styles.boton} onPress={() => this.buscar()}>
                    <Text style={styles.touchableText}>Buscar</Text>
                </TouchableOpacity>

                {
                    this.state.busqueda == "" ?
                        <Text>No hay resultados</Text>
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
        textAlign: "center",
        padding: 5,
        backgroundColor: "#6213DF",
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        color: "#ffff",
    },

    touchableText: {
        color: "#ffffff",

    }
})

export default Search;