import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const IdéesDateScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                PAGE QUI PRÉSENTE PLEINS D'IDÉES DE DATE
            </Text>
            <FlatList>

            </FlatList>
        </View>
    )
}

export default IdéesDateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});