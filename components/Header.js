import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const Header = (props) => {
    return (
        <LinearGradient
            colors={["rgba(0,210,109,0.4)", "transparent"]}
            style={{ left: 0, right: 0, height: 90, }}>
                <View style={styles.header}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#5cdb95",
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },

    title: {
        color: "#05386b",
        textTransform: 'uppercase',
        fontSize: 28,
        fontWeight: "bold"
    },
});

export default Header;