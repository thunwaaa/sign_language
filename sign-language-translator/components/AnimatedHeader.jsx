import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate,
} from 'react-native-reanimated';

export default function AnimatedHeader({ title, scrollY }) {
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 120],
        [120, 80],
        Extrapolate.CLAMP
      ),
      opacity: interpolate(
        scrollY.value,
        [0, 100],
        [1, 0.9],
        Extrapolate.CLAMP
      ),
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        scrollY.value,
        [0, 120],
        [32, 24],
        Extrapolate.CLAMP
      ),
      opacity: interpolate(
        scrollY.value,
        [0, 50, 100],
        [1, 0.8, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 120],
            [0, -10],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.header, headerAnimatedStyle]}>
      <Animated.Text style={[styles.title, titleAnimatedStyle]}>
        {title}
      </Animated.Text>
    </Animated.View>
  );
}

AnimatedHeader.propTypes = {
  title: PropTypes.string.isRequired,
  scrollY: PropTypes.object.isRequired, // SharedValue is an object in JavaScript
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
});