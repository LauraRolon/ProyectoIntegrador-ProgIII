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
    db.collection("posteos").onSnapshot((docs) => {
      let posteos = []
      docs.forEach((doc) => {
        posteos.push({ //meto en el array esto
          id:doc.id,
          data: doc.data()
        })
      })
      this.setState({   //seteo estado post con posteos
        posts: posteos
      })
    })
  }

  render() {
    return (
      <View>
          <FlatList 
                    data={this.state.posts} //el array
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <Post postData={item} />} //paso como prop
                />  
      </View>
    )
  }
}

export default Home

//VER CLASE MIN 31.00
