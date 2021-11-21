import React, { Component } from "react/cjs/react.production.min"
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Camera } from "expo-camera";
import {storage} from "../firebase/config"

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false,
            foto: ""
        }
        this.camera;
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({
                permission: true
            })
        })
        .catch(err => console.log(err))

        Camera.getAvailableCameraTypesAsync()
        .then((res) => console.log(res))
    }

    tomarFoto(){
        this.camera.takePictureAsync()
        .then((photo) => {
            console.log(photo)
            this.setState({
                foto: photo.uri,
            })
        })
        .catch(err => console.log(err))
    }

    guardarFoto(){
        fetch(this.state.foto)
        .then((res) => res.blob())
            .then((image) => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`);
                ref.put(image)
                .then(() => {
                    ref.getDownloadURL()
                    .then((url) => {
                        this.props.imageUpload(url)
                        this.setState({
                            foto: ""
                        })
                    })
                })
            })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <>
                {this.state.foto ? (
                    <>
                        <Image 
                            style={{flex:1}}
                            source={{uri: this.state.foto}}
                        />
                        <View>
                            <Text>¿Está seguro de publicar esta imagen?</Text>
                            <TouchableOpacity onPress={() => this.guardarFoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.tomarFoto()}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (

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
                )}
            </>
        )
    }
}

export default MyCamera;
