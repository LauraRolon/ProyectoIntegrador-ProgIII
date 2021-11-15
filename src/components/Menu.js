import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from '../firebase/config';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Perfil from "../screens/Perfil";
import NewPost from '../screens/NewPost';


const Drawer = createDrawerNavigator();
class Menu extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            error: ""
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            console.log(user);
            if (user !== null) {
                this.setState({
                    loggedIn: true
                })
            } else {
                this.setState({
                    loggedIn: false
                })
            }
        })
    }

    //LOGIN Y LOGOUT
    login(mail, pass) {
        auth.signInWithEmailAndPassword(mail, pass)
            .then((response) => {
                console.log("logueado")
                console.log(response)
                this.setState({
                    loggedIn: true,
                });
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    error: "Credenciales inválidas."
                })
            })
    }


    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    loggedIn: false,
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            this.state.loggedIn == false ?
                <NavigationContainer>
                    <Drawer.Navigator>

                        <Drawer.Screen name="Login" component={() => <Login Login={(mail, pass) => this.login(mail, pass)} error={this.state.error} />} />
                        <Drawer.Screen name="Register" component={() => <Register />} />
                    </Drawer.Navigator>
                </NavigationContainer> :
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={() => <Home />} />
                        <Drawer.Screen name=" Mi Perfil" component={() => <Perfil Logout={() => this.logout()} />} />
                        <Drawer.Screen name="Postear" component={() => <NewPost />} />
                    </Drawer.Navigator>
                </NavigationContainer>


        )
    }

}

export default Menu;

