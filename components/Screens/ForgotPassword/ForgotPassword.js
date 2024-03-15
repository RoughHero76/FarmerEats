/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Forgotpassword = () => {


    const navigate = useNavigation();

    const [mobile, setMobile] = useState();
    const [loading, setloading] = useState(false);

    const handleLoginButtonPres = () => {
        navigate.navigate('Login');
    };

    const handleSendCodeButton = async () => {

        if (!mobile) {
            //console.log('Error: Phone number is required!');
            Alert.alert('Error', 'Phone number is required!');
            return;
        } else {

            setloading(true);
            try {
                const ForgotPassword = {
                    mobile: mobile,
                };

                //console.log('Sending request with mobile number:', mobile);

                const response = await axios.post('https://sowlab.com/assignment/user/forgot-password', ForgotPassword);

                //console.log('Response:', JSON.stringify(response.data, null, 2));

                if (response.data.success === true) {
                    Alert.alert('Sucess', response.data.message);
                    navigate.navigate('VerifyOTP');
                } else {
                    Alert.alert('Error: But you check out rest of Screens', response.data.message);
                    navigate.navigate('VerifyOTP');
                }
            } catch (error) {
                console.log('Error:', error);
                Alert.alert('Sorry', 'Something went wrong with the server or client.');
            } finally {
                setloading(false);
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.container}>
                <Text style={styles.headerTitle}>FarmerEats</Text>

                <View style={styles.mainContainer}>
                    <Text style={styles.forgotPasswordHeading}>Forgot Password?</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.rememberPasswordText}>Remember your password?</Text>
                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.buttonText} onPress={handleLoginButtonPres}>Login</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.infoCountryCode}>Enter your phone number with your country code</Text>


                    <View style={styles.sectionStylePhone} >
                        <Image
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/159/159832.png',
                            }}
                            style={styles.iconPhone}
                        />
                        <TextInput
                            style={styles.inputPhone}
                            placeholder="Phone Number"
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={setMobile}
                        />
                    </View>

                    <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCodeButton} disabled={loading}
                    >
                        {loading ? (
                            <>
                                <ActivityIndicator size="small" color="white" />
                                <Text style={styles.sendCodeButtonText}>Please wait...</Text>
                            </>
                        ) : (
                            <Text style={styles.sendCodeButtonText}>Send Code</Text>
                        )}
                    </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    forgotPasswordHeading: {
        marginLeft: 30,
        fontSize: 36,
        marginTop: 100,
        color: 'black',
        fontWeight: '700',
    },
    rememberPasswordText: {
        marginTop: 30,
        marginBottom: 50,
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
    },

    infoCountryCode: {
        marginTop: 0,
        marginLeft: 35,
        marginBottom: 10,
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
    },


    sectionStylePhone: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginHorizontal: 30,
    },

    inputPhone: {
        flex: 1,
        color: 'black',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },

    iconPhone: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'contain',
        alignItems: 'center',
    },

    loginButton: {
        marginTop: -20,
        marginLeft: 10,
    },
    buttonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
    },

    sendCodeButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 20,
    },
    sendCodeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Forgotpassword;
