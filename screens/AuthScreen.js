import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Path } from 'react-native-svg';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.scrollContent}>
        
        {/* Top Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.iconBoxShadow}>
            <LinearGradient
              colors={['#7C5CFF', '#B56AFF']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.iconBox}
            >
              <Text style={styles.heroIcon}>🎤</Text>
            </LinearGradient>
          </View>

          <Text style={styles.title}>PitchPerfect</Text>
          <Text style={styles.subtitle}>Get objective AI feedback on your vocals.</Text>
        </View>

        {/* Input Form Section */}
        <View style={styles.formContainer}>
          
          <View style={styles.inputWrapper}>
            <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4A4A72" strokeWidth="2" strokeLinecap="round" style={styles.inputIcon}>
              <Rect x="2" y="4" width="20" height="16" rx="2" />
              <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </Svg>
            <TextInput 
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#4A4A72"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4A4A72" strokeWidth="2" strokeLinecap="round" style={styles.inputIcon}>
              <Rect x="3" y="11" width="18" height="11" rx="2" />
              <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </Svg>
            <TextInput 
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#4A4A72"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

        </View>

        {/* CTAs Section */}
        <View style={styles.ctaContainer}>
          
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => navigation.replace('TrackSelect')}
            style={styles.primaryButtonShadow}
          >
            <LinearGradient
              colors={['#7C5CFF', '#9A72FF']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Sign Up / Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.googleButton}
            onPress={() => navigation.replace('TrackSelect')}
          >
            <Svg width="16" height="16" viewBox="0 0 24 24" style={styles.googleIcon}>
              <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </Svg>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080812', 
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBoxShadow: {
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: '#F0EEFF',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7A7A9E',
    textAlign: 'center',
    maxWidth: 210,
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: 7, 
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12122A',
    borderWidth: 1.5,
    borderColor: '#2A2A48',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 11,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  ctaContainer: {
    paddingBottom: 10,
  },
  primaryButtonShadow: {
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 11,
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1E1E3A',
  },
  dividerText: {
    color: '#3E3E60',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#2A2A48',
    borderRadius: 14,
    paddingVertical: 13,
    backgroundColor: 'transparent',
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    color: '#C8C8E8',
    fontSize: 15,
    fontWeight: '600',
  },
});