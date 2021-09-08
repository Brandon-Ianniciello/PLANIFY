import React, {useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/Onboarding';
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true)
      }else{
        setIsFirstLaunch(false)
      }
    })
  }, []);

  if( isFirstLaunch === null){
    return null;
  }else if( isFirstLaunch === true){
    routeName = 'Onboarding';
  }else{
    routeName = 'Login';
  }

  return(
      <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="Signup"
            component={SignupScreen} 
            options={{headerShown: false}}
          />
      </Stack.Navigator>
  )
  
}

export default AuthStack; 