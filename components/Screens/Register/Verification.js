/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';



const Verification = () => {
    const route = useRoute();
    const navigate = useNavigation();

    const handleBackButtonPress = () => {
        navigate.goBack();
    };

    const registration_proof = 'my_proof.pdf';
    const previousData = route.params.registerData;

    console.log(previousData);
    const handleContinueButtonPress = () => {

        const registerData = {
            ...previousData,
            registration_proof: registration_proof,

        };

        console.log(registerData);
        navigate.navigate('BusinessHours', { registerData });
    };


    const [selectedDocument, setSelectedDocument] = useState('');

    const handleAttachProofPress = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedDocument(res[0].name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                // Handle errors
            }
        }
    };

    const handleCameraPress = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: 1,
            includeBase64: false,
        };

        launchCamera(options, (response) => {
            if (response.errorCode) {
                console.log('CameraPicker Error:', response.errorMessage);
            } else if (!response.didCancel) {
                setSelectedDocument(response.assets[0].fileName); // Update the selected document with the image name
            } else {
                console.log('User cancelled camera picker');
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Farmer Eats</Text>
            <Text style={styles.fadedText}>Signup 3 of 4</Text>

            <ScrollView style={styles.mainContainer}>
                <Text style={styles.greetingUser}>Verification</Text>
                <Text style={styles.grayText}>
                    Attached proof of Department of Agriculture registrations i.e. Florida Fresh, USDA Approved, USDA Organic
                </Text>

                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.attachProofButton} onPress={handleAttachProofPress}>
                        <Text style={styles.attachProofText}>
                            {selectedDocument ? `Attached: ${selectedDocument}` : 'Attach proof of registration'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
                        <Image
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/128/685/685655.png',
                            }}
                            style={styles.cameraIcon}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.continueButtonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
                        }}
                        style={styles.backButtonIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinueButtonPress}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    mainContainer: {
        backgroundColor: 'white',
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
        marginBottom: 10,
    },
    fadedText: {
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    greetingUser: {
        fontSize: 36,
        color: 'black',
        fontWeight: '700',
        marginBottom: 20,
    },
    grayText: {
        color: 'gray',
        marginBottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    attachProofButton: {
        flex: 1,
    },
    attachProofText: {
        color: 'black',
        fontSize: 16,
    },
    cameraButton: {
        backgroundColor: '#D5715B',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
    cameraIcon: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
    continueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
    },
    backButton: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonIcon: {
        width: 30,
        height: 30,
    },
    continueButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        width: 226,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Verification;
