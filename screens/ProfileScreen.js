import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <LinearGradient colors={['#7C5CFF', '#B56AFF']} style={styles.avatar}>
          <Text style={styles.avatarText}>JC</Text>
        </LinearGradient>
        <Text style={styles.name}>Joshua Cordova</Text>
        <Text style={styles.email}>Vocalist Level: Intermediate</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>85</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
        <View style={[styles.statBox, { marginHorizontal: 10 }]}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Recordings</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>2h</Text>
          <Text style={styles.statLabel}>Time Sung</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Account Settings</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Microphone Calibration</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => navigation.replace('Auth')}>
          <Text style={[styles.menuText, { color: '#FF6B6B' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />

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

        <TouchableOpacity activeOpacity={0.8} style={styles.navItem} onPress={() => navigation.replace('History')}>
          <View style={styles.navIcon}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A3A5E" strokeWidth="2" strokeLinecap="round">
              <Path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
              <Polyline points="12 6 12 12 16 14" />
            </Svg>
          </View>
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>

        {/* Active Tab */}
        <TouchableOpacity activeOpacity={0.8} style={styles.navItem}>
          <View style={styles.navIconActive}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round">
              <Circle cx="12" cy="8" r="4" />
              <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </Svg>
          </View>
          <Text style={styles.navTextActive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080812' },
  header: { alignItems: 'center', paddingTop: 80, paddingBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  name: { fontSize: 22, fontWeight: '800', color: '#F0EEFF', marginBottom: 4 },
  email: { fontSize: 13, color: '#7A7A9E' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 22, marginBottom: 30 },
  statBox: { flex: 1, backgroundColor: '#12122A', borderWidth: 1.5, borderColor: '#1E1E3A', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#F0EEFF', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#5A5A7E' },
  menuContainer: { marginHorizontal: 22, backgroundColor: '#12122A', borderWidth: 1.5, borderColor: '#1E1E3A', borderRadius: 14, paddingHorizontal: 16 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#1A1A34' },
  menuText: { fontSize: 14, color: '#F0EEFF', fontWeight: '500' },
  menuArrow: { fontSize: 16, color: '#5A5A7E' },
  bottomNav: { height: 80, backgroundColor: '#0E0E22', borderTopWidth: 1, borderTopColor: '#1A1A34', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 30, paddingBottom: 20 },
  navItem: { alignItems: 'center' },
  navIconActive: { width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(124, 92, 255, 0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  navIcon: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  navTextActive: { fontSize: 9, color: '#7C5CFF', fontWeight: '700' },
  navText: { fontSize: 9, color: '#3A3A5E' },
});