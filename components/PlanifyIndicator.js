import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

const PlanifyIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color="black" size="large" />
            <Image source={require("../assets/logo.png")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
    }
});

export default PlanifyIndicator;