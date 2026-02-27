import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Backend URL for your local AI scoring server
const ANALYZE_API_URL = 'http://192.168.68.117:8000/analyze';

const processingMessages = [
  "Analyzing pitch stability...",
  "Detecting key & scale...",
  "Measuring breath support...",
  "Comparing to reference track...",
  "Calculating your score...",
];

export default function ProcessingScreen({ route, navigation }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Extract the audio file path passed from RecordScreen
  const { audioUri } = route.params || {};

  // Animation values
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0.8)).current;

  // 1. Cycle through the text messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % processingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // 2. The Real Network Request to your Python Backend
  useEffect(() => {
    const analyzeAudio = async () => {
      if (!audioUri) {
        // Fallback if testing on an emulator without a real mic
        setTimeout(() => navigation.replace('Score', { score: 85 }), 3000);
        return;
      }

      try {
        // Package the audio file
        const formData = new FormData();
        formData.append('audio', {
          uri: audioUri,
          name: 'pitch_recording.m4a',
          type: 'audio/m4a',
        });

        // Fake progress bar filling up while waiting for the network
        const progressInterval = setInterval(() => {
          setProgress(p => (p < 90 ? p + 15 : 90));
        }, 500);

        // SEND TO PYTHON API
        const response = await fetch(ANALYZE_API_URL, {
          method: 'POST',
          body: formData,
        });

        const rawText = await response.text();
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (e) {
          throw new Error(`Non-JSON response (${response.status}): ${rawText.slice(0, 200)}`);
        }

        if (!response.ok) {
          throw new Error(data?.detail ? String(data.detail) : `HTTP ${response.status}`);
        }
        clearInterval(progressInterval);
        setProgress(100);

        // Wait a split second so the user sees "100%", then pass the dynamic score
        // and the detailed judge-style breakdown from the backend.
        setTimeout(() => {
          navigation.replace('Score', {
            score: data.score,
            pitch_score: data.pitch_score,
            rhythm_score: data.rhythm_score,
            tone_score: data.tone_score,
            feedback: data.feedback,
          });
        }, 600);

      } catch (error) {
        console.error("API Error:", error);
        alert("Failed to reach Python server. Ensure your IP is correct and server is running.");
        // Fallback if the server is offline so the app doesn't freeze
        navigation.replace('Score', { score: 0 }); 
      }
    };

    analyzeAudio();
  }, [audioUri, navigation]);

  // 3. Start the Spinner and Pulse animations
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseValue, { toValue: 0.5, duration: 700, useNativeDriver: true })
      ])
    ).start();
  }, [spinValue, pulseValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Your exact math to generate the waveform bars
  const waveformBars = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    height: 8 + Math.sin(i * 0.7) * 12 + Math.sin(i * 1.3) * 8 + 10,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>AI ANALYSIS</Text>

      {/* Waveform Graphic */}
      <View style={styles.waveformContainer}>
        <View style={styles.waveformGlow} />
        <View style={styles.barsRow}>
          {waveformBars.map((bar) => (
            <Animated.View key={bar.id} style={{ opacity: pulseValue, marginHorizontal: 1.5 }}>
              <LinearGradient
                colors={['#9A72FF', '#7C5CFF']}
                style={[styles.waveBar, { height: bar.height }]}
              />
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Animated Spinner */}
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />

      {/* Dynamic Text Messages */}
      <View style={styles.textContainer}>
        <Text style={styles.dynamicMessage}>{processingMessages[msgIndex]}</Text>
        <Text style={styles.subtext}>
          {progress >= 100 ? "Done! Loading results..." : "Your score will be ready in seconds"}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Processing</Text>
          <Text style={styles.progressPercent}>{Math.min(100, Math.round(progress))}%</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <LinearGradient
            colors={['#7C5CFF', '#B56AFF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.progressBarFill, { width: `${Math.min(100, progress)}%` }]}
          />
        </View>
      </View>

      {/* Step Indicator Dots */}
      <View style={styles.dotsContainer}>
        {processingMessages.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === msgIndex ? styles.dotActive : null,
              i < msgIndex ? styles.dotCompleted : null
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080812',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  headerText: {
    fontSize: 11,
    color: '#7C5CFF',
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 32,
  },
  waveformContainer: {
    width: 200,
    height: 100,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformGlow: {
    position: 'absolute',
    width: 160,
    height: 60,
    borderRadius: 80,
    backgroundColor: 'rgba(124,92,255,0.18)',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  waveBar: {
    width: 4,
    borderRadius: 3,
  },
  spinner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#1A1A38',
    borderTopColor: '#7C5CFF',
    borderRightColor: '#9A72FF',
    marginBottom: 28,
  },
  textContainer: {
    minHeight: 44,
    alignItems: 'center',
  },
  dynamicMessage: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E0DCFF',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  subtext: {
    fontSize: 12,
    color: '#3E3E62',
  },
  progressContainer: {
    width: '100%',
    maxWidth: 220,
    marginTop: 28,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
    color: '#3E3E62',
  },
  progressPercent: {
    fontSize: 11,
    color: '#7C5CFF',
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 5,
    backgroundColor: '#12122A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  dotsContainer: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A1A38',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20,
    backgroundColor: '#7C5CFF',
  },
  dotCompleted: {
    backgroundColor: '#7C5CFF',
  }
});