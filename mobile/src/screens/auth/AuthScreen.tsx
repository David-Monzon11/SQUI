import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import {
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconEyeOff,
  IconCheckCircle,
  IconAlertCircle,
  IconGoogle,
  IconHomeLeaf,
} from '../../components/common/Icons';
import { authStyles as styles } from './AuthScreen.styles';
import { COLORS } from '../../constants/colors';

// ─── Password Strength Helper ───────────────────────────────────────────────
function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (!password) return { level: 0, label: '', color: 'transparent' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Weak', color: '#EF4444' };
  if (score === 2) return { level: 2, label: 'Fair', color: '#F59E0B' };
  if (score === 3) return { level: 3, label: 'Good', color: '#10B981' };
  return { level: 4, label: 'Strong', color: '#1B432C' };
}

// ─── Animated Focus Input Wrapper ────────────────────────────────────────────
interface FocusInputWrapperProps {
  children: React.ReactNode;
}
const FocusInputWrapper: React.FC<FocusInputWrapperProps> = ({ children }) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(27, 67, 44, 0.10)', '#10B981'],
  });
  const shadowOpacity = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.03, 0.16],
  });

  return (
    <Animated.View style={[styles.inputWrapper, { borderColor, shadowOpacity }]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TextInput) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onFocus: (e: any) => {
              handleFocus();
              if ((child.props as any).onFocus) (child.props as any).onFocus(e);
            },
            onBlur: (e: any) => {
              handleBlur();
              if ((child.props as any).onBlur) (child.props as any).onBlur(e);
            },
          });
        }
        return child;
      })}
    </Animated.View>
  );
};

type AuthMode = 'login' | 'register';

