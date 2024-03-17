/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import farmInfo1 from '../../../assets/icons/farmInfo1.png';
import farmInfo2 from '../../../assets/icons/farmInfo2.png';
import farmInfo3 from '../../../assets/icons/farmInfo3.png';
import farmInfo4 from '../../../assets/icons/farmInfo4.png';
import phoneIcon from '../../../assets/icons/phone.png'

const FormInfo = () => {
    const route = useRoute();
    const navigate = useNavigation();

    const [businessName, setBusinessName] = useState('');
    const [informalName, setInformalName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(route.params.registerData.phone);


    const goBackButton = () => {
        navigate.navigate('RegisterUser');
    };



    const previousData = route.params.registerData;
    //console.log(previousData);


    const handleContinueButton = () => {

        if (!businessName || !informalName || !streetAddress || !city || !selectedState || !zipCode || !phoneNumber) {
            Alert.alert('All fields are required!');
            return;
        }

        const registerData = {
            ...previousData,
            business_name: businessName,
            informal_name: informalName,
            address: streetAddress,
            city: city,
            state: selectedState,
            zip_code: zipCode,
            phone: phoneNumber,
        };
        navigate.navigate('Verification', { registerData });
    };


    const isValidPhoneNumber = () => {
        const regex = /^\+?[0-9]{10,}$/;
        setPhoneNumber
        return regex.test(previousData.phone);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <Text style={styles.headerTitle}>Farmer Eats</Text>
                        <Text style={styles.fadedText}>Signup 2 of 4</Text>
                        <View style={styles.mainContainer}>
                            <Text style={styles.greetingUser}>Farm Info</Text>
                            <View style={styles.textInputSection}>
                                <Image source={farmInfo1} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Business Name"
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent"
                                    onChangeText={setBusinessName}
                                />
                            </View>
                            <View style={styles.textInputSection}>
                                <Image source={farmInfo2} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Informal Name"
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent"
                                    onChangeText={setInformalName}
                                />
                            </View>


                            <View style={styles.textInputSection}>
                                <Image source={phoneIcon} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={isValidPhoneNumber() ? phoneNumber : 'Phone Number with Country Code'}
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent"
                                    keyboardType="phone-pad"
                                    onChangeText={setPhoneNumber}
                                    editable={!isValidPhoneNumber()}
                                />
                            </View>

                            <View style={styles.textInputSection}>
                                <Image source={farmInfo3} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Street Address"
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent"
                                    onChangeText={setStreetAddress}
                                />
                            </View>
                            <View style={styles.textInputSection}>
                                <Image source={farmInfo4} style={styles.iconPassword} />
                                <TextInput
                                    style={styles.inputPassword}
                                    placeholder="City"
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent"
                                    onChangeText={setCity}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={selectedState}
                                        dropdownIconColor="black"
                                        onValueChange={(itemValue) => setSelectedState(itemValue)}
                                    >
                                        <Picker.Item label="Select State" value="" />
                                        <Picker.Item label="Alabama" value="AL" />
                                        <Picker.Item label="Alaska" value="AK" />
                                        <Picker.Item label="Other" value="OT" />
                                        {/* Add more states */}
                                    </Picker>
                                </View>
                                <View style={styles.zipCodeContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Zip Code"
                                        placeholderTextColor="gray"
                                        underlineColorAndroid="transparent"
                                        keyboardType="numeric"
                                        onChangeText={setZipCode}
                                    />
                                </View>
                            </View>
                            {/* Input field for phone number */}

                        </View>
                        <View style={styles.continueButtonContainer}>
                            <TouchableOpacity style={styles.backButton} onPress={goBackButton}>
                                <Image
                                    style={styles.backButtonText}
                                    source={{
                                        uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.continueButton} onPress={handleContinueButton}>
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </TouchableOpacity>
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
        marginBottom: 40,
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

    backButton: {
        marginLeft: 40,
        backgroundColor: 'transparent', // Transparent background
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        width: 30,
        height: 30,
    },

    continueButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 180,
        bottom: 20,
        left: -10,
        right: 30,
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


    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
    },


    picker: {
        flex: 1,
        height: 48,
        color: 'black',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },


    pickerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48, // Adjust the height as needed
        borderRadius: 8,
        marginRight: 10, // Add some margin between the Picker and Zip Code
    },

    zipCodeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginLeft: 10, // Add some margin between the Picker and Zip Code
    },
});

export default FormInfo;
