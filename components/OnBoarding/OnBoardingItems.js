/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const OnBoardingItems = ({ item }) => {

    const navigate = useNavigation();
    const { width } = useWindowDimensions();

    // Determine background color based on the item's properties
    let backgroundColor;
    switch (item.id) {
        case '1':
            backgroundColor = '#5EA25F';
            break;
        case '2':
            backgroundColor = '#D5715B';
            break;
        case '3':
            backgroundColor = '#F8C569';
            break;
        default:
            backgroundColor = '#FFFFFF'; // Default color
            break;
    }

    // Function to handle button press
    const handleegisterButtonPress = () => {

        navigate.navigate('RegisterUser')
        // Handle button press action here
    };

    const handleLoginButtonPress = () => {
        navigate.navigate('Login');
    };

    return (
        <View style={[styles.container, { width, backgroundColor }]}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={handleegisterButtonPress}>
                    <Text style={styles.buttonText}>Join the movement!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonLogin} onPress={handleLoginButtonPress}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OnBoardingItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 0.6,
        justifyContent: 'flex-end',
        width: '100%',
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 0.5,
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        /*  justifyContent: 'space-around' */
    },
    title: {
        marginTop: 35,
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
    },
    description: {
        marginTop: 20,
        fontWeight: '400',
        fontSize: 17,
        color: '#62656b',
        textAlign: 'justify',
        paddingHorizontal: 20,
        fontFamily: 'Be Vietnam Bold',
    },
    button: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 20,
    },

    buttonLogin: {
        marginTop: 20,
        marginBottom: 10,

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    loginButtonText: {

        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});
