/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Home = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isGoogle, setGoogle] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const type = await AsyncStorage.getItem('type');
                if (token) {
                    setIsLoggedIn(true);
                } else {
                    navigation.navigate('Login');
                }

                if (type) {
                    setGoogle(true);
                }
            } catch (error) {
                console.error('Error checking token:', error);
            }
        };

        checkToken();
    }, [navigation]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');

            if (isGoogle) {
                console.log('Google SignOut Invoked');
                await AsyncStorage.removeItem('type');
                await GoogleSignin.revokeAccess();
            }

            setIsLoggedIn(false);
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to FarmerEats!</Text>
            {isLoggedIn && <Button title="Logout" onPress={handleLogout} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Home;