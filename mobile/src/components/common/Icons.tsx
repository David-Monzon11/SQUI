import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Minimalist Monoline SVG Icons matching SQUI Logo Aesthetic
export const IconHome: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z"/>
      <Path d="M9 21v-7a3 3 0 0 1 6 0v7"/>
    </Svg>
  </View>
);

export const IconPlus: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2.4 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  </View>
);

export const IconFoodDiary: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="9"/>
      <Path d="M12 7v5l3 3"/>
      <Path d="M8 12a4 4 0 0 0 8 0"/>
    </Svg>
  </View>
);

export const IconPulseTrend: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </Svg>
  </View>
);

export const IconBookLearn: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <Path d="M8 7h8"/>
      <Path d="M8 11h6"/>
    </Svg>
  </View>
);

export const IconMenuBars: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="3" y1="12" x2="21" y2="12"/>
      <Line x1="3" y1="6" x2="21" y2="6"/>
      <Line x1="3" y1="18" x2="21" y2="18"/>
    </Svg>
  </View>
);

export const IconSettings: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="3" />
      <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Svg>
  </View>
);

export const IconUser: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="7" r="4"/>
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    </Svg>
  </View>
);

// Auth Provider Icons
export const IconGoogle: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <Path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <Path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <Path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </Svg>
  </View>
);

export const IconApple: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#000000' }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.02-.49 2.63-1.24z" />
    </Svg>
  </View>
);

export const IconFacebook: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
      <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </Svg>
  </View>
);

