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

    buscar(){  
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

    consola(){
        console.log(this.state.busqueda)
    }

    render() {
        return (
                <View style={styles.form}>

                    <TextInput
                        placeholder="Buscar..."
                        keyboardType="default"
                        onChangeText={text => 
                            {
                                this.setState({ busqueda: text })
                                this.consola()
                            }}
                        value={this.state.busqueda}
                        style={styles.placeholder}
                    />

                    <TouchableOpacity style={styles.boton} onPress={() => this.buscar()}>
                        <Text>Buscar</Text>
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

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 10,
        marginTop: 20,
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
    boton: {
        padding: 5,
        backgroundColor: "green",
        marginBottom: 10,
        borderRadius: 5,
    }
})

export default Search;