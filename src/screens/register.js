import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'
import { TextInput } from 'react-native-gesture-handler'

 class Register extends Component {
  
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      user: "",
      errorMessage:"",
    }

}

  register(email, password, user){
    auth
    .createUserWithEmailAndPassword(email, password)
      .then((userData)=> userData.user.updateProfile({displayName: user}))
      .catch((err)=> this.setState({errores: err.message}))
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        
        <TextInput style={styles.input}
          onChangeText={(text)=> this.setState({user: text})}
          keyboardType="default"
          placeholder="User"
        />
        <TextInput style={styles.input}
          onChangeText={(text)=> this.setState({email: text})}
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput style={styles.input}
        onChangeText={(text) => this.setState({password: text})}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                />

        
        <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email, this.state.password, this.state.user )}>
                    <Text style={styles.texto}>Registrarse</Text>
                </TouchableOpacity>
      </View>
      
    )
  }
  
}

const styles = StyleSheet.create({

  container: {
    marginTop:20,
    paddingHorizontal: 10,
},

input: {
  height: 50,
  borderRadius:6,
  paddingHorizontal:10,
  paddingVertical:15,
  marginVertical:10,
  backgroundColor: '#dbdbdb'
},
  
  button:{
    height: 40,
  textAlign:"center",
  padding: 5,
  backgroundColor: "#6213DF",
  borderRadius:4,
  paddingHorizontal: 10,
  paddingVertical: 6,
  color: "#ffff"
  },
  
  texto:{
    color:"#FFF"
},




})
 

export default Register