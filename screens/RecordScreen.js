import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, Line } from 'react-native-svg';

export default function RecordScreen({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const [timer, setTimer] = useState(0);
  
  const [modalDismissed, setModalDismissed] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
      pulseAnim.stopAnimation();
    }
  }, [isRecording]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  async function requestPermissionAndCloseModal() {
    const permission = await Audio.requestPermissionsAsync();
    setModalDismissed(true);
    if (permission.status !== 'granted') {
      alert('We need mic access to hear your pitch and give you accurate feedback.');
    }
  }

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setIsRecording(true);
      setAudioUri(null);
      setTimer(0);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      setAudioUri(recording.getURI());
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  const ambientBars = [5, 10, 18, 12, 20, 15, 22, 14, 19, 11, 16, 9];

  return (
    <View style={styles.container}>
      
      {!modalDismissed && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎤</Text>
            <Text style={styles.modalTitle}>Mic Access Needed</Text>
            <Text style={styles.modalText}>
              We need mic access to hear your pitch and give you accurate feedback.
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={requestPermissionAndCloseModal}>
              <LinearGradient colors={['#7C5CFF', '#9A72FF']} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Allow Access</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalDismissed(true)}>
              <Text style={styles.modalCancel}>Not now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2.5" strokeLinecap="round">
            <Path d="M15 18l-6-6 6-6" />
          </Svg>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.songTitle}>Amazing Grace</Text>
          <Text style={styles.songSubtitle}>Traditional / Public Domain</Text>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <View style={[styles.indicatorContainer, { opacity: isRecording ? 1 : 0.3 }]}>
        <Animated.View style={[styles.redDot, isRecording && { transform: [{ scale: pulseAnim }] }]} />
        <Text style={styles.recordingText}>RECORDING</Text>
      </View>

      <View style={styles.timecodeContainer}>
        <Text style={styles.timecodeMain}>{formatTime(timer)}</Text>
        <Text style={styles.timecodeTotal}>/ 01:30</Text>
      </View>

      <View style={styles.centerStage}>
        <Animated.View style={[styles.ringOuter, isRecording && { transform: [{ scale: pulseAnim }] }]} />
        <Animated.View style={[styles.ringMiddle, isRecording && { transform: [{ scale: pulseAnim }] }]} />
        <View style={styles.ringInner} />

        <TouchableOpacity activeOpacity={0.8} onPress={isRecording ? stopRecording : startRecording} style={styles.orbWrapper}>
          <LinearGradient
            colors={isRecording ? ['#FF6B6B', '#FF453A'] : ['#7C5CFF', '#B56AFF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={[styles.orbButton, isRecording && styles.orbRecordingShadow]}
          >
            {isRecording ? (
              <View style={styles.stopSquare} />
            ) : (
              <Svg width="30" height="36" viewBox="0 0 24 30" fill="white">
                <Rect x="7" y="0" width="10" height="18" rx="5" />
                <Path d="M3 13c0 5 3.6 9 9 9s9-4 9-9" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" />
                <Line x1="12" y1="22" x2="12" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="27" x2="16" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </Svg>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.ambientBarsContainer}>
          {ambientBars.map((height, i) => (
            <Animated.View 
              key={i} 
              style={[
                styles.ambientBar, 
                { height, backgroundColor: `rgba(124,92,255,${0.3 + (i % 3) * 0.15})` },
                isRecording && { transform: [{ scaleY: pulseAnim }] }
              ]} 
            />
          ))}
        </View>

      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.submitButtonShadow}
          onPress={() => {
            if (audioUri) {
              navigation.replace('Processing', { audioUri: audioUri });
            } else {
              alert('Please record something first!');
            }
          }}
        >
          <LinearGradient 
            colors={audioUri ? ['#7C5CFF', '#9A72FF'] : ['#1E1E30', '#1E1E30']} 
            style={styles.submitButton}
          >
            <View style={[styles.submitIcon, { backgroundColor: audioUri ? 'rgba(255,255,255,0.9)' : '#4A4A70' }]} />
            <Text style={[styles.submitText, { color: audioUri ? '#FFFFFF' : '#7A7A9E' }]}>
              {audioUri ? "Analyze Performance" : "Finish Recording"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080812',
    paddingTop: 60,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,4,16,0.85)',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#14142E',
    borderWidth: 1.5,
    borderColor: '#2A2A4A',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    elevation: 20,
  },
  modalEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F0EEFF',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  modalText: {
    fontSize: 13,
    color: '#7A7A9E',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  modalCancel: {
    fontSize: 12,
    color: '#3A3A5E',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 6,
  },
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#12122A',
    borderWidth: 1,
    borderColor: '#2A2A44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F0EEFF',
  },
  songSubtitle: {
    fontSize: 10,
    color: '#4A4A70',
    marginTop: 2,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  redDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF4444',
    marginRight: 6,
  },
  recordingText: {
    fontSize: 11,
    color: '#FF4444',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  timecodeContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  timecodeMain: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F0EEFF',
    letterSpacing: 1,
  },
  timecodeTotal: {
    fontSize: 12,
    color: '#3A3A5E',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  centerStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  ringOuter: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1.5,
    borderColor: 'rgba(124, 92, 255, 0.12)',
  },
  ringMiddle: {
    position: 'absolute',
    width: 155,
    height: 155,
    borderRadius: 77.5,
    borderWidth: 1.5,
    borderColor: 'rgba(124, 92, 255, 0.22)',
  },
  ringInner: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(124, 92, 255, 0.40)',
  },
  orbWrapper: {
    zIndex: 5,
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 10,
  },
  orbRecordingShadow: {
    shadowColor: '#FF453A',
  },
  orbButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: 'rgba(124, 92, 255, 0.15)',
  },
  stopSquare: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  ambientBarsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  ambientBar: {
    width: 3,
    borderRadius: 2,
    marginHorizontal: 1.5,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  submitButtonShadow: {
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 6,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 50,
  },
  submitIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  submitText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  }
});