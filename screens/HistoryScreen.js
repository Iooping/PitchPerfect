import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';

const historyData = [
  { id: 1, title: "Amazing Grace", date: "Today", score: 85, colorHue: "#4ADE80" },
  { id: 2, title: "Ave Maria", date: "Yesterday", score: 92, colorHue: "#7C5CFF" },
  { id: 3, title: "Danny Boy", date: "Oct 24", score: 78, colorHue: "#FF6B6B" },
];

export default function HistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.preTitle}>Your Performances</Text>
        <Text style={styles.mainTitle}>History</Text>
      </View>

      {/* History List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 20 }}>
        {historyData.map((item) => (
          <TouchableOpacity activeOpacity={0.8} key={item.id} style={styles.cardContainer}>
            <View style={[styles.albumArtBorder, { borderColor: `${item.colorHue}44` }]}>
              <LinearGradient colors={[`${item.colorHue}33`, `${item.colorHue}66`]} style={styles.albumArt}>
                <Text style={{ fontSize: 20 }}>🎵</Text>
              </LinearGradient>
            </View>
            <View style={styles.songInfo}>
              <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.date}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{item.score}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity activeOpacity={0.8} style={styles.navItem} onPress={() => navigation.replace('TrackSelect')}>
          <View style={styles.navIcon}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="#3A3A5E">
              <Path d="M3 9.5L12 2L21 9.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
            </Svg>
          </View>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        {/* Active Tab */}
        <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
          <View style={styles.navIconActive}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round">
              <Path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
              <Polyline points="12 6 12 12 16 14" />
            </Svg>
          </View>
          <Text style={styles.navTextActive}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.navItem} onPress={() => navigation.replace('Profile')}>
          <View style={styles.navIcon}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A3A5E" strokeWidth="2" strokeLinecap="round">
              <Circle cx="12" cy="8" r="4" />
              <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </Svg>
          </View>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080812' },
  header: { paddingTop: 60, paddingHorizontal: 22, paddingBottom: 20 },
  preTitle: { fontSize: 11, fontWeight: '600', color: '#7C5CFF', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  mainTitle: { fontSize: 22, fontWeight: '800', color: '#F0EEFF', letterSpacing: -0.5 },
  scrollArea: { flex: 1, paddingHorizontal: 22 },
  cardContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#12122A', borderWidth: 1.5, borderColor: '#1E1E3A', borderRadius: 14, padding: 12, marginBottom: 10 },
  albumArtBorder: { borderWidth: 1.5, borderRadius: 10, overflow: 'hidden', marginRight: 12 },
  albumArt: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  songInfo: { flex: 1 },
  songTitle: { fontSize: 14, fontWeight: '700', color: '#F0EEFF', marginBottom: 3 },
  songArtist: { fontSize: 12, color: '#5A5A7E' },
  scoreContainer: { alignItems: 'flex-end' },
  scoreText: { fontSize: 18, fontWeight: '800', color: '#B56AFF' },
  scoreMax: { fontSize: 10, color: '#4A4A72' },
  bottomNav: { height: 80, backgroundColor: '#0E0E22', borderTopWidth: 1, borderTopColor: '#1A1A34', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 30, paddingBottom: 20 },
  navItem: { alignItems: 'center' },
  navIconActive: { width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(124, 92, 255, 0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  navIcon: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  navTextActive: { fontSize: 9, color: '#7C5CFF', fontWeight: '700' },
  navText: { fontSize: 9, color: '#3A3A5E' },
});