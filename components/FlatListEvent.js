import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import EventButton from './EventButton';
const Event = ({ item, navigation, nomPage }) => {
    /*--variables--*/
    let localisation = ""
    let description = ""

    if (item.localisation != null || item.localisation != undefined)
        localisation = item.localisation
    if (item.Description != null || item.Description != undefined)
        description = item.Description

    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'column' }}>
                {/* titre */}
                <View style={{flexDirection:'row', width:'100%', borderBottomColor:'#dcdcdc', borderBottomWidth:1,}}>
                    <Text style={styles.titre}>{item.nom}</Text>
                    {/* Bouton pour lenlever' */}
                    {/* <TouchableOpacity style={styles.boutonDelete} onPress={()=>console.log("delete",item.nom)}>
                        <Text>🗑️</Text>
                    </TouchableOpacity> */}
                </View>
                {/* description */}
                <View style={{ flexDirection: 'row',paddingLeft:20,paddingTop:10,paddingBottom:10,width:'100%' }}>
                    <Text >
                        {description}
                    </Text>
                </View>
                <View style={{borderTopColor:'#dcdcdc',borderTopWidth:1}}>
                    <EventButton navigation={navigation} item={item} nomPage={nomPage} />
                </View>
            </View>
        </View>
    )
}

const FlatListEvent = ({ data, navigation, nomPage }) => {
    const D = data    
    if (D != null || D != undefined) {
        return (
            <View style={styles.container}>
                <View style={styles.liste}>
                    <FlatList
                        data={D}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Event item={item} navigation={navigation} nomPage={nomPage}/>
                            )
                        }
                        }
                    />
                </View>
            </View>
        )
    }
    else if (data == null || data == undefined) {
        return (
            <View style={styles.container}>
                <Text>AUCUNS ÉVÈNEMENTS TROUVÉS</Text>
            </View>
        )
    }
}

export default FlatListEvent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    liste: {
        flexDirection: "column"
    },
    titre:{
        fontSize:30,
        paddingLeft:5
    },
    item:{
        borderColor:'black',
        margin:0,
        marginTop:15,
        flexDirection:'row',
        backgroundColor: 'white',
        width:'100%'
    },
    boutonDelete: {
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight:45,
        color: 'white',
        alignItems: 'center'
    }
})