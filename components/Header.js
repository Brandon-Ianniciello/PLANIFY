import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';

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
        flexDirection:"row"
    },

    title:{
        color: "#05386b",
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase'
    }
});

export default Header;