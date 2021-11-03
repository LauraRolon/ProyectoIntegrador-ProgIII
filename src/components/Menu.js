import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.setState = {}

    }
    
    render(){
        return (
            <NavigationContainer>
              <Drawer.Navigator>
                 <Drawer.Screen name="Home" component={()=><Home />} />
                 <Drawer.Screen name="Login" component={()=><Login />} />
                 <Drawer.Screen name="Register" component={()=><Register />} />
              </Drawer.Navigator>
            </NavigationContainer>
         )
    }

}

export default Menu;
