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
      errorMessage:"",
    }

}

  register(email, password){
    auth
    .createUserWithEmailAndPassword(email, password)
      .then(()=> console.log("Se registro correctamente"))
      .catch((err)=> this.setState({errores: error.message}))
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        
        <TextInput style={styles.input}
          onChangeText={(text)=> this.setState({email: text})}
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput 
        onChangeText={(text) => this.setState({password: text})}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                />

        
        <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email, this.state.password )}>
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
  height: 25,
  borderWidth:0.5,
  borderStyle:"solid",
  borderColor: "#grey",
  borderRadius:6,
  paddingHorizontal:10,
  paddingVertical:15,
  marginVertical:10,
},
  
  button:{
    textAlign:"center",
    padding: 5,
    backgroundColor: "#28a745",
    marginBottom: 10,
    borderRadius:4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderStyle:"solid",
    borderWidth:1,
    borderColor:"#28a745"
  },
  
  texto:{
    color:"#FFF"
},

})
 

export default Register