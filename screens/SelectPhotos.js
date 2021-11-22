
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlatList } from 'react-native-gesture-handler';

const SelectPhotos = ({ route, navigation }) => {

    let url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    if (route.params != undefined)
        if (route.params.photoUrl != "")
            url = route.params.photoUrl

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isCameraStart, setCamera] = useState(false)
    const [galleryLunch, setLunchGallery] = useState(false)

    const [photoPrise, setPhoto] = useState(null)
    const [previewVisible, setPreviewVisible] = useState(false)

    let camera = new Camera()

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            setCamera(true)
        }
        else{
            alert("Access denied")
        }
    }
    const takePicture = async () => {
        console.log("click")
        const { p } = await Camera.takePictureAsync()
        setPreviewVisible(true)
        setPhoto(p)
        console.log(p)
    }
    const retakePicture = () => {
        setPhoto(null)
        setPreviewVisible(false)
        startCamera()
    }
    const savePhoto = () => {
        url = photoPrise
    }

    const getMedias = async() => {
        const albumName = "Camera"
        const getPhotos = await MediaLibrary.getAlbumsAsync(albumName)

        const m = await MediaLibrary.getAssetsAsync({
            first:20,
            album:getPhotos,
            sortBy:['creationTime'],
            mediaType:'photo'
        })

        return m
    }
    const CameraPreview = (photo) => {
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <ImageBackground
                    source={{ uri: photo && photo.uri }}
                    style={{
                        flex: 1
                    }}
                />
            </View>
        )
    }

    if (previewVisible && photoPrise != null) {
        return (<CameraPreview photo={photoPrise} />)
    }
    if (isCameraStart) {
        return (
            <View style={styles.container}>
                <Camera
                    style={{ flex: 1, width: "100%" }}
                    ref={(r) => {
                        camera = r
                    }}
                    type={type}
                >
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={()=>takePicture()}
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: '#fff'
                            }}
                        />

                        <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{color:'white'}}>Tourner la camera</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            
            </View>

        )
    }
    if (galleryLunch) {
        MediaLibrary.requestPermissionsAsync()
        const medias = getMedias()
        return (
            <View>
                <Text>
                    Gallery
                </Text>
                <FlatList
                    data={medias}
                    refreshing={true}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return(
                            <View>
                                {/* <Image
                                    source={{
                                        uri:ite
                                    }}
                                /> */}
                                {item.toString()}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: url }}
                style={{ width: 200, height: 200 }}
            />

            <TouchableOpacity onPress={() => startCamera()} style={styles.button}  >
                <Text style={styles.buttonText}>Lancer la caméra</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLunchGallery(true)} style={styles.button}  >
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