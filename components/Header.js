import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{ props.title }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#5cdb95",
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row",
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15
    },

    title:{
        color: "#05386b",
        textTransform: 'uppercase',
        fontSize: 28,
        fontWeight:"bold"
    },
});

export default Header;