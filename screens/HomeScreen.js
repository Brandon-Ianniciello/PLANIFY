import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native'
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen = ({navigation}) => {
    const {user, logout} = useContext(AuthContext);

    return(
        <View>
            <Text>Welcome {user.uid}</Text>
            <FormButton buttonTitle='Logout' onPress={() => logout()}/>
        </View>
    )
}

export default HomeScreen;