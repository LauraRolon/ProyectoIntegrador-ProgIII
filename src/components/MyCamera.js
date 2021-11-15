import React, { Component } from "react/cjs/react.production.min"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"
import { Camera } from "expo-camera";

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false,
        }
        this.camera;
    }

    tomarFoto(){

    }

    render(){
        return(
            <>
                <Camera 
                    style={{flex:1, width: "100%"}}
                    type={Camera.Constants.Type.front}
                    ref={(reference) => this.camera = reference}
                />

                <TouchableOpacity
                    onPress={() => this.tomarFoto()}>
                    <Text>Capturar</Text>
                </TouchableOpacity>
            </>
        )
    }
}

export default MyCamera;
