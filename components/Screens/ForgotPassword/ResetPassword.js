/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import lockIcon from '../../../assets/icons/lock.png';

const ResetPassword = () => {



    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigation();

    const route = useRoute();


    const handleSubmitPress = async () => {
        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        } else if (!newPassword || !confirmPassword) {
            setMessage('Both fields are required');
            return;
        }

        try {
            const requestBody = {
                token: route.params.token,
                password: newPassword,
                cpassword: confirmPassword,
            };

            const response = await axios.post('https://sowlab.pw/assignment/user/reset-password', requestBody);

            if (response.data.success === true) {
                navigate.navigate('Login');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Sorry, something went wrong while resetting the password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                Farmer Eats
            </Text>

            <View style={styles.mainContainer}>
                <Text style={styles.greetingUser}>
                    Reset Password
                </Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.fadedText}>
                        Type your new password
                    </Text>

                </View>
                <Text style={styles.messageText}> {message} </Text>
                <View style={styles.sectionStylePassword} >

                    <Image
                        source={lockIcon}
                        style={styles.iconPassword}
                    />
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="New Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        onChangeText={(password) => setNewPassword(password)}
                    />
                </View>

                <View style={styles.sectionStyleNewPassword} >
                    <Image
                        source={lockIcon}
                        style={styles.iconPassword}
                    />
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Confirm New Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        onChangeText={(password) => setConfirmPassword(password)}
                    />

                </View>


                <TouchableOpacity style={styles.submittButton} onPress={handleSubmitPress}>
                    <Text style={styles.submittButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        marginBottom: 30,
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
    loginButton: {
        marginLeft: 15,
        marginTop: 30,
    },
    buttonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
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
    },
    sectionStyleNewPassword: {
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
    iconPassword: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'contain',
        alignItems: 'center',
    },

    inputPassword: {
        flex: 1,
        color: 'black',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },

    submittButton: {
        backgroundColor: '#D5715B',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 20,
    },
    submittButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    messageText: {
        marginTop: -20,
        marginLeft: 30,
        color: 'red',
        marginBottom: 10,
    },

});

export default ResetPassword;
