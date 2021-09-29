import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeScreen = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Welcome {user.email}</Text>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.rangée}>
                        <View>
                            <FormButton buttonTitle='SPORTS' onPress={() => navigation.navigate("sportsScreen")} />
                        </View>
                        <View>
                            <FormButton buttonTitle='RESTAURANTS' onPress={() => navigation.navigate("RestaurantScreen")} />
                        </View>
                    </View>
                    <View style={styles.rangée}>

                        <View>
                            <FormButton buttonTitle='FESTIVALS' onPress={() => navigation.navigate("FestivalsScreen")} />
                        </View>
                        <View>
                            <FormButton buttonTitle='PARTYS' onPress={() => navigation.navigate("PartyScreen")} />
                        </View>
                    </View>
                    <View style={styles.rangée}>

                        <View>
                            <FormButton buttonTitle='ATTRACTIONS' onPress={() => navigation.navigate("AttractionScreen")} />
                        </View>
                        <View>
                            <FormButton buttonTitle='DATE' onPress={() => navigation.navigate("IdéeDateScreen")} />
                        </View>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    rangée: {
        flexDirection: 'row',
        padding: '5%'
    }
});