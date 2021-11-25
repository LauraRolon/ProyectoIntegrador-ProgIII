import React, { Component } from 'react'
import { db } from "../firebase/config"
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Post from '../components/Post'

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
    db.collection("posteos").orderBy('createdAt', 'desc').onSnapshot((docs) => {
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
      <View style={styles.container}>
          <FlatList 
              data={this.state.posts}
              keyExtractor={(post) => post.id}
              renderItem={({item}) => <Post postData={item} />}
          />               
      </View>
    )
  }
}

export default Home
