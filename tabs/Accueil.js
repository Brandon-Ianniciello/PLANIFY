import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native'
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*screens*/
import sportsScreen from '../screens/SportsScreen';




const Accueil = ({ navigation }) => {
    console.log(navigation)

    return(
        <View>
            <Text>
                Home screen
            </Text>
            <FormButton buttonTitle='SPORTS' onPress={() => navigation.navigate("sportsScreen")} />
        </View>
    )
}


export default Accueil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rangée: {
        flexDirection: 'row',
        padding: '5%'
    }
});