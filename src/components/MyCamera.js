import React, { Component } from "react/cjs/react.production.min"
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Camera } from "expo-camera";
import {storage} from "../firebase/config"
import Icon from 'react-native-vector-icons/FontAwesome5';

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
        this.startCamera()
    }

    startCamera(){
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

    reTake(){
        this.setState({
            foto: ""
        })
        this.startCamera()
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
                        <View style={styles.botones}>
                            <TouchableOpacity style={styles.captura} onPress={() => this.guardarFoto()}>
                                <Icon size={25} name="check" color="#6d6d6d" regular />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.captura} onPress={() => this.reTake()}>
                                <Icon size={25} name="times" color="#6d6d6d" regular />
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
                style={styles.captura}
                    onPress={() => this.tomarFoto()}>
                    <Icon size={35} name="dot-circle" color="#6d6d6d" regular />
                </TouchableOpacity>
                </>
                )}
            </>
        )
    }
    
}

const styles = StyleSheet.create({
    captura: {
        padding: 20,
        alignItems: "center",
    },
    botones: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    }
})

export default MyCamera;
