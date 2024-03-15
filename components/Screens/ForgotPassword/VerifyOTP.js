/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const VerifyOTP = () => {
    const navigate = useNavigation();
    const [otp, setOTP] = useState(['', '', '', '', '', '']);

    const handleLoginButtonPress = () => {
        navigate.navigate('Login');
    };

    const handleResendCodePress = () => {
        // resend logic
    };

    const handleSubmitPress = async () => {

        if (otp.some(digit => digit === '')) {
            Alert.alert('Please enter the OTP completely.');
            return;
        }
        try {
            const requestBody = {
                otp: otp.join(''),
            };
            const response = await axios.post('https://sowlab.pw/assignment/user/verify-otp', requestBody);

            if (response.data.success === true) {
                Alert.alert(response.data.message);
                const token = response.data.token;
                navigate.navigate('ResetPassword', { token });

            } else {
                Alert.alert(response.data.message);

            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Sorry, something went wrong while verifying the OTP.');
        }
    };

    const handleChangeText = (value, index) => {
        const newOTP = [...otp];
        newOTP[index] = value;

        if (value.length === 1 && index < 5) {
            inputRefs[index + 1].focus();
        }

        setOTP(newOTP);
    };


    const inputRefs = [];

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>FarmerEats</Text>

            <View style={styles.mainContainer}>
                <Text style={styles.verifyOTPHeading}>Verify OTP</Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.rememberPasswordText}>Remember your password?</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLoginButtonPress}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* OTP Input Fields */}
                <View style={styles.otpInputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={ref => (inputRefs[index] = ref)}
                            style={styles.otpInput}
                            maxLength={1}
                            value={digit}
                            onChangeText={value => handleChangeText(value, index)}
                            keyboardType="number-pad"
                        />
                    ))}
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

                {/* Resend Code Button */}
                <TouchableOpacity style={styles.resendCodeButton} onPress={handleResendCodePress}>
                    <Text style={styles.resendCodeButtonText}>Resend Code</Text>
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
        paddingHorizontal: 30,
    },
    headerTitle: {
        marginTop: 36,
        marginLeft: 30,
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
        fontWeight: '400',
    },
    verifyOTPHeading: {
        marginTop: 100,
        fontSize: 36,
        color: 'black',
        fontWeight: '700',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    rememberPasswordText: {
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
    },
    loginButton: {
        marginRight: 95,
    },
    buttonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
    },
    otpInputContainer: {
        flexDirection: 'row',
    },
    otpInput: {
        backgroundColor: '#ededed',
        width: 48,
        height: 48,
        borderRadius: 8,
        textAlign: 'center',
        marginHorizontal: 5,
        fontSize: 16,
        color: 'black',
    },
    submitButton: {
        backgroundColor: '#D5715B',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resendCodeButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    resendCodeButtonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default VerifyOTP;

