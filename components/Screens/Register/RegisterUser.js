/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import googleIcon from '../../../assets/icons/google.png';
import appleIcon from '../../../assets/icons/apple.png';
import facebookIcon from '../../../assets/icons/facebook.png';
import userIcon from '../../../assets/icons/user.png';
import atIcon from '../../../assets/icons/at.png';
import phoneIcon from '../../../assets/icons/phone.png';
import lockIcon from '../../../assets/icons/lock.png';
import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';



const RegisterUser = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState('');
    const [isEmailUpdated, setIsEmailUpdated] = useState(false);


    const navigate = useNavigation();
    const handleLoginButtonPress = () => {
        navigate.navigate('Login');
    };

    GoogleSignin.configure({
        webClientId: Config.WEB_CLIENT_ID,
        offlineAccess: true,
    });

    useEffect(() => {
        //This is done so, if user come back from next screen, we rest phone state
        setErrorMessage('');
        setPhone('');

    }, []);
    useEffect(() => {
        if (isEmailUpdated) {
            handleNextScreen();
            setIsEmailUpdated(false);
        }
    }, [email, isEmailUpdated]);


    const onGoogleButtonPress = async () => {


        try {
            setErrorMessage('');
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { user } = await GoogleSignin.signIn();


            setFullName(`${user.givenName} ${user.familyName}`);
            setEmail(user.email);
            setType('google');
            setPhone('');
            setIsEmailUpdated(true);

        } catch (error) {

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {

                /* console.log(statusCodes.SIGN_IN_CANCELLED); */
                Alert.alert('Failed', 'Signing up was cancelled');

            } else if (error.code === statusCodes.IN_PROGRESS) {
                /* console.log(statusCodes.IN_PROGRESS); */
                Alert.alert('Please Wait', 'In Progress');

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

                /* console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE); */
                Alert.alert('Play Service', 'Play Service is not available');

            } else {

                Alert.alert('Error', 'Something went wrong');
                /* console.log(error.message); */
            }

        }

    };


    const handleNextScreen = async () => {
        if (!email) {
            Alert.alert('Error', 'Failed to get your email. Please try again');
        } else {


            const registerData = {
                fullName: fullName,
                email: email,
                phone: phone,
                password: password,
                type: type,
                role: 'farmer',

            };
            navigate.navigate('FormInfo', { registerData });


        }
    }

    const handleContinueButtonPress = () => {
        if (validateInputs()) {
            setType('email');
            const registerData = {
                fullName: fullName,
                email: email,
                phone: phone,
                type: type,
                password: password,
                role: 'farmer',
            };
            navigate.navigate('FormInfo', { registerData });
        }
    };
    const validateInputs = () => {
        if (!fullName || !email || !phone || !password || !reEnteredPassword) {
            setErrorMessage('All fields are required.');
            return false;
        } else if (password !== reEnteredPassword) {
            setErrorMessage('Password Dont Match')
        }
        return true;
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                    <View style={styles.container}>
                        <Text style={styles.headerTitle}>
                            Farmer Eats
                        </Text>


                        <Text style={styles.fadedText}>
                            Signup 1 of 4
                        </Text>

                        <View style={styles.mainContainer}>
                            <Text style={styles.greetingUser}>
                                Welcome!
                            </Text>


                            <View style={styles.socialIconContainer}>
                                <TouchableOpacity style={styles.socialIcon} onPre onPress={() => onGoogleButtonPress()
                                }>
                                    <Image
                                        source={googleIcon}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialIcon}>
                                    <Image source={appleIcon} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialIcon}>
                                    <Image source={facebookIcon} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.orSignupText}>or sign up with</Text>
                            <View style={styles.textInputSection}>
                                <Image source={userIcon} style={styles.inputIcon} />
                                <TextInput style={styles.textInput} placeholder="Full Name" placeholderTextColor="gray"
                                    underlineColorAndroid="transparent" onChangeText={setFullName} />
                            </View>
                            <View style={styles.textInputSection}>
                                <Image source={atIcon} style={styles.inputIcon} />
                                <TextInput style={styles.textInput}
                                    placeholder="Email"
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                    onChangeText={setEmail} />
                            </View>
                            <View style={styles.textInputSection}>
                                <Image source={phoneIcon} style={styles.inputIcon} />
                                <TextInput style={styles.textInput}
                                    placeholder="Phone"
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent"
                                    keyboardType="phone-pad"
                                    onChangeText={setPhone}
                                    value={phone}
                                    autoComplete="off"
                                />
                            </View>
                            <View style={styles.textInputSection}>
                                <Image source={lockIcon} style={styles.iconPassword} />
                                <TextInput style={styles.inputPassword}
                                    placeholder="Password"
                                    placeholderTextColor="gray"
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    onChangeText={setPassword}
                                    autoComplete="off"
                                />
                            </View>
                            <View style={styles.textInputSection}>
                                <Image source={lockIcon} style={styles.iconPassword} />
                                <TextInput style={styles.inputPassword}
                                    placeholder="Re-enter Password"
                                    placeholderTextColor="gray" secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    onChangeText={setReEnteredPassword}
                                    autoComplete="off"
                                />


                            </View>
                            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                            <View style={styles.continueButtonContainer}>
                                <TouchableOpacity style={styles.loginButton} onPress={handleLoginButtonPress}>
                                    <Text style={styles.loginButtonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.continueButton}>
                                    <Text style={styles.continueButtonText}
                                        onPress={handleContinueButtonPress}>Continue</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </ScrollView>


        </KeyboardAvoidingView>

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

    greetingUser: {
        marginLeft: 30,
        fontSize: 36,
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
    textInputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginHorizontal: 30,
        marginBottom: 20,
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
    inputIcon: {
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
        width: 15,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    textInput: {
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

    loginButton: {
        marginLeft: 40,
        backgroundColor: 'transparent',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
    },

    continueButtonContainer: {
        marginTop: 0,
        marginLeft: -10,
        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    continueButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        width: 226,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 80,
        marginTop: 20,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orSignupText: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        marginBottom: 30,
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
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default RegisterUser;
