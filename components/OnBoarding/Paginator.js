/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Animated, StyleSheet, useWindowDimensions } from 'react-native';

const Paginator = ({ data, scrollX, currentIndex }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotScaleX = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        style={[styles.dot, { transform: [{ scaleX: dotScaleX }], opacity }]}
                        key={i.toString()}
                    />
                );
            })}
        </View>
    );
};

export default Paginator;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', // Center horizontally
        height: 64,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    dot: {
        height: 10,
        width: 20, // Set width explicitly
        borderRadius: 5,
        backgroundColor: 'black',
        marginHorizontal: 4, // Adjust horizontal margin as needed
    },
});
