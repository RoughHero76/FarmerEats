/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './components/OnBoarding/OnBoarding';
import Login from './components/Screens/Login/Login';
import ForgotPassword from './components/Screens/ForgotPassword/ForgotPassword';
import VerifyOTP from './components/Screens/ForgotPassword/VerifyOTP';
import ResetPassword from './components/Screens/ForgotPassword/ResetPassword';
import RegisterUser from './components/Screens/Register/RegisterUser';
import FormInfo from './components/Screens/Register/FormInfo';
import Verification from './components/Screens/Register/Verification';
import BusinessHours from './components/Screens/Register/BusinessHours';
import Confirmation from './components/Screens/Register/Confirmation';
import Home from './components/Screens/Home/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="onBoarding">



          {/*  OnBoarding Screen */}
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{
              headerShown: false,
            }}
          />

          {/*  Login Screen */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />


          {/*  Register Screen */}
          <Stack.Screen
            name="RegisterUser"
            component={RegisterUser}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="FormInfo"
            component={FormInfo}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="BusinessHours"
            component={BusinessHours}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          {/* Forgot Password Screens */}
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerifyOTP"
            component={VerifyOTP}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: 'FarmerEats',
              headerBackVisible: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );

};


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
