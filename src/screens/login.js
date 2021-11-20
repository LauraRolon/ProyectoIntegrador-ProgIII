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
      <View>

        <Text>Login</Text>

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

        {
          (this.state.mail && this.state.pass) == null ?
            <TouchableOpacity style={styles.touchable} disabled={true}
              onPress={() => this.props.Login(this.state.mail, this.state.pass)} >
              <Text>Login</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity style={styles.touchable} disabled={false}
              onPress={() => this.props.Login(this.state.mail, this.state.pass)} >
              <Text>Login</Text>
            </TouchableOpacity>
        }

      </View>
    )
  }
}


const styles = StyleSheet.create({
  field: {
    height: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 7,
  },
  touchable: {
    padding: 5,
    backgroundColor: "green",
    marginBottom: 10,
    borderRadius: 5,
  },
})