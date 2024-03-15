/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BusinessHours = () => {
    const navigate = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);

    const previousData = route.params.registerData;


    const device_token = '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx';
    const type = 'email';
    const social_id = '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx';
    //console.log(previousData);

    const goBackButton = () => {
        navigate.goBack();
    };



    const handleSubmittButton = async () => {
        const registerData = {
            full_name: previousData.fullName,
            email: previousData.email,
            phone: previousData.phone,
            password: previousData.password,
            role: previousData.role,
            business_name: previousData.business_name,
            informal_name: previousData.informal_name,
            address: previousData.address,
            city: previousData.city,
            state: previousData.state,
            zip_code: previousData.zip_code,
            registration_proof: previousData.registration_proof,
            business_hours: businessHours,
            device_token: device_token,
            type: type,
            social_id: social_id,
        };

        //console.log('SUBMMISSION DATA: ', registerData);

        try {
            setLoading(true);
            const response = await fetch('https://sowlab.pw/assignment/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (response.ok) {
                //console.log('Registration successful');

                //console.log(response);
                navigate.navigate('Confirmation');
            } else {
                const errorData = await response.json();
                Alert.alert('Registration failed:', errorData);

            }
        } catch (error) {
            //console.error('Error:', error);

        } finally {
            setLoading(false)
        }
    };

    const [selectedDay, setSelectedDay] = useState(null);
    const [businessHours, setBusinessHours] = useState({
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    });

    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const timings = ['8:00am - 10:00am', '10:00am - 1:00pm', '1:00pm - 4:00pm', '4:00pm - 7:00pm', '7:00pm - 10:00pm'];

    const toggleTiming = (day, timing) => {
        setBusinessHours((prevState) => {
            const updatedHours = { ...prevState };
            if (updatedHours[day].includes(timing)) {
                updatedHours[day] = updatedHours[day].filter((t) => t !== timing);
            } else {
                updatedHours[day].push(timing);
            }
            return updatedHours;
        });
    };

    const getDayButtonStyle = (day) => {
        const isOpenOnDay = businessHours[day].length > 0;
        const isSelected = selectedDay === day;

        if (isOpenOnDay && isSelected) {
            return styles.selectedDayButton;
        } else if (isOpenOnDay) {
            return styles.openDayButton;
        } else if (isSelected) {
            return styles.selectedDayButton;
        } else {
            return styles.dayButton;
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 30,
            paddingTop: 50,
        },
        mainContainer: {
            flex: 1,
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
        daysContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        dayButton: {
            backgroundColor: 'white',
            borderRadius: 8,
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderColor: '#d3d3d3',
            borderWidth: 1,
        },
        selectedDayButton: {
            backgroundColor: '#D5715B',
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 8,
        },
        dayText: {
            fontSize: 16,
            color: '#333',
        },
        selectedDayText: {
            color: 'white',
        },
        timingsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        timingButton: {
            backgroundColor: '#F0F0F0',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginBottom: 10,
            width: '48%',
        },
        evenTimingButton: {
            marginRight: '4%',
        },
        selectedTiming: {

            backgroundColor: '#F8C569',
        },
        timingText: {
            fontSize: 15,
            color: '#333',
            textAlign: 'center',
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
        openDayButton: {
            backgroundColor: '#d3d3d3',
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 8,
        },
    });

    //console.log('Day: ', businessHours);

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Farmer Eats</Text>
            <Text style={styles.fadedText}>Signup 4 of 4</Text>

            <ScrollView style={styles.mainContainer}>
                <Text style={styles.greetingUser}>Business Hours</Text>
                <Text style={styles.grayText}>
                    Choose the hours your farm is open for pickups. This will allow customers to order deliveries.
                </Text>

                <View style={styles.daysContainer}>
                    {daysOfWeek.map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={getDayButtonStyle(day)}
                            onPress={() => setSelectedDay(day)}
                        >
                            <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>
                                {day.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {selectedDay && (
                    <View style={styles.timingsContainer}>
                        {timings.map((timing, index) => (
                            <TouchableOpacity
                                key={timing}
                                style={[
                                    styles.timingButton,
                                    businessHours[selectedDay].includes(timing) && styles.selectedTiming,
                                    index % 2 === 0 && styles.evenTimingButton,
                                ]}
                                onPress={() => toggleTiming(selectedDay, timing)}
                            >
                                <Text style={styles.timingText}>{timing}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={[styles.timingButton, businessHours[selectedDay].length === 0 && styles.selectedTiming]}
                            onPress={() => setBusinessHours((prevState) => ({ ...prevState, [selectedDay]: [] }))}
                        >
                            <Text style={styles.timingText}>Closed</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            <View style={styles.continueButtonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={goBackButton}>
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
                        }}
                        style={styles.backButtonIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={handleSubmittButton} disabled={loading}

                >
                    {loading ? (
                        <>
                            <ActivityIndicator size="small" color="white" />
                            <Text style={styles.continueButtonText}>Please wait...</Text>
                        </>
                    ) : (
                        <Text style={styles.continueButtonText}>Submitt</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BusinessHours;
