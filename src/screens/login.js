import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.mail,
      pass: this.props.pass,
    }
  }

  
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Login</Text>

        <Text>{this.props.error}</Text>

        <TextInput style={styles.field}
          keyboardType="email-address"
          placeholder="mail"
          onChangeText={text => this.setState({ mail: text })}
          value={this.state.mail}
        />

        <TextInput style={styles.field}
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ pass: text })}
          value={this.state.pass}
        />

  
        <TouchableOpacity 
          style={(this.state.mail && this.state.pass) == null ? styles.touchableUnable : styles.touchable}
          disabled={(this.state.mail && this.state.pass) == null ? true : false}
          onPress={() => this.props.Login(this.state.mail, this.state.pass)} >
            <Text>Login</Text>
        </TouchableOpacity>
            
      </View>
    )
  }
}


const styles = StyleSheet.create({
  field: {
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: '#dbdbdb'
  },

  touchable: {
    height: 40,
    textAlign: "center",
    padding: 5,
    backgroundColor: "#6213DF",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: "#ffff"
  },
  touchableUnable:{
    height: 40,
    textAlign: "center",
    padding: 5,
    backgroundColor: "#cdc3db",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: "#ffff"
  },

  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },

  title: {
    color: "#6213DF",
    textAlign: "center",
    fontSize: 40,
    fontWeight: '500',
    padding: 50,

  },

  touchableText: {
    color: "#ffffff",
    
  }

})

export default Login
