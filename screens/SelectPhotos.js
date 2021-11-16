import * as ImagePicker from 'react-native-image-picker';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

const SelectPhotos = ({ route, navigation }) => {

    let source = ""
    let url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    if(route.params!=undefined)
        url = route.params.photoUrl
    
    const [state, setState] = useState({ resourcePath: {} })
    console.log(url)
    const cameraLaunch = () => {
        console.log("camera lunch")
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                source = { uri: res.uri };
                console.log('response', JSON.stringify(res));
                setState({
                    filePath: res,
                    fileData: res.data,
                    fileUri: res.uri
                });
                url = res.uri
            }
        });
    }

    const imageGalleryLaunch = () => {
        console.log("select an image from gallery")
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchImageLibrary(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                source = { uri: res.uri };
                console.log('response', JSON.stringify(res));
                setState({
                    filePath: res,
                    fileData: res.data,
                    fileUri: res.uri
                });
                url = res.uri
            }
        });
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: url }}
                style={{ width: 200, height: 200 }}
            />
            
            <TouchableOpacity onPress={cameraLaunch} style={styles.button}  >
                <Text style={styles.buttonText}>Lancer la caméra</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={imageGalleryLaunch} style={styles.button}  >
                <Text style={styles.buttonText}>Sélectionner une image dans la photothèque</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SelectPhotos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
})