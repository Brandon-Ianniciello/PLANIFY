import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native'
import FormButton from '../components/FormButton';

const HomeScreen = () => {
    return(
        <View>
            <Text>Home Page</Text>
            <FormButton buttonTitle='Logout' onPress={() => {}}/>
        </View>
    )
}

export default HomeScreen;