export const AuthScreen: React.FC = () => {
  const { login, register, loginWithGoogle, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');

  // Entrance & Floating Animations
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoY = useRef(new Animated.Value(24)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formY = useRef(new Animated.Value(20)).current;

  // Subtle breathing float for the logo
  const floatAnim = useRef(new Animated.Value(0)).current;



  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 20,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.back(1.4)),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(formY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Continuous gentle hover animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -5,
            duration: 2200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  // Form inputs state
  const [loginIdentifier, setLoginIdentifier] = useState('mindful.squirrel@squi.health');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error feedback + shake animation
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 3, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    triggerShake();
  };

  // Recovery Modals state
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [forgotUsernameVisible, setForgotUsernameVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccessMessage, setRecoverySuccessMessage] = useState<string | null>(null);
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  const handleToggleMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMessage(null);
  };

  const handleLoginSubmit = async () => {
    setErrorMessage(null);
    if (!loginIdentifier.trim()) {
      showError('Please enter your username or email address.');
      return;
    }
    if (!loginPassword) {
      showError('Please enter your password.');
      return;
    }

    const result = await login(loginIdentifier, loginPassword);
    if (!result.success && result.error) {
      showError(result.error);
    }
  };

  const handleRegisterSubmit = async () => {
    setErrorMessage(null);
    if (!firstName.trim()) {
      showError('First name is required.');
      return;
    }
    if (!lastName.trim()) {
      showError('Last name is required.');
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes('@')) {
      showError('Please enter a valid email address.');
      return;
    }
    if (!registerPassword) {
      showError('Password is required.');
      return;
    }
    if (registerPassword.length < 6) {
      showError('Password must be at least 6 characters long.');
      return;
    }
    if (registerPassword !== confirmPassword) {
      showError('Passwords do not match. Please check your confirm password.');
      return;
    }

    const result = await register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: registerEmail.trim(),
      password: registerPassword,
    });

    if (!result.success && result.error) {
      showError(result.error);
    }
  };

  // Password strength for register
  const passwordStrength = getPasswordStrength(registerPassword);

  const handleGoogleSubmit = async () => {
    setErrorMessage(null);
    const result = await loginWithGoogle();
    if (!result.success && result.error) {
      showError(result.error);
    }
  };

  // Recovery handlers
  const handleForgotPassSubmit = async () => {
    if (!recoveryEmail.trim() || !recoveryEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setRecoveryLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setRecoveryLoading(false);
    setRecoverySuccessMessage(`Password reset link sent to ${recoveryEmail.trim()}! Check your inbox.`);
  };

  const handleForgotUserSubmit = async () => {
    if (!recoveryEmail.trim() || !recoveryEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setRecoveryLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setRecoveryLoading(false);
    setRecoverySuccessMessage(`Your username has been sent to ${recoveryEmail.trim()}.`);
  };

  const closeRecoveryModal = () => {
    setForgotPasswordVisible(false);
    setForgotUsernameVisible(false);
    setRecoveryEmail('');
    setRecoverySuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#E8F5EC', '#F4F9F5', '#FAF8F5', '#FDFBF7']}
        locations={[0, 0.25, 0.65, 1]}
        style={styles.gradientBackground}
      >
        {/* Soft Ambient Glow Elements */}
        <View pointerEvents="none" style={[styles.ambientBlob, styles.ambientBlobTopRight]} />
        <View pointerEvents="none" style={[styles.ambientBlob, styles.ambientBlobMidLeft]} />
        <View pointerEvents="none" style={[styles.ambientBlob, styles.ambientBlobBottomRight]} />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={mode === 'register'}
          >
            {/* ─── Animated SQUI Brand Header with Official Logo ─── */}
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  opacity: logoOpacity,
                  transform: [
                    { translateY: Animated.add(logoY, floatAnim) },
                    { scale: logoScale },
                  ],
                },
              ]}
            >
              {/* Outer Glowing Ring */}
              <View style={styles.logoAuraRing}>
                {/* Elevated Inner Card Pedestal */}
                <View style={styles.logoInnerBadge}>
                  <Image
                    source={require('../../../assets/splash_logo.png')}
                    style={styles.logoImage}
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Brand Typography */}
              <Text style={styles.brandTitle}>SQUI</Text>

              {/* Brand Mission Tagline Pill */}
              <View style={styles.brandTaglineBadge}>
                <View style={styles.brandTaglineIcon}>
                  <IconHomeLeaf size={14} color="#2D6A4F" strokeWidth={2.5} />
                </View>
                <Text style={styles.brandTagline}>Mindful Dietary Journaling</Text>
              </View>
            </Animated.View>

            {/* ─── Elevated Card Container ─── */}
            <Animated.View
              style={[
                styles.cardContainer,
                {
                  opacity: formOpacity,
                  transform: [{ translateY: formY }],
                },
              ]}
            >


              {/* Error Message Alert */}
              {errorMessage ? (
                <Animated.View
                  style={[styles.errorContainer, { transform: [{ translateX: shakeAnim }] }]}
                >
                  <IconAlertCircle size={18} color="#EF4444" strokeWidth={2.2} />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </Animated.View>
              ) : null}

              {/* ─── LOG IN FORM ─── */}
              {mode === 'login' ? (
                <View style={styles.formContainer}>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Username or Email</Text>
                    <FocusInputWrapper>
                      <View style={styles.inputIconWrapper}>
                        <IconMail size={18} color="#4A6B56" strokeWidth={2} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your username or email"
                        placeholderTextColor={COLORS.textMuted}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={loginIdentifier}
                        onChangeText={setLoginIdentifier}
                      />
                    </FocusInputWrapper>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Password</Text>
                    <FocusInputWrapper>
                      <View style={styles.inputIconWrapper}>
                        <IconLock size={18} color="#4A6B56" strokeWidth={2} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor={COLORS.textMuted}
                        secureTextEntry={!showLoginPassword}
                        value={loginPassword}
                        onChangeText={setLoginPassword}
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowLoginPassword(!showLoginPassword)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        {showLoginPassword ? (
                          <IconEyeOff size={19} color="#4A6B56" strokeWidth={2} />
                        ) : (
                          <IconEye size={19} color="#4A6B56" strokeWidth={2} />
                        )}
                      </TouchableOpacity>
                    </FocusInputWrapper>
                  </View>

                  {/* Recovery Action Links */}
                  <View style={styles.linksRow}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
                      onPress={() => {
                        setErrorMessage(null);
                        setForgotUsernameVisible(true);
                      }}
                    >
                      <Text style={styles.linkText}>Forgot Username?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
                      onPress={() => {
                        setErrorMessage(null);
                        setForgotPasswordVisible(true);
                      }}
                    >
                      <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Primary Log In Button with Botanical Gradient */}
                  <TouchableOpacity
                    style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                    activeOpacity={0.88}
                    onPress={handleLoginSubmit}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={['#1B432C', '#2D6A4F']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.submitButtonGradient}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                      ) : (
                        <Text style={styles.submitButtonText}>Log In to SQUI</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* OR Divider Line */}
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Google Sign In Button */}
                  <TouchableOpacity
                    style={styles.googleButton}
                    activeOpacity={0.85}
                    onPress={handleGoogleSubmit}
                    disabled={isLoading}
                  >
                    <View style={styles.googleIconWrapper}>
                      <IconGoogle size={18} />
                    </View>
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                  </TouchableOpacity>

                  {/* Toggle to Register */}
                  <View style={styles.toggleModeContainer}>
                    <Text style={styles.toggleModeText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => handleToggleMode('register')}>
                      <Text style={styles.toggleModeLink}>Register here</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                /* ─── REGISTER FORM ─── */
                <View style={styles.formContainer}>
                  {/* First Name & Last Name */}
                  <View style={styles.formRow}>
                    <View style={[styles.fieldGroup, styles.halfField]}>
                      <Text style={styles.label}>First Name</Text>
                      <FocusInputWrapper>
                        <TextInput
                          style={styles.input}
                          placeholder="Sam"
                          placeholderTextColor={COLORS.textMuted}
                          value={firstName}
                          onChangeText={setFirstName}
                        />
                      </FocusInputWrapper>
                    </View>

                    <View style={[styles.fieldGroup, styles.halfField]}>
                      <Text style={styles.label}>Last Name</Text>
                      <FocusInputWrapper>
                        <TextInput
                          style={styles.input}
                          placeholder="Squirrel"
                          placeholderTextColor={COLORS.textMuted}
                          value={lastName}
                          onChangeText={setLastName}
                        />
                      </FocusInputWrapper>
                    </View>
                  </View>

                  {/* Email */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <FocusInputWrapper>
                      <View style={styles.inputIconWrapper}>
                        <IconMail size={18} color="#4A6B56" strokeWidth={2} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="mindful@squi.health"
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={registerEmail}
                        onChangeText={setRegisterEmail}
                      />
                    </FocusInputWrapper>
                  </View>

                  {/* Password */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Password</Text>
                    <FocusInputWrapper>
                      <View style={styles.inputIconWrapper}>
                        <IconLock size={18} color="#4A6B56" strokeWidth={2} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="At least 6 characters"
                        placeholderTextColor={COLORS.textMuted}
                        secureTextEntry={!showRegisterPassword}
                        value={registerPassword}
                        onChangeText={setRegisterPassword}
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowRegisterPassword(!showRegisterPassword)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        {showRegisterPassword ? (
                          <IconEyeOff size={19} color="#4A6B56" strokeWidth={2} />
                        ) : (
                          <IconEye size={19} color="#4A6B56" strokeWidth={2} />
                        )}
                      </TouchableOpacity>
                    </FocusInputWrapper>

                    {/* Password Strength Indicator */}
                    {registerPassword.length > 0 && (
                      <View style={styles.strengthContainer}>
                        <View style={styles.strengthBars}>
                          {[1, 2, 3, 4].map((bar) => (
                            <View
                              key={bar}
                              style={[
                                styles.strengthBar,
                                {
                                  backgroundColor:
                                    bar <= passwordStrength.level
                                      ? passwordStrength.color
                                      : 'rgba(27, 67, 44, 0.1)',
                                },
                              ]}
                            />
                          ))}
                        </View>
                        <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                          {passwordStrength.label}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Confirm Password */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <FocusInputWrapper>
                      <View style={styles.inputIconWrapper}>
                        <IconLock size={18} color="#4A6B56" strokeWidth={2} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Re-enter password"
                        placeholderTextColor={COLORS.textMuted}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        {showConfirmPassword ? (
                          <IconEyeOff size={19} color="#4A6B56" strokeWidth={2} />
                        ) : (
                          <IconEye size={19} color="#4A6B56" strokeWidth={2} />
                        )}
                      </TouchableOpacity>
                    </FocusInputWrapper>

                    {/* Match indicator */}
                    {confirmPassword.length > 0 && (
                      <View style={styles.matchRow}>
                        {confirmPassword === registerPassword ? (
                          <>
                            <IconCheckCircle size={15} color="#10B981" strokeWidth={2.4} />
                            <Text style={[styles.matchLabel, { color: '#10B981' }]}>
                              Passwords match
                            </Text>
                          </>
                        ) : (
                          <>
                            <IconAlertCircle size={15} color="#EF4444" strokeWidth={2.4} />
                            <Text style={[styles.matchLabel, { color: '#EF4444' }]}>
                              Passwords do not match
                            </Text>
                          </>
                        )}
                      </View>
                    )}
                  </View>

                  {/* Submit Register Button with Botanical Gradient */}
                  <TouchableOpacity
                    style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                    activeOpacity={0.88}
                    onPress={handleRegisterSubmit}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={['#1B432C', '#2D6A4F']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.submitButtonGradient}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                      ) : (
                        <Text style={styles.submitButtonText}>Create SQUI Account</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* OR Divider Line */}
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or connect with</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Google Connect Button */}
                  <TouchableOpacity
                    style={styles.googleButton}
                    activeOpacity={0.85}
                    onPress={handleGoogleSubmit}
                    disabled={isLoading}
                  >
                    <View style={styles.googleIconWrapper}>
                      <IconGoogle size={18} />
                    </View>
                    <Text style={styles.googleButtonText}>Connect with Google</Text>
                  </TouchableOpacity>

                  {/* Toggle to Log In */}
                  <View style={styles.toggleModeContainer}>
                    <Text style={styles.toggleModeText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => handleToggleMode('login')}>
                      <Text style={styles.toggleModeLink}>Log in here</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Animated.View>

          </ScrollView>
        </KeyboardAvoidingView>

        {/* ─── FORGOT PASSWORD MODAL ─── */}
        <Modal
          visible={forgotPasswordVisible}
          transparent
          animationType="fade"
          onRequestClose={closeRecoveryModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Reset Password</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={closeRecoveryModal}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalDescription}>
                Enter your registered email address and we will send you password reset instructions.
              </Text>

              {recoverySuccessMessage ? (
                <View style={styles.modalSuccessBox}>
                  <Text style={styles.modalSuccessText}>{recoverySuccessMessage}</Text>
                </View>
              ) : (
                <>
                  {errorMessage ? (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <FocusInputWrapper>
                      <View style={styles.inputIconWrapper}>
                        <IconMail size={18} color="#4A6B56" strokeWidth={2} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="your.email@example.com"
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={recoveryEmail}
                        onChangeText={setRecoveryEmail}
                      />
                    </FocusInputWrapper>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      recoveryLoading && styles.submitButtonDisabled,
                      { marginBottom: 0 },
                    ]}
                    onPress={handleForgotPassSubmit}
                    disabled={recoveryLoading}
                  >
                    <LinearGradient
                      colors={['#1B432C', '#2D6A4F']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.submitButtonGradient}
                    >
                      {recoveryLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                      ) : (
                        <Text style={styles.submitButtonText}>Send Reset Link</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* ─── FORGOT USERNAME MODAL ─── */}
        <Modal
          visible={forgotUsernameVisible}
          transparent
          animationType="fade"
          onRequestClose={closeRecoveryModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Recover Username</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={closeRecoveryModal}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalDescription}>
                Enter your registered email address to find and receive your SQUI username.
              </Text>

              {recoverySuccessMessage ? (
                <View style={styles.modalSuccessBox}>
                  <Text style={styles.modalSuccessText}>{recoverySuccessMessage}</Text>
                </View>
              ) : (
                <>
                  {errorMessage ? (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <FocusInputWrapper>
                      <View style={styles.inputIconWrapper}>
                        <IconMail size={18} color="#4A6B56" strokeWidth={2} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="your.email@example.com"
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={recoveryEmail}
                        onChangeText={setRecoveryEmail}
                      />
                    </FocusInputWrapper>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      recoveryLoading && styles.submitButtonDisabled,
                      { marginBottom: 0 },
                    ]}
                    onPress={handleForgotUserSubmit}
                    disabled={recoveryLoading}
                  >
                    <LinearGradient
                      colors={['#1B432C', '#2D6A4F']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.submitButtonGradient}
                    >
                      {recoveryLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                      ) : (
                        <Text style={styles.submitButtonText}>Find My Username</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};
