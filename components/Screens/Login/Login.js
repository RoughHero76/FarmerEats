/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import atIcon from '../../../assets/icons/at.png';
import lockIcon from '../../../assets/icons/lock.png';
import facebookIcon from '../../../assets/icons/facebook.png';
import googleIcon from '../../../assets/icons/google.png';
import appleIcon from '../../../assets/icons/apple.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
    const navigate = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const clearMessage = () => {
        setErrorMessage('');
    };
    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                if (token) {
                    navigate.navigate('Home');
                }
            })
            .catch(error => console.error('Error reading token:', error));

        clearMessage();

    }, [navigate]);

    useEffect(() => {
        const unsubscribe = navigate.addListener('focus', () => {
            clearMessage();
        });

        return unsubscribe;
    }, [navigate]);

    const handleForgotPassword = () => {
        navigate.navigate('ForgotPassword');
    };

    const handleRegister = () => {
        navigate.navigate('RegisterUser');
    };
    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('All fields are required');
        } else {
            setLoading(true);
            try {
                const Login = {
                    email,
                    password,
                    role: 'farmer',
                    device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
                    type: 'email',
                    social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
                };

                //                console.log('Login data:', Login);

                const response = await axios.post('https://sowlab.com/assignment/user/login', Login);

                //   console.log('Response: ', response);

                // console.log('Response: ', JSON.stringify(response.data, null, 2)); // Debug: Log response data

                if (response.data.success === true) {
                    const token = response.data.token;
                    console.log('Token: ', token);
                    AsyncStorage.setItem('token', token);
                    navigate.navigate('Home');
                } else {
                    setErrorMessage(response.data.message);
                }
            } catch (error) {

                setErrorMessage('An error occurred while logging in.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>
                    Farmer Eats
                </Text>

                <View style={styles.mainContainer}>
                    <Text style={styles.greetingUser}>
                        Welcome Back!
                    </Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.fadedText}>
                            New here?
                        </Text>
                        <TouchableOpacity style={styles.createAccountButton} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sectionStyleEmail} >
                        <Image
                            source={atIcon}
                            style={styles.iconEmail}
                        />
                        <TextInput
                            style={styles.inputEmail}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.sectionStylePassword} >
                        <Image
                            source={lockIcon}
                            style={styles.iconPassword}
                        />
                        <TextInput
                            style={styles.inputPassword}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
                            <Text style={styles.forgotText}>Forgot?</Text>
                        </TouchableOpacity>
                    </View>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}

                    >
                        {loading ? (
                            <>
                                <ActivityIndicator size="small" color="white" />
                                <Text style={styles.loginButtonText}>Please wait...</Text>
                            </>
                        ) : (
                            <Text style={styles.loginButtonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.orLoginText}>Or login with</Text>

                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image
                                source={googleIcon}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image
                                source={appleIcon}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image
                                source={facebookIcon}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    mainContainer: {
        backgroundColor: 'white',
    },
    headerTitle: {
        marginTop: 36,
        marginLeft: 30,
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
        fontWeight: '400',
    },
    rowContainer: {
        marginBottom: 50,
        flexDirection: 'row',
    },
    greetingUser: {
        marginLeft: 30,
        fontSize: 36,
        marginTop: 100,
        color: 'black',
        fontWeight: '700',
    },
    fadedText: {
        marginLeft: 30,
        marginTop: 30,
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
    },
    createAccountButton: {
        marginLeft: 15,
        marginTop: 30,
    },
    buttonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionStyleEmail: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginHorizontal: 30,
    },
    sectionStylePassword: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginHorizontal: 30,
        marginTop: 20,
    },
    iconEmail: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    iconPassword: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        height: 15,
        width: 12,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    inputEmail: {
        flex: 1,
        color: 'black',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    inputPassword: {
        flex: 1,
        color: 'black',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    forgotButton: {
        marginLeft: 10,
        marginRight: 10,
    },
    forgotText: {
        color: '#D5715B',
        fontSize: 14,
        marginRight: 15,
        fontWeight: 'bold',
    },

    errorText: {
        color: 'red',
        fontSize: 14,

        textAlign: 'center',
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: '#D5715B',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 20,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orLoginText: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
    socialIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,

    },
    socialIcon: {
        backgroundColor: 'white',
        width: 96,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },

    icon: {
        width: 30,
        height: 30,
    },
});

export default LoginScreen;
