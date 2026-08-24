import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface SquiMascotProps {
  size?: number;
  animated?: boolean;
}

export const SquiMascot: React.FC<SquiMascotProps> = ({
  size = 115,
  animated = true,
}) => {
  // Jump Physics Animation
  const jumpY = useRef(new Animated.Value(0)).current;
  const squashScaleY = useRef(new Animated.Value(1)).current;
  const squashScaleX = useRef(new Animated.Value(1)).current;
  const tiltRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;

    const jumpCycle = Animated.loop(
      Animated.sequence([
        // Phase 1: Crouch / Anticipation (250ms)
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: 5,
            duration: 250,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 0.88,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 1.12,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: -3,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),

        // Phase 2: Joyful Leap Upwards (350ms)
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: -24,
            duration: 350,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 1.18,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 0.88,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: 6,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),

        // Phase 3: Apex Float in Air (300ms)
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: -28,
            duration: 300,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 1.0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 1.0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: 2,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),

        // Phase 4: Touchdown Impact (280ms)
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: 3,
            duration: 280,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 0.86,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 1.14,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: -2,
            duration: 280,
            useNativeDriver: true,
          }),
        ]),

        // Phase 5: Spring Rebound & Settle (400ms)
        Animated.parallel([
          Animated.spring(jumpY, {
            toValue: 0,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(squashScaleY, {
            toValue: 1.0,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(squashScaleX, {
            toValue: 1.0,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(tiltRotate, {
            toValue: 0,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),

        Animated.delay(400),
      ])
    );

    jumpCycle.start();
    return () => jumpCycle.stop();
  }, [animated]);

  const rotationInterpolate = tiltRotate.interpolate({
    inputRange: [-15, 0, 15],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  return (
    <View style={{ width: size, height: size, justifyContent: 'flex-end', alignItems: 'center' }}>
      <Animated.View
        style={{
          transform: [
            { translateY: jumpY },
            { rotate: rotationInterpolate },
            { scaleY: squashScaleY },
            { scaleX: squashScaleX },
          ],
        }}
      >
        <Svg width={size} height={size} viewBox="0 0 120 95" fill="none">
          <Defs>
            {/* Pure SQUI Emerald Green Body Fill */}
            <LinearGradient id="squiPureEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#34D399" />
              <Stop offset="50%" stopColor="#10B981" />
              <Stop offset="100%" stopColor="#059669" />
            </LinearGradient>
          </Defs>

          {/* ========================================================================= */}
          {/* 1. TAIL (Smooth, Rounded, Perfectly Inked Stencil Silhouette)             */}
          {/* ========================================================================= */}
          <Path
            d="
              M 34 54
              C 28 62 20 72 12 72
              C 6 72 4 64 6 52
              C 8 36 14 20 24 10
              C 34 0 48 4 52 14
              C 56 22 52 28 48 30
              C 44 30 40 26 42 22
              C 42 32 38 44 34 54
              Z
            "
            fill="url(#squiPureEmerald)"
            stroke="#051A0E"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ========================================================================= */}
          {/* 2. SQUI BODY & LEGS (Seamlessly Integrated, Clean Outline)                */}
          {/* ========================================================================= */}
          <Path
            d="
              M 54 34
              C 40 38 28 46 20 56
              C 12 68 14 78 18 84
              C 22 86 34 86 44 84
              C 48 78 52 76 58 76
              C 58 80 56 84 60 84
              C 64 84 66 84 70 84
              C 70 78 70 72 72 70
              C 72 76 70 84 74 84
              C 78 84 84 84 86 84
              C 88 72 84 62 76 56
              C 82 56 88 54 94 48
              C 98 44 100 40 98 38
              C 92 32 84 22 78 20
              C 76 16 80 6 82 4
              C 78 4 72 10 70 14
              C 68 12 68 8 68 4
              C 64 6 62 12 62 16
              C 58 20 54 26 54 34
              Z
            "
            fill="url(#squiPureEmerald)"
            stroke="#051A0E"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ========================================================================= */}
          {/* 3. FACE (100% PRESERVED & UNTOUCHED)                                      */}
          {/* ========================================================================= */}

          {/* Smiling Mouth Line */}
          <Path
            d="M 74 56 C 80 58 86 56 92 50"
            stroke="#051A0E"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Big Beautiful Cartoon Eye (Untouched) */}
          <Ellipse
            cx="81"
            cy="36"
            rx="6.5"
            ry="8.5"
            fill="#051A0E"
          />
          {/* Big Crisp White Circular Pupil Shine */}
          <Circle
            cx="80"
            cy="33"
            r="3.2"
            fill="#FFFFFF"
          />

          {/* Snout Oval Button Nose */}
          <Ellipse
            cx="97"
            cy="40"
            rx="2.5"
            ry="3.8"
            fill="#FFFFFF"
            stroke="#051A0E"
            strokeWidth="2.6"
            transform="rotate(15 97 40)"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};
