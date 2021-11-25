import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from '../firebase/config';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Perfil from "../screens/Perfil";
import NewPost from '../screens/NewPost';
import Search from '../screens/Search';


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

    sessionError(mail, pass, error) {
        let mensajeError = ''
        if (error.code == "auth/invalid-email") {
            mensajeError = 'El formato del mail no es valido'
        }
        else if (error.code == 'auth/wrong-password') {
            mensajeError = 'La contraseña es incorrecta'
        }
         else if (true) {
            mensajeError = 'Los datos ingresados no son correctos'
        }

        this.setState({
            estadoError: mensajeError,
            estadoEmail: mail,
            estadoContraseña: pass
        })
    }

    //LOGIN Y LOGOUT
    login(mail, pass) {
        auth.signInWithEmailAndPassword(mail, pass)
            .then(() => {
                this.setState({
                    loggedIn: true,
                });
            })
            .catch(error => this.sessionError(mail, pass, error))
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

                        <Drawer.Screen name="Login" component={() => <Login Login={(mail, pass) => this.login(mail, pass)} error={this.state.estadoError} mail={this.state.estadoEmail} pass={this.state.estadoContraseña}   />} />
                        <Drawer.Screen name="Register" component={() => <Register />} />
                    </Drawer.Navigator>
                </NavigationContainer> :
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={() => <Home />} />
                        <Drawer.Screen name="Buscar" component={() => <Search />} />
                        <Drawer.Screen name=" Mi Perfil" component={() => <Perfil Logout={() => this.logout()} />} />
                        <Drawer.Screen name="Postear" component={() => <NewPost />} />
                    </Drawer.Navigator>
                </NavigationContainer>
        )
    }

}

export default Menu;
