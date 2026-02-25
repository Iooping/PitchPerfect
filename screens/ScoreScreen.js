import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Path, Line } from 'react-native-svg';

// Replicating your exact Figma math logic to draw the perfect curve
const PitchChart = () => {
  const width = 231;
  const height = 80;
  const midY = height / 2;
  const targetY = midY - 6;

  // Your exact coordinates from Screen5Score.tsx
  const yourPitchPoints = [
    [0, targetY + 2], [25, targetY - 8], [50, targetY + 4],
    [75, targetY - 6], [100, targetY + 3], [125, targetY + 14],
    [150, targetY + 22], [165, targetY + 18], [185, targetY + 12],
    [210, targetY + 8], [231, targetY + 5],
  ];

  // Your exact smoothing function
  const smoothPath = (points) => {
    if (points.length < 2) return "";
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpX = (prev[0] + curr[0]) / 2;
      d += ` C ${cpX} ${prev[1]}, ${cpX} ${curr[1]}, ${curr[0]} ${curr[1]}`;
    }
    return d;
  };

  const linePath = smoothPath(yourPitchPoints);
  const fillPath = `${linePath} L ${width} ${height + 10} L 0 ${height + 10} Z`;

  return (
    <View style={styles.chartCard}>
      <Text style={styles.cardHeader}>PITCH ACCURACY</Text>
      
      {/* Centering the SVG and locking dimensions prevents distortion */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <SvgGradient id="pitchGradient" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0%" stopColor="#7C5CFF" />
              <Stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
            </SvgGradient>
            <SvgGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
              <Stop offset="0%" stopColor="#7C5CFF" />
              <Stop offset="55%" stopColor="#9A72FF" />
              <Stop offset="100%" stopColor="#FF6B6B" />
            </SvgGradient>
          </Defs>

          <Line x1={0} y1={targetY} x2={width} y2={targetY} stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="5, 4" opacity={0.8} />
          <Path d={fillPath} fill="url(#pitchGradient)" opacity={0.15} />
          <Path d={linePath} fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDash, { borderColor: '#4ADE80', marginRight: 6 }]} />
          <Text style={styles.legendText}>Target Pitch</Text>
        </View>
        <View style={[styles.legendItem, { marginLeft: 14 }]}>
          <LinearGradient colors={['#7C5CFF', '#FF6B6B']} start={{x:0,y:0}} end={{x:1,y:0}} style={[styles.legendSolid, { marginRight: 6 }]} />
          <Text style={styles.legendText}>Your Pitch</Text>
        </View>
      </View>
    </View>
  );
};

export default function ScoreScreen({ route, navigation }) {
  // Grab the real score from Python (or default to 85 if we are just testing UI)
  const finalScore = route.params?.score ?? 85;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Score Hero Section */}
      <LinearGradient colors={['#0E0824', '#080812']} style={styles.heroSection}>
        <View style={styles.starsContainer}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.star}>⭐</Text>
          <Text style={[styles.star, { opacity: 0.3 }]}>⭐</Text>
        </View>
        
        <View style={styles.scoreRow}>
          <Text style={styles.bigScore}>{finalScore}</Text>
          <Text style={styles.scoreMax}>/100</Text>
        </View>

        <Text style={styles.heroSubtitle}>Great Pitch! 🎉</Text>
        <Text style={styles.heroDesc}>Top 18% of singers this week</Text>
      </LinearGradient>

      <View style={styles.contentPadding}>
        
        {/* Render the dynamically generated Pitch Chart */}
        <View style={{ marginBottom: 10 }}>
          <PitchChart />
        </View>

        {/* Score Breakdown Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#4ADE80' }]}>88</Text>
            <Text style={styles.statLabel}>Pitch</Text>
          </View>
          <View style={[styles.statBox, { marginHorizontal: 8 }]}>
            <Text style={[styles.statValue, { color: '#7C5CFF' }]}>82</Text>
            <Text style={styles.statLabel}>Rhythm</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#FB923C' }]}>79</Text>
            <Text style={styles.statLabel}>Tone</Text>
          </View>
        </View>

        {/* AI Feedback Card */}
        <View style={styles.feedbackCard}>
          <Text style={styles.cardHeader}>AI FEEDBACK</Text>
          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackIcon}>✅</Text>
            <Text style={styles.feedbackText}>Solid rhythm on the chorus — great tempo control.</Text>
          </View>
          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackIcon}>⚠️</Text>
            <Text style={styles.feedbackText}>Pitch drifted flat in the second verse.</Text>
          </View>
          <View style={[styles.feedbackRow, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}>
            <Text style={styles.feedbackIcon}>💡</Text>
            <Text style={styles.feedbackText}>Support from the diaphragm on long notes.</Text>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.primaryButtonShadow}>
            <LinearGradient colors={['#7C5CFF', '#9A72FF']} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Share Result</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace('Auth')} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080812',
  },
  heroSection: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    fontSize: 12,
    marginHorizontal: 1.5,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  bigScore: {
    fontSize: 64,
    fontWeight: '900',
    color: '#B56AFF',
    lineHeight: 70,
    letterSpacing: -3,
  },
  scoreMax: {
    fontSize: 28,
    color: '#7C5CFF',
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7C5CFF',
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 11,
    color: '#4A4A72',
  },
  contentPadding: {
    paddingHorizontal: 22,
  },
  chartCard: {
    backgroundColor: '#0E0E24',
    borderWidth: 1.5,
    borderColor: '#1E1E3C',
    borderRadius: 14,
    padding: 14,
  },
  cardHeader: {
    fontSize: 11,
    color: '#4A4A72',
    fontWeight: '700',
    letterSpacing: 1,
  },
  legendRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDash: {
    width: 16,
    height: 0,
    borderTopWidth: 1.5,
    borderStyle: 'dashed',
  },
  legendSolid: {
    width: 16,
    height: 3,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 10,
    color: '#4A4A70',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#0E0E24',
    borderWidth: 1.5,
    borderColor: '#1E1E3C',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
    color: '#4A4A72',
    marginTop: 2,
  },
  feedbackCard: {
    backgroundColor: '#0E0E24',
    borderWidth: 1.5,
    borderColor: '#1E1E3C',
    borderRadius: 14,
    padding: 14,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 9,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A34',
  },
  feedbackIcon: {
    fontSize: 14,
    marginRight: 9,
  },
  feedbackText: {
    flex: 1,
    fontSize: 12,
    color: '#B0ADCC',
    lineHeight: 18,
  },
  ctaContainer: {
    marginTop: 10,
  },
  primaryButtonShadow: {
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 12,
  },
  primaryButton: {
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#5A5A8A',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  }
});