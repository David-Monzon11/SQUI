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
import { IconSquiAcornBackground } from '../../components/common/Icons';
import { authStyles as styles } from './AuthScreen.styles';
import { COLORS } from '../../constants/colors';

type AuthMode = 'login' | 'register';

export const AuthScreen: React.FC = () => {
  const { login, register, loginWithGoogle, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');

  // Entrance Animation for Header Logo (Animates from Splash Position to Header)
  const logoScale = useRef(new Animated.Value(1.3)).current;
  const logoY = useRef(new Animated.Value(40)).current;
  const logoOpacity = useRef(new Animated.Value(0.2)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

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

  // Form inputs state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setErrorMessage('Please enter your username or email address.');
      return;
    }
    if (!loginPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const result = await login(loginIdentifier, loginPassword);
    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
  };

  const handleRegisterSubmit = async () => {
    setErrorMessage(null);
    if (!firstName.trim()) {
      setErrorMessage('First name is required.');
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage('Last name is required.');
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!registerPassword) {
      setErrorMessage('Password is required.');
      return;
    }
    if (registerPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (registerPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please check your confirm password.');
      return;
    }

    const result = await register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: registerEmail.trim(),
      password: registerPassword,
    });

    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
  };

  const handleGoogleSubmit = async () => {
    setErrorMessage(null);
    const result = await loginWithGoogle();
    if (!result.success && result.error) {
      setErrorMessage(result.error);
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
              <IconSquiAcornBackground size={52} color={COLORS.primary} />
            </View>
            <Text style={styles.brandTitle}>SQUI</Text>
            <Text style={styles.brandTagline}>Mindful Dietary Journaling & Health</Text>
          </Animated.View>

          {/* Form Content - Directly using Phone Frame Canvas (No Inner Card Box) */}
          <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}>
            {/* Segmented Mode Switcher (Log In vs Register) */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, mode === 'login' && styles.tabButtonActive]}
                activeOpacity={0.85}
                onPress={() => handleToggleMode('login')}
              >
                <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                  Log In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, mode === 'register' && styles.tabButtonActive]}
                activeOpacity={0.85}
                onPress={() => handleToggleMode('register')}
              >
                <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>
                  Register in SQUI
                </Text>
              </TouchableOpacity>
            </View>

            {/* Error Message Box */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* LOG IN FORM */}
            {mode === 'login' ? (
              <View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Username or Email</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your username or email"
                      placeholderTextColor={COLORS.textMuted}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={loginIdentifier}
                      onChangeText={setLoginIdentifier}
                    />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
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
                    >
                      <Text style={styles.eyeText}>{showLoginPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                  </View>
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
                    <Text style={styles.submitButtonText}>Log In</Text>
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
                    <Text style={styles.googleIconText}>G</Text>
                  </View>
                  <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* REGISTER FORM */
              <View>
                {/* First Name & Last Name */}
                <View style={styles.formRow}>
                  <View style={[styles.fieldGroup, styles.halfField]}>
                    <Text style={styles.label}>First Name</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="John"
                        placeholderTextColor={COLORS.textMuted}
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>
                  </View>

                  <View style={[styles.fieldGroup, styles.halfField]}>
                    <Text style={styles.label}>Last Name</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Doe"
                        placeholderTextColor={COLORS.textMuted}
                        value={lastName}
                        onChangeText={setLastName}
                      />
                    </View>
                  </View>
                </View>

                {/* Email / Username */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
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
                  </View>
                </View>

                {/* Password */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
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
                    >
                      <Text style={styles.eyeText}>{showRegisterPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputWrapper}>
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
                    >
                      <Text style={styles.eyeText}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                  </View>
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
                    <Text style={styles.googleIconText}>G</Text>
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
