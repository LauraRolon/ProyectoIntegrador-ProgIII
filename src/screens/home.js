import React, { Component } from 'react'
import { db } from "../firebase/config"
import { Text, View, StyleSheet } from 'react-native'


class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      posts: []
    }
  }

  componentDidMount(){
    this.showPost();
  }

  showPost(){
    db.collection("posteos").onSnapshot((docs) => {
      let posteos = []
      docs.forEach((doc) => {
        posteos.push({
          id:doc.id,
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
        <Text> Home </Text>
      </View>
    )
  }
}

export default Home

//VER CLASE MIN 31.00
