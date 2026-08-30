import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';

interface SquiMascotProps {
  size?: number;
  animated?: boolean;
  showLeaves?: boolean;
}

export const SquiMascot: React.FC<SquiMascotProps> = ({
  size = 115,
  animated = true,
  showLeaves = true,
}) => {
// Squirrel Jump Physics
  const jumpY = useRef(new Animated.Value(0)).current;
  const squashScaleY = useRef(new Animated.Value(1)).current;
  const squashScaleX = useRef(new Animated.Value(1)).current;
  const tiltRotate = useRef(new Animated.Value(0)).current;
  const shadowScale = useRef(new Animated.Value(1)).current;
  const shadowOpacity = useRef(new Animated.Value(0.35)).current;

  // Aesthetic Ghost Leaves Physics (5 Layered Ghost Leaves)
  const leafLeft1Y = useRef(new Animated.Value(0)).current;
  const leafLeft1Rot = useRef(new Animated.Value(0)).current;

  const leafRight1Y = useRef(new Animated.Value(0)).current;
  const leafRight1Rot = useRef(new Animated.Value(0)).current;

  const leafCenterY = useRef(new Animated.Value(0)).current;
  const leafCenterRot = useRef(new Animated.Value(0)).current;

  const leafLeftUpperY = useRef(new Animated.Value(0)).current;
  const leafLeftUpperRot = useRef(new Animated.Value(0)).current;

  const leafRightUpperY = useRef(new Animated.Value(0)).current;
  const leafRightUpperRot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;

    const jumpCycle = Animated.loop(
      Animated.sequence([
        // =========================================================================
        // Phase 1: Snappy Crouch Anticipation (200ms) - Leaves 100% STILL
        // =========================================================================
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: 4,
            duration: 200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 0.88,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 1.12,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: -2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 1.15,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),

        // =========================================================================
        // Phase 2: Energetic Snappy Leap Upwards (320ms) - Leaves 100% STILL
        // =========================================================================
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: -26,
            duration: 320,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 1.16,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 0.88,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: 5,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 0.60,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(shadowOpacity, {
            toValue: 0.12,
            duration: 320,
            useNativeDriver: true,
          }),
        ]),

        // =========================================================================
        // Phase 3: Crisp Apex & Gravity Descent (280ms) - Leaves 100% STILL
        // =========================================================================
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: 0,
            duration: 280,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 1.0,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 1.0,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: 0,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 0.95,
            duration: 280,
            useNativeDriver: true,
          }),
          Animated.timing(shadowOpacity, {
            toValue: 0.28,
            duration: 280,
            useNativeDriver: true,
          }),
        ]),

        // =========================================================================
        // Phase 4: Touchdown Impact -> FEET HIT GROUND & LEAVES BURST UP! (220ms)
        // =========================================================================
        Animated.parallel([
          Animated.timing(jumpY, {
            toValue: 3,
            duration: 220,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleY, {
            toValue: 0.85,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(squashScaleX, {
            toValue: 1.15,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(tiltRotate, {
            toValue: -2,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 1.1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(shadowOpacity, {
            toValue: 0.35,
            duration: 220,
            useNativeDriver: true,
          }),

          // 🍂 Impact shockwave kicks up horizontal leaf bed!
          Animated.timing(leafLeft1Y, {
            toValue: -18,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(leafLeft1Rot, {
            toValue: -24,
            duration: 220,
            useNativeDriver: true,
          }),

          Animated.timing(leafRight1Y, {
            toValue: -20,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(leafRight1Rot, {
            toValue: 28,
            duration: 220,
            useNativeDriver: true,
          }),

          Animated.timing(leafCenterY, {
            toValue: -12,
            duration: 200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(leafCenterRot, {
            toValue: 10,
            duration: 200,
            useNativeDriver: true,
          }),

          Animated.timing(leafLeftUpperY, {
            toValue: -26,
            duration: 230,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(leafLeftUpperRot, {
            toValue: -36,
            duration: 230,
            useNativeDriver: true,
          }),

          Animated.timing(leafRightUpperY, {
            toValue: -24,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(leafRightUpperRot, {
            toValue: 34,
            duration: 220,
            useNativeDriver: true,
          }),
        ]),

        // =========================================================================
        // Phase 5: Leaves Settle Back Horizontally on Ground (400ms)
        // =========================================================================
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

          // 🍂 Leaves settle smoothly back into horizontal bed
          Animated.spring(leafLeft1Y, {
            toValue: 0,
            friction: 3.5,
            tension: 28,
            useNativeDriver: true,
          }),
          Animated.spring(leafLeft1Rot, {
            toValue: 0,
            friction: 3.5,
            tension: 28,
            useNativeDriver: true,
          }),

          Animated.spring(leafRight1Y, {
            toValue: 0,
            friction: 3.2,
            tension: 26,
            useNativeDriver: true,
          }),
          Animated.spring(leafRight1Rot, {
            toValue: 0,
            friction: 3.2,
            tension: 26,
            useNativeDriver: true,
          }),

          Animated.spring(leafCenterY, {
            toValue: 0,
            friction: 4,
            tension: 30,
            useNativeDriver: true,
          }),
          Animated.spring(leafCenterRot, {
            toValue: 0,
            friction: 4,
            tension: 30,
            useNativeDriver: true,
          }),

          Animated.spring(leafLeftUpperY, {
            toValue: 0,
            friction: 3.8,
            tension: 26,
            useNativeDriver: true,
          }),
          Animated.spring(leafLeftUpperRot, {
            toValue: 0,
            friction: 3.8,
            tension: 26,
            useNativeDriver: true,
          }),

          Animated.spring(leafRightUpperY, {
            toValue: 0,
            friction: 3.6,
            tension: 28,
            useNativeDriver: true,
          }),
          Animated.spring(leafRightUpperRot, {
            toValue: 0,
            friction: 3.6,
            tension: 28,
            useNativeDriver: true,
          }),
        ]),

        // =========================================================================
        // Phase 6: Ground Rest (3200ms) - Calm peaceful resting pause between jumps
        // =========================================================================
        Animated.delay(3200),
      ])
    );

    jumpCycle.start();
    return () => jumpCycle.stop();
  }, [animated]);

  const rotationInterpolate = tiltRotate.interpolate({
    inputRange: [-15, 0, 15],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const leafLeft1RotInterp = leafLeft1Rot.interpolate({
    inputRange: [-45, 0, 45],
    outputRange: ['-45deg', '0deg', '45deg'],
  });

  const leafRight1RotInterp = leafRight1Rot.interpolate({
    inputRange: [-45, 0, 45],
    outputRange: ['-45deg', '0deg', '45deg'],
  });

  const leafCenterRotInterp = leafCenterRot.interpolate({
    inputRange: [-45, 0, 45],
    outputRange: ['-45deg', '0deg', '45deg'],
  });

  const leafLeftUpperRotInterp = leafLeftUpperRot.interpolate({
    inputRange: [-45, 0, 45],
    outputRange: ['-45deg', '0deg', '45deg'],
  });

  const leafRightUpperRotInterp = leafRightUpperRot.interpolate({
    inputRange: [-45, 0, 45],
    outputRange: ['-45deg', '0deg', '45deg'],
  });

  return (
    <View style={{ width: size + 20, height: size, justifyContent: 'flex-end', alignItems: 'center', position: 'relative', overflow: 'visible' }}>
      {/* ========================================================================= */}
      {/* 🌑 DYNAMIC GROUND FOOTPRINT SHADOW                                        */}
      {/* ========================================================================= */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 2,
          width: 76,
          height: 12,
          opacity: shadowOpacity,
          transform: [{ scaleX: shadowScale }],
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 76 12">
          <Defs>
            <RadialGradient id="shadowGrad" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#1B432C" stopOpacity="0.45" />
              <Stop offset="60%" stopColor="#1B432C" stopOpacity="0.20" />
              <Stop offset="100%" stopColor="#1B432C" stopOpacity="0.0" />
            </RadialGradient>
          </Defs>
          <Ellipse cx="38" cy="6" rx="38" ry="6" fill="url(#shadowGrad)" />
        </Svg>
      </Animated.View>

      {/* ========================================================================= */}
      {/* 🍂 LAYER 1: BACKGROUND GHOST LEAVES (Behind SQUI, zIndex 1)               */}
      {/* ========================================================================= */}
      {showLeaves && (
        <View style={{ position: 'absolute', bottom: 4, width: size + 20, height: 44, alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1 }}>
          {/* Background Rowan Sprig / Fern Branch (Horizontal Spanning) */}
          <Svg width={90} height={20} viewBox="0 0 90 20" fill="none" style={{ position: 'absolute', bottom: 8, opacity: 0.5 }}>
            <Path d="M4 16 Q45 8 86 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <Path d="M16 13 C14 8 22 7 23 12" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" strokeWidth="1.2" />
            <Path d="M34 11 C32 6 40 5 41 10" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" strokeWidth="1.2" />
            <Path d="M52 10 C50 5 58 5 59 10" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" strokeWidth="1.2" />
            <Path d="M70 12 C68 7 76 7 77 12" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" strokeWidth="1.2" />
          </Svg>

          {/* Upper Left Ginkgo Fan Leaf 🍃 */}
          <Animated.View
            style={{
              position: 'absolute',
              left: 4,
              bottom: 14,
              transform: [
                { translateY: leafLeftUpperY },
                { rotate: leafLeftUpperRotInterp },
              ],
            }}
          >
            <Svg width={28} height={20} viewBox="0 0 28 20" fill="none">
              <Path
                d="M14 19 C14 14 7 8 2 6 C7 2 21 1 26 6 C21 8 14 14 14 19 Z"
                fill="rgba(255, 255, 255, 0.20)"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity={0.8}
              />
              <Path d="M14 18 Q7 10 5 8 M14 18 Q14 7 14 4 M14 18 Q21 10 23 8" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" opacity={0.5} />
            </Svg>
          </Animated.View>

          {/* Upper Right Ginkgo Fan Leaf 🍂 */}
          <Animated.View
            style={{
              position: 'absolute',
              right: 4,
              bottom: 12,
              transform: [
                { translateY: leafRightUpperY },
                { rotate: leafRightUpperRotInterp },
              ],
            }}
          >
            <Svg width={28} height={20} viewBox="0 0 28 20" fill="none">
              <Path
                d="M14 19 C14 14 21 8 26 6 C21 2 7 1 2 6 C7 8 14 14 14 19 Z"
                fill="rgba(255, 255, 255, 0.20)"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity={0.8}
              />
              <Path d="M14 18 Q21 10 23 8 M14 18 Q14 7 14 4 M14 18 Q7 10 5 8" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" opacity={0.5} />
            </Svg>
          </Animated.View>
        </View>
      )}

      {/* ========================================================================= */}
      {/* 🐿️ LAYER 2: ORIGINAL SQUI JUMPING MASCOT (100% PRESERVED GEOMETRY)       */}
      {/* ========================================================================= */}
      <Animated.View
        style={{
          zIndex: 2,
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
          {/* 3. FACE (100% PRESERVED & UNTOUCHED ORIGINAL)                             */}
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

      {/* ========================================================================= */}
      {/* 🍂 LAYER 3: FOREGROUND GHOST LEAVES (In Front of Paws, zIndex 3)          */}
      {/* ========================================================================= */}
      {showLeaves && (
        <View style={{ position: 'absolute', bottom: 0, width: size + 20, height: 38, alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 3 }}>
          {/* 1. Left Horizontal Flat Oak Leaf 🍂 */}
          <Animated.View
            style={{
              position: 'absolute',
              left: 2,
              bottom: 2,
              transform: [
                { translateY: leafLeft1Y },
                { rotate: leafLeft1RotInterp },
              ],
            }}
          >
            <Svg width={42} height={22} viewBox="0 0 42 22" fill="none">
              <Path
                d="M2 14 C7 7 14 8 18 4 C24 9 32 7 40 11 C36 17 29 19 22 21 C14 20 8 21 2 14 Z"
                fill="rgba(255, 255, 255, 0.22)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.9}
              />
              <Path d="M3 14 Q21 13 39 11" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity={0.6} />
              <Path d="M13 13 L17 8 M22 13 L27 8 M31 12 L35 9" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity={0.5} />
            </Svg>
          </Animated.View>

          {/* 2. Right Horizontal Flat Heart/Aspen Leaf 🍃 */}
          <Animated.View
            style={{
              position: 'absolute',
              right: 2,
              bottom: 1,
              transform: [
                { translateY: leafRight1Y },
                { rotate: leafRight1RotInterp },
              ],
            }}
          >
            <Svg width={40} height={24} viewBox="0 0 40 24" fill="none">
              <Path
                d="M4 15 C9 6 25 5 36 12 C38 18 29 23 18 22 C9 21 4 19 4 15 Z"
                fill="rgba(255, 255, 255, 0.22)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.9}
              />
              <Path d="M5 15 Q20 14 36 12" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity={0.6} />
              <Path d="M16 14 L20 9 M25 14 L29 9" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity={0.5} />
            </Svg>
          </Animated.View>

          {/* 3. Center Horizontal Maple Star Leaf 🍁 */}
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -1,
              transform: [
                { translateY: leafCenterY },
                { rotate: leafCenterRotInterp },
              ],
            }}
          >
            <Svg width={32} height={20} viewBox="0 0 32 20" fill="none">
              <Path
                d="M16 2 L19 7 L29 6 L23 12 L26 18 L16 14 L6 18 L9 12 L3 6 L13 7 Z"
                fill="rgba(255, 255, 255, 0.24)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.95}
              />
              <Path d="M16 14 V3" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
            </Svg>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

