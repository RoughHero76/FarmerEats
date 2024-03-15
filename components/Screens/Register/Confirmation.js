/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import confirmationIcon from '../../../assets/icons/confim.png';

const Confirmation = () => {
    const navigate = useNavigation();

    const handleGotItButton = () => {
        navigate.navigate('Login');
    };


    return (
        <View style={styles.container}>

            <ScrollView style={styles.mainContainer}>

                <Image source={confirmationIcon} style={styles.confirmIcon} />
                <Text style={styles.greetingUser}>You’re all done!</Text>
                <Text style={styles.grayText}>
                    Hang tight!  We are currently reviewing your account and will follow up with you in 2-3 business days. In the meantime, you can setup your inventory.
                </Text>


            </ScrollView>

            <View style={styles.gotItButtonContainer}>

                <TouchableOpacity style={styles.gotItButton} onPress={handleGotItButton}>
                    <Text style={styles.gotItButtonText}>Got it</Text>
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
        justifyContent: 'center',
        paddingTop: 90,
        alignItems: 'center',
    },

    mainContainer: {
        backgroundColor: 'white',
        marginTop: 20,

    },
    greetingUser: {
        fontSize: 36,
        color: 'black',
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
    grayText: {
        color: 'gray',
        marginBottom: 20,
        textAlign: 'center',
    },

    gotItButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 80,

    },
    gotItButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        width: 226,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gotItButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    confirmIcon: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
    },
});

export default Confirmation;