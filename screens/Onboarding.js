import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Suivant = () => (
    <TouchableOpacity
        title='Suivant'
    />
)

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
        NextButtonComponent={Suivant}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages ={[
            {
                backgroundColor: '#FDEB93',
                image: <Image style={styles.images} source={require('../assets/Friends.png')}></Image>,
                title: 'Connectez vous',
                subtitle: 'Nouveau moyen de ce connecter avec le monde'
            },
            {
                backgroundColor: '#A6E4D0',
                image: <Image style={styles.images} source={require('../assets/CalendarV3.png')}></Image>,
                title: 'Planification',
                subtitle: 'Planifiez des activités rapidement'
            },
            {
                backgroundColor: '#E9BCBE',
                image: <Image style={styles.images} source={require('../assets/Cellphone.png')}></Image>,
                title: 'Simplicité',
                subtitle: "Vous pouvez faire cela avec seulement l'aide de votre téléphone intelligent"
            }
        ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    images: {
        height: 250 ,
        width: 250,
        marginTop: 0
    }
});