export const IconMailCheck: React.FC<IconProps> = ({ size = 16, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <Path d="M22 6l-10 7L2 6" />
    </Svg>
  </View>
);

export const IconCameraSmall: React.FC<IconProps> = ({ size = 14, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <Circle cx="12" cy="13" r="4" />
    </Svg>
  </View>
);

export const IconDroplet: React.FC<IconProps> = ({ size = 20, color = '#2D6A4F', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </Svg>
  </View>
);

export const IconScale: React.FC<IconProps> = ({ size = 20, color = '#2D6A4F', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="9"/>
      <Path d="M12 8v4l2.5 2.5"/>
    </Svg>
  </View>
);

export const IconHeartPulse: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      <Path d="M3.22 12H9.5l1.5-3 2 6.5 1.5-3.5h3.3"/>
    </Svg>
  </View>
);

export const IconCameraPlus: React.FC<IconProps> = ({ size = 22, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <Circle cx="12" cy="13" r="3"/>
    </Svg>
  </View>
);

export const IconTarget: React.FC<IconProps> = ({ size = 20, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10" />
      <Circle cx="12" cy="12" r="6" />
      <Circle cx="12" cy="12" r="2" />
    </Svg>
  </View>
);

export const IconBell: React.FC<IconProps> = ({ size = 20, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Svg>
  </View>
);

export const IconChevronRight: React.FC<IconProps> = ({ size = 18, color = '#849C8D', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  </View>
);

export const IconEdit: React.FC<IconProps> = ({ size = 16, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Svg>
  </View>
);

export const IconHelpCircle: React.FC<IconProps> = ({ size = 20, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10" />
      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <Line x1="12" y1="17" x2="12.01" y2="17" />
    </Svg>
  </View>
);

export const IconMessageSquare: React.FC<IconProps> = ({ size = 20, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Svg>
  </View>
);

export const IconBug: React.FC<IconProps> = ({ size = 20, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M8 2v4" />
      <Path d="M16 2v4" />
      <Path d="M12 11v8" />
      <Path d="M19 13a7 7 0 0 1-14 0" />
      <Circle cx="12" cy="13" r="5" />
      <Path d="M5 8l-3 2" />
      <Path d="M19 8l3 2" />
      <Path d="M5 18l-3-2" />
      <Path d="M19 18l3-2" />
    </Svg>
  </View>
);

export const IconLogout: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <Path d="M16 17l5-5-5-5" />
      <Path d="M21 12H9" />
    </Svg>
  </View>
);

export const IconShieldCheck: React.FC<IconProps> = ({ size = 20, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <Path d="M9 12l2 2 4-4" />
    </Svg>
  </View>
);

export const IconSparkles: React.FC<IconProps> = ({ size = 20, color = '#D4A373', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </Svg>
  </View>
);

export const IconMoon: React.FC<IconProps> = ({ size = 20, color = '#1B432C', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Svg>
  </View>
);

// =========================================================================
// SQUI Proprietary Concept SVG Emblems (Nature & Mindful Nutrition)
// =========================================================================

/**
 * SQUI Sugar Consumed Emblem: Sleek Minimalist Isometric Sugar Cube
 */
export const IconSquiSugar: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 3L20 7.5L12 12L4 7.5L12 3Z" fill={color} fillOpacity={0.12} />
      <Path d="M4 7.5V16.5L12 21V12" fill={color} fillOpacity={0.06} />
      <Path d="M20 7.5V16.5L12 21" fill={color} fillOpacity={0.18} />
    </Svg>
  </View>
);

/**
 * SQUI Sodium Consumed Emblem: Sleek Minimalist Salt Shaker / Cellar
 */
export const IconSquiSodium: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Sleek Cap */}
      <Path d="M9 3H15V6H9V3Z" fill={color} fillOpacity={0.2} />
      {/* Tapered Cellar Body */}
      <Path d="M9 6L6.5 18.5C6.2 20 7.5 21 9 21H15C16.5 21 17.8 20 17.5 18.5L15 6" fill={color} fillOpacity={0.1} />
      {/* Salt Level Line */}
      <Path d="M8 14C10 13.2 14 13.2 16 14" strokeOpacity={0.6} />
    </Svg>
  </View>
);

/**
 * SQUI Weight & Body Trend: Aesthetic Waistline & Measuring Tape Silhouette
 */
export const IconSquiScale: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Left Torso / Waist Contour */}
      <Path d="M5 3C7 7.5 7 10 5.5 14C4.5 17 4 19 4 21" />
      {/* Right Torso / Waist Contour */}
      <Path d="M19 3C17 7.5 17 10 18.5 14C19.5 17 20 19 20 21" />
      {/* Measuring Tape Ribbon across Waist */}
      <Path d="M5.8 12C9 14.5 15 14.5 18.2 12" />
      {/* Measuring Tape Notch Marks */}
      <Path d="M9 13.2V14.6M12 13.8V15.4M15 13.2V14.6" strokeWidth={strokeWidth * 0.85} />
    </Svg>
  </View>
);

/**
 * SQUI Hydration Dewdrop: Sleek Minimalist Water Dewdrop
 */
export const IconSquiHydration: React.FC<IconProps> = ({ size = 20, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Minimalist Dewdrop Silhouette */}
      <Path
        d="M12 2.5C12 2.5 5 11 5 15.8C5 19.8 8.1 22 12 22C15.9 22 19 19.8 19 15.8C19 11 12 2.5 12 2.5Z"
        fill={color}
        fillOpacity={0.15}
      />
      {/* Sleek Inner Reflection Arc */}
      <Path
        d="M8.5 15C9 18 10.5 19 12 19"
        strokeWidth={strokeWidth * 0.85}
      />
    </Svg>
  </View>
);

/**
 * SQUI Weather & Climate Icon: Sun Peeking Behind Cloud
 */
export const IconWeatherSunCloud: React.FC<IconProps> = ({ size = 22, color = '#FFFFFF', strokeWidth = 2 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Sun Core & Rays */}
      <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeWidth={strokeWidth * 0.8} opacity={0.7} />
      <Circle cx="12" cy="12" r="4" fill={color} fillOpacity={0.2} />
      {/* Friendly Organic Cloud Silhouette */}
      <Path
        d="M17.5 19H9a5 5 0 0 1-1.2-9.85A6.5 6.5 0 0 1 20.2 12 4 4 0 0 1 17.5 19z"
        fill={color}
        fillOpacity={0.25}
      />
    </Svg>
  </View>
);

// SQUI Custom Woodland Brand Navigation Icons
// SQUI Custom Woodland Brand Navigation Icons
// SQUI Custom Woodland Brand Navigation Icons
// SQUI Custom Woodland Brand Navigation Icons
export const IconHomeLeaf: React.FC<IconProps> = ({ size = 30, color = '#1B432C', strokeWidth = 3.0 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Normalized Centered Plump Leaf */}
      <Path d="M12 4.5C8.8 7.5 6.5 11 6.5 14.5a5.5 5.5 0 0 0 11 0c0-3.5-2.3-7-5.5-10z" />
      <Line x1="12" y1="9" x2="12" y2="17.5" stroke="#FFFFFF" strokeWidth={1.8} />
    </Svg>
  </View>
);

export const IconSquiCameraLog: React.FC<IconProps> = ({ size = 30, color = '#1B432C', strokeWidth = 3.0 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Centered Plump Apple */}
      <Path d="M12 7a5 5 0 0 0-5 5c0 4.2 3.5 6 5 6s5-1.8 5-6a5 5 0 0 0-5-5z" fill={color} />
      <Path d="M12 7V4" />
      <Path d="M12 5.5c1.2 0 2-.8 2-1.5" />
    </Svg>
  </View>
);

export const IconSquiTrends: React.FC<IconProps> = ({ size = 30, color = '#1B432C', strokeWidth = 3.0 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Normalized Centered Plump Sprout */}
      <Path d="M12 18.5V6" />
      <Path d="M12 13c-3-.5-4-2.5-4-2.5s2.5-.5 4 1.2" fill={color} />
      <Path d="M12 10.5c3-.5 4-2.5 4-2.5s-2.5-.5-4 1.2" fill={color} />
    </Svg>
  </View>
);

export const IconSquiSettings: React.FC<IconProps> = ({ size = 30, color = '#1B432C', strokeWidth = 3.0 }) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* Cozy Woodland Mushroom representing Settings/Menu */}
      <Path d="M5 11.5c0-3.8 3.2-6.5 7-6.5s7 2.7 7 6.5c0 .5-.5 1-1 1H6c-.5 0-1-.5-1-1z" fill={color} />
      <Path d="M10 12.5v3.5c0 1.5.8 2 2 2s2-.5 2-2v-3.5" />
      {/* Contrast White Spores */}
      <Circle cx="9.5" cy="8.5" r="1.0" fill="#FFFFFF" stroke="none" />
      <Circle cx="14.5" cy="9.0" r="1.2" fill="#FFFFFF" stroke="none" />
      <Circle cx="12.0" cy="11.0" r="1.0" fill="#FFFFFF" stroke="none" />
    </Svg>
  </View>
);

export const IconSquiAcornBackground: React.FC<IconProps> = ({ size = 64, color = '#1B432C' }) => (
  <View style={{ width: size, height: size, position: 'absolute', justifyContent: 'center', alignItems: 'center', opacity: 0.14 }}>
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Distinct stubby stalk */}
      <Line x1="12" y1="4.5" x2="12" y2="2" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      {/* Acorn cap & nut body */}
      <Path
        d="M12 4.5C16.8 4.5 20.5 5.5 20.5 7.5c0 .8-1.5 1.5-3.5 1.8C17.5 13 16.5 20 12 20C7.5 20 6.5 13 7 9.3c-2-.3-3.5-1-3.5-1.8c0-2 3.7-3.2 8.5-3.2z"
        fill={color}
      />
    </Svg>
  </View>
);



