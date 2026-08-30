import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SquiMascot } from './SquiMascot';
import { IconHomeLeaf } from './Icons';

interface AnimatedSplashProps {
  onFinish: () => void;
  isReady: boolean;
  isUpdating?: boolean;
  updateStatusText?: string;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const AnimatedSplash: React.FC<AnimatedSplashProps> = ({
  onFinish,
  isReady,
  isUpdating = false,
  updateStatusText = '',
}) => {
  const [showLogo, setShowLogo] = useState(false);

  // Background and overall overlay fade
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  // Mascot positioning and animations (Centered)
  const mascotOpacity = useRef(new Animated.Value(0)).current;
  const mascotScale = useRef(new Animated.Value(0.7)).current;
  const mascotX = useRef(new Animated.Value(0)).current;
  const mascotY = useRef(new Animated.Value(0)).current;

  // Leaves control
  const leavesOpacity = useRef(new Animated.Value(0)).current;
  const leavesScale = useRef(new Animated.Value(1)).current;

  // Leaf 1 Y/X offsets (starts above, offsets left)
  const leaf1Y = useRef(new Animated.Value(-240)).current;
  const leaf1X = useRef(new Animated.Value(-85)).current;

  // Leaf 2 Y/X offsets (starts above, offsets right)
  const leaf2Y = useRef(new Animated.Value(-280)).current;
  const leaf2X = useRef(new Animated.Value(85)).current;

  // Leaf 3 Y/X offsets (starts above, offsets slightly left)
  const leaf3Y = useRef(new Animated.Value(-260)).current;
  const leaf3X = useRef(new Animated.Value(-40)).current;

  // Leaf 4 Y/X offsets (starts above, offsets slightly right)
  const leaf4Y = useRef(new Animated.Value(-220)).current;
  const leaf4X = useRef(new Animated.Value(45)).current;

  // Flutter / Sway animation loop value
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Final Logo animations
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Background drifting blobs Y/X translations
  const bg1X = useRef(new Animated.Value(-120)).current;
  const bg1Y = useRef(new Animated.Value(-140)).current;
  const bg2X = useRef(new Animated.Value(120)).current;
  const bg2Y = useRef(new Animated.Value(140)).current;
  const bg3X = useRef(new Animated.Value(-140)).current;
  const bg3Y = useRef(new Animated.Value(80)).current;

  // Interpolated sways (X displacement and rotation) to simulate natural wind flutter
  const leaf1SwayX = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 10] });
  const leaf1Rot = floatAnim.interpolate({ inputRange: [0, 1], outputRange: ['-35deg', '35deg'] });

  const leaf2SwayX = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [12, -12] });
  const leaf2Rot = floatAnim.interpolate({ inputRange: [0, 1], outputRange: ['45deg', '-25deg'] });

  const leaf3SwayX = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [-8, 8] });
  const leaf3Rot = floatAnim.interpolate({ inputRange: [0, 1], outputRange: ['-15deg', '45deg'] });

  const leaf4SwayX = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [10, -10] });
  const leaf4Rot = floatAnim.interpolate({ inputRange: [0, 1], outputRange: ['20deg', '-40deg'] });

  useEffect(() => {
    // Start background drift loops
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(bg1X, { toValue: -80, duration: 6000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(bg1Y, { toValue: -110, duration: 6000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(bg1X, { toValue: -120, duration: 6000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(bg1Y, { toValue: -140, duration: 6000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(bg2X, { toValue: 80, duration: 7000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(bg2Y, { toValue: 100, duration: 7000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(bg2X, { toValue: 120, duration: 7000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(bg2Y, { toValue: 140, duration: 7000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(bg3X, { toValue: -100, duration: 5500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(bg3Y, { toValue: 110, duration: 5500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(bg3X, { toValue: -140, duration: 5500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(bg3Y, { toValue: 80, duration: 5500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ])
    ).start();

    // -------------------------------------------------------------
    // Stage 1: Fade-in SQUI Mascot
    // -------------------------------------------------------------
    Animated.parallel([
      Animated.timing(mascotOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(mascotScale, {
        toValue: 1,
        tension: 14,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // -------------------------------------------------------------
      // Stage 2: Leaves flutter down and sway around the mascot
      // -------------------------------------------------------------
      Animated.parallel([
        // Fade in leaves opacity
        Animated.timing(leavesOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Vertical falling animations
        Animated.timing(leaf1Y, { toValue: 55, duration: 1500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(leaf2Y, { toValue: 40, duration: 1700, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(leaf3Y, { toValue: -80, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(leaf4Y, { toValue: -60, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]).start(() => {
        // Start continuous wind sway/flutter loop for the leaves
        Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim, {
              toValue: 1,
              duration: 1800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(floatAnim, {
              toValue: 0,
              duration: 1800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    });
  }, []);

  // Monitor app loading state to trigger the morph transition
  useEffect(() => {
    if (isReady && !isUpdating) {
      // Allow the animation to play fully before collapsing (minimum 3 seconds)
      const delayTimer = setTimeout(() => {
        triggerMorphTransition();
      }, 3000);

      return () => clearTimeout(delayTimer);
    }
  }, [isReady, isUpdating]);

  const triggerMorphTransition = () => {
    // Stop the sway loop and prepare the morph
    floatAnim.setValue(0);
    setShowLogo(true);

    Animated.parallel([
      // Collapse mascot to center
      Animated.timing(mascotScale, { toValue: 0.15, duration: 600, useNativeDriver: true }),
      Animated.timing(mascotOpacity, { toValue: 0, duration: 550, useNativeDriver: true }),

      // Collapse leaves into the center (0, 0)
      Animated.timing(leaf1X, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),
      Animated.timing(leaf1Y, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),
      Animated.timing(leaf2X, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),
      Animated.timing(leaf2Y, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),
      Animated.timing(leaf3X, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),
      Animated.timing(leaf3Y, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),
      Animated.timing(leaf4X, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),
      Animated.timing(leaf4Y, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.0)), useNativeDriver: true }),

      // Shrink and fade out leaves group
      Animated.timing(leavesScale, { toValue: 0.15, duration: 550, useNativeDriver: true }),
      Animated.timing(leavesOpacity, { toValue: 0, duration: 550, useNativeDriver: true }),

      // Fade in & spring the final cute acorn mascot logo in the center
      Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, tension: 14, friction: 5, useNativeDriver: true }),
    ]).start(() => {
      // -------------------------------------------------------------
      // Stage 4: Exit transition into the application dashboard
      // -------------------------------------------------------------
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 1.28,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onFinish();
        });
      }, 1200); // Display the cute acorn brand icon for 1.2 seconds
    });
  };

  return (
    <AnimatedLinearGradient
      colors={['#FDFBF7', '#E3ECE6']}
      style={[
        styles.overlay,
        { opacity: overlayOpacity },
      ]}
    >
      {/* Background Drifting Ambient Blobs */}
      <Animated.View
        style={[
          styles.bgBlob,
          styles.bgBlob1,
          {
            transform: [{ translateX: bg1X }, { translateY: bg1Y }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bgBlob,
          styles.bgBlob2,
          {
            transform: [{ translateX: bg2X }, { translateY: bg2Y }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bgBlob,
          styles.bgBlob3,
          {
            transform: [{ translateX: bg3X }, { translateY: bg3Y }],
          },
        ]}
      />

      {/* Centered Canvas Container */}
      <View style={styles.centerContainer}>
        {/* Squirrel Mascot (Centered) */}
        <Animated.View
          style={{
            position: 'absolute',
            opacity: mascotOpacity,
            transform: [
              { translateX: mascotX },
              { translateY: mascotY },
              { scale: mascotScale },
            ],
            zIndex: 2,
          }}
        >
          <SquiMascot size={120} animated={true} showLeaves={false} />
        </Animated.View>

        {/* Falling Leaves Group */}
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: leavesOpacity,
            transform: [{ scale: leavesScale }],
            zIndex: 3,
          }}
        >
          {/* Leaf 1: Mint Emerald Green (Bottom-Left) */}
          <Animated.View
            style={[
              styles.leafWrapper,
              {
                transform: [
                  { translateX: Animated.add(leaf1X, leaf1SwayX) },
                  { translateY: leaf1Y },
                  { rotate: leaf1Rot },
                  { scale: 0.9 },
                ],
              },
            ]}
          >
            <IconHomeLeaf size={24} color="#34D399" />
          </Animated.View>

          {/* Leaf 2: Vibrant Emerald Green (Bottom-Right) */}
          <Animated.View
            style={[
              styles.leafWrapper,
              {
                transform: [
                  { translateX: Animated.add(leaf2X, leaf2SwayX) },
                  { translateY: leaf2Y },
                  { rotate: leaf2Rot },
                  { scale: 1.1 },
                ],
              },
            ]}
          >
            <IconHomeLeaf size={24} color="#10B981" />
          </Animated.View>

          {/* Leaf 3: Dark Forest Green (Top-Left) */}
          <Animated.View
            style={[
              styles.leafWrapper,
              {
                transform: [
                  { translateX: Animated.add(leaf3X, leaf3SwayX) },
                  { translateY: leaf3Y },
                  { rotate: leaf3Rot },
                  { scale: 1.0 },
                ],
              },
            ]}
          >
            <IconHomeLeaf size={24} color="#059669" />
          </Animated.View>

          {/* Leaf 4: Light Pastel Green (Top-Right) */}
          <Animated.View
            style={[
              styles.leafWrapper,
              {
                transform: [
                  { translateX: Animated.add(leaf4X, leaf4SwayX) },
                  { translateY: leaf4Y },
                  { rotate: leaf4Rot },
                  { scale: 0.8 },
                ],
              },
            ]}
          >
            <IconHomeLeaf size={24} color="#6EE7B7" />
          </Animated.View>
        </Animated.View>

        {/* Brand App Icon (Acorn Mascot) */}
        {showLogo && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              styles.logoWrapper,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
                zIndex: 10,
              },
            ]}
          >
            <View style={styles.logoBorderContainer}>
              <Image
                source={require('../../../assets/MLogo.jpg')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Animated.Text style={[styles.brandText, { opacity: logoOpacity }]}>
              SQUI
            </Animated.Text>
          </Animated.View>
        )}
      </View>

      {/* Checking/Applying updates message */}
      {isUpdating && (
        <View style={styles.updatingContainer}>
          <Text style={styles.updatingText}>{updateStatusText}</Text>
        </View>
      )}
    </AnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  centerContainer: {
    width: 320,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bgBlob: {
    position: 'absolute',
    borderRadius: 999,
  },
  bgBlob1: {
    width: 240,
    height: 240,
    backgroundColor: 'rgba(16, 185, 129, 0.07)', // Soft emerald
  },
  bgBlob2: {
    width: 280,
    height: 280,
    backgroundColor: 'rgba(245, 158, 11, 0.05)', // Soft warm amber
  },
  bgBlob3: {
    width: 190,
    height: 190,
    backgroundColor: 'rgba(5, 150, 105, 0.04)', // Soft deep forest green
  },
  leafWrapper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -12,
    marginTop: -12,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBorderContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  logoImage: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  brandText: {
    marginTop: 16,
    fontSize: 22,
    color: '#1B432C',
    fontWeight: '800',
    letterSpacing: 3,
  },
  updatingContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  updatingText: {
    fontSize: 14,
    color: '#1B432C',
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});
