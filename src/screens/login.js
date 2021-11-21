import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      mail: this.props.mail,
      pass: this.props.pass
    }
  }

componentWillMount(){
  console.log(this.props)
  
}

  render() {
    return (
      <View  style={styles.container}>

        <Text style={styles.title}>Login</Text>

        <Text>{this.props.error}</Text>
        <TextInput style={styles.field}
          keyboardType="email-address"
          placeholder="mail"
          onChangeText={text => this.setState({ mail: text })}
        />

        <TextInput style={styles.field}
          keyboardType="default"
          placeholder="password"
          secureTextEntry= {true}
          onChangeText={text => this.setState({ pass: text })}
        />

        <TouchableOpacity style={styles.touchable}
          onPress={() => this.props.Login(this.state.mail, this.state.pass)} >
          <Text >Login</Text>
        </TouchableOpacity>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  field: {
    height: 40,
    borderWidth:0.5,
    borderStyle:"solid",
    borderColor: "#grey",
    borderRadius:6,
    paddingHorizontal:10,
    paddingVertical:15,
    marginVertical:10,
  },
  touchable: {
    height: 40,
    textAlign:"center",
    padding: 5,
    backgroundColor: "#6213DF",
    borderRadius:4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: "#ffff"
  },


  container: {
    marginTop:20,
    paddingHorizontal: 10,
},

title: {
  color:"#6213DF",
  textAlign:"center"
  
},


})