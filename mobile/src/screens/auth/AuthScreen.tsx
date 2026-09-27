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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { IconSquiMascot } from '../../components/common/Icons';
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

  if (score <= 1) return { level: 1, label: 'Weak', color: '#C53030' };
  if (score === 2) return { level: 2, label: 'Fair', color: '#D97706' };
  if (score === 3) return { level: 3, label: 'Good', color: '#2D6A4F' };
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
    outputRange: ['rgba(16, 185, 129, 0.15)', 'rgba(27, 67, 44, 0.7)'],
  });
  const shadowOpacity = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.04, 0.18],
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

  // Entrance Animation for Header Logo (Animates from Splash Position to Header)
  const logoScale = useRef(new Animated.Value(1.3)).current;
  const logoY = useRef(new Animated.Value(40)).current;
  const logoOpacity = useRef(new Animated.Value(0.2)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  // Sliding pill animation for tab switcher
  const tabSlide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 16,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Form inputs state (Pre-filled for instant static testing)
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
    Animated.spring(tabSlide, {
      toValue: newMode === 'login' ? 0 : 1,
      tension: 28,
      friction: 8,
      useNativeDriver: false,
    }).start();
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Animated SQUI Top Header (Logo animates into top header position) */}
          <Animated.View
            style={[
              styles.headerContainer,
              {
                opacity: logoOpacity,
                transform: [{ translateY: logoY }, { scale: logoScale }],
              },
            ]}
          >
            <View style={styles.mascotBadge}>
              <IconSquiMascot size={56} color={COLORS.primary} />
            </View>
            <Text style={styles.brandTitle}>SQUI</Text>
            <Text style={styles.brandTagline}>Mindful Dietary Journaling & Health</Text>
          </Animated.View>

          {/* Form Content - Directly using Phone Frame Canvas (No Inner Card Box) */}
          <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}>
            {/* ─── Segmented Mode Switcher with Sliding Pill ─── */}
            <View style={styles.tabContainer}>
              {/* Animated sliding pill behind active tab */}
              <Animated.View
                style={[
                  styles.tabSlidingPill,
                  {
                    left: tabSlide.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['2.5%', '50%'],
                    }),
                    width: '48%',
                  },
                ]}
              />
              <TouchableOpacity
                style={styles.tabButton}
                activeOpacity={0.85}
                onPress={() => handleToggleMode('login')}
              >
                <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                  Log In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabButton}
                activeOpacity={0.85}
                onPress={() => handleToggleMode('register')}
              >
                <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            {/* Error Message Box with Shake Animation */}
            {errorMessage ? (
              <Animated.View
                style={[styles.errorContainer, { transform: [{ translateX: shakeAnim }] }]}
              >
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </Animated.View>
            ) : null}

            {/* ─── LOG IN FORM ─── */}
            {mode === 'login' ? (
              <View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Username or Email</Text>
                  <FocusInputWrapper>
                    <Text style={styles.inputIcon}>✉️</Text>
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
                    <Text style={styles.inputIcon}>🔒</Text>
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
                      <Text style={styles.eyeIcon}>{showLoginPassword ? '🙈' : '👁️'}</Text>
                    </TouchableOpacity>
                  </FocusInputWrapper>
                </View>

                {/* Recovery Action Links */}
                <View style={styles.linksRow}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setErrorMessage(null);
                      setForgotUsernameVisible(true);
                    }}
                  >
                    <Text style={styles.linkText}>Forgot Username?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setErrorMessage(null);
                      setForgotPasswordVisible(true);
                    }}
                  >
                    <Text style={styles.linkText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Primary Log In Button */}
                <TouchableOpacity
                  style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                  activeOpacity={0.88}
                  onPress={handleLoginSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Log In to SQUI</Text>
                  )}
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
                    <Text style={styles.googleIconG}>G</Text>
                  </View>
                  <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* ─── REGISTER FORM ─── */
              <View>
                {/* First Name & Last Name */}
                <View style={styles.formRow}>
                  <View style={[styles.fieldGroup, styles.halfField]}>
                    <Text style={styles.label}>First Name</Text>
                    <FocusInputWrapper>
                      <Text style={styles.inputIcon}>👤</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="John"
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
                        placeholder="Doe"
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
                    <Text style={styles.inputIcon}>✉️</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="you@example.com"
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
                    <Text style={styles.inputIcon}>🔒</Text>
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
                      <Text style={styles.eyeIcon}>{showRegisterPassword ? '🙈' : '👁️'}</Text>
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
                    <Text style={styles.inputIcon}>🔒</Text>
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
                      <Text style={styles.eyeIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                    </TouchableOpacity>
                  </FocusInputWrapper>

                  {/* Match indicator */}
                  {confirmPassword.length > 0 && (
                    <Text
                      style={[
                        styles.matchLabel,
                        { color: confirmPassword === registerPassword ? '#2D6A4F' : '#C53030' },
                      ]}
                    >
                      {confirmPassword === registerPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                    </Text>
                  )}
                </View>

                {/* Submit Register Button */}
                <TouchableOpacity
                  style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                  activeOpacity={0.88}
                  onPress={handleRegisterSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Create SQUI Account</Text>
                  )}
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
                    <Text style={styles.googleIconG}>G</Text>
                  </View>
                  <Text style={styles.googleButtonText}>Connect with Google</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* SQUI Mindful Mascot Encouragement Banner */}
            <View style={styles.mascotNote}>
              <View style={styles.mascotIconWrapper}>
                <Text style={{ fontSize: 19 }}>🐿️</Text>
              </View>
              <Text style={styles.mascotNoteText}>
                "Awareness over restriction. Progress over perfection. SQUI is ready to guide your wellness!"
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FORGOT PASSWORD MODAL */}
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
              <TouchableOpacity onPress={closeRecoveryModal}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Enter your registered SQUI email address and we will send you password reset instructions.
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
                    <Text style={styles.inputIcon}>✉️</Text>
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
                  style={[styles.submitButton, recoveryLoading && styles.submitButtonDisabled, { marginBottom: 0 }]}
                  onPress={handleForgotPassSubmit}
                  disabled={recoveryLoading}
                >
                  {recoveryLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Send Reset Link</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* FORGOT USERNAME MODAL */}
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
              <TouchableOpacity onPress={closeRecoveryModal}>
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
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="your.email@example.com"
                      placeholderTextColor={COLORS.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={recoveryEmail}
                      onChangeText={setRecoveryEmail}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.submitButton, recoveryLoading && styles.submitButtonDisabled, { marginBottom: 0 }]}
                  onPress={handleForgotUserSubmit}
                  disabled={recoveryLoading}
                >
                  {recoveryLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Find My Username</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
