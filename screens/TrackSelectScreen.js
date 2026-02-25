import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';

const songs = [
  { id: 1, title: "Ave Maria", artist: "Traditional / Public Domain", key: "D Major", difficulty: "Intermediate", duration: "3:42", colorHue: "#7C5CFF" },
  { id: 2, title: "Danny Boy", artist: "Traditional / Public Domain", key: "G Major", difficulty: "Beginner", duration: "2:58", colorHue: "#FF6B6B" },
  { id: 3, title: "Amazing Grace", artist: "Traditional / Public Domain", key: "F Major", difficulty: "Beginner", duration: "3:15", colorHue: "#4ADE80" },
];

function SongCard({ song, onSelect }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onSelect} style={styles.cardContainer}>
      {/* Album Art Placeholder */}
      <View style={[styles.albumArtBorder, { borderColor: `${song.colorHue}44` }]}>
        <LinearGradient
          colors={[`${song.colorHue}33`, `${song.colorHue}66`]}
          style={styles.albumArt}
        >
          <Text style={{ fontSize: 20 }}>🎵</Text>
        </LinearGradient>
      </View>

      {/* Song Info */}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
        
        <View style={styles.badgesRow}>
          <View style={[styles.difficultyBadge, { backgroundColor: `${song.colorHue}22`, borderColor: `${song.colorHue}33` }]}>
            <Text style={[styles.difficultyText, { color: song.colorHue }]}>{song.difficulty}</Text>
          </View>
          <Text style={styles.durationText}>{song.duration}</Text>
        </View>
      </View>

      {/* Play Button */}
      <View style={styles.playButtonShadow}>
        <LinearGradient colors={['#7C5CFF', '#9A72FF']} style={styles.playButton}>
          <Svg width="12" height="14" viewBox="0 0 12 14" fill="white">
            <Path d="M1 1L11 7L1 13V1Z" />
          </Svg>
        </LinearGradient>
      </View>

    </TouchableOpacity>
  );
}

export default function TrackSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.preTitle}>Ready to sing?</Text>
        <Text style={styles.mainTitle}>Choose a Track</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A3A5E" strokeWidth="2.5" strokeLinecap="round">
              <Circle cx="11" cy="11" r="8" />
              <Path d="m21 21-4.35-4.35" />
            </Svg>
          </View>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search songs..."
            placeholderTextColor="#3A3A5E"
          />
        </View>
      </View>

      {/* Song List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 20 }}>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onSelect={() => navigation.navigate('Record')} />
        ))}
        
        <View style={styles.comingSoon}>
          <View style={styles.comingSoonIcon}>
            <Svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3A3A60" strokeWidth="2" strokeLinecap="round">
              <Circle cx="12" cy="12" r="10" />
              <Path d="M12 8v4m0 4h.01" />
            </Svg>
          </View>
          <Text style={styles.comingSoonText}>More songs coming soon</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        
        {/* Home (Active) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.navItem}
          onPress={() => navigation.replace('TrackSelect')}
        >
          <View style={styles.navIconActive}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="#7C5CFF">
              <Path d="M3 9.5L12 2L21 9.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
            </Svg>
          </View>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.navItem}
          onPress={() => navigation.replace('History')}
        >
          <View style={styles.navIcon}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A3A5E" strokeWidth="2" strokeLinecap="round">
              <Path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
              <Polyline points="12 6 12 12 16 14" />
            </Svg>
          </View>
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.navItem}
          onPress={() => navigation.replace('Profile')}
        >
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
  container: {
    flex: 1,
    backgroundColor: '#080812',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  preTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7C5CFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F0EEFF',
    letterSpacing: -0.5,
  },
  searchContainer: {
    paddingHorizontal: 22,
    paddingBottom: 14,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12122A',
    borderWidth: 1.5,
    borderColor: '#1E1E3A',
    borderRadius: 12,
    paddingHorizontal: 13,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 22,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12122A',
    borderWidth: 1.5,
    borderColor: '#1E1E3A',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  albumArtBorder: {
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  albumArt: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F0EEFF',
    marginBottom: 3,
  },
  songArtist: {
    fontSize: 12,
    color: '#5A5A7E',
    marginBottom: 5,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 6,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  durationText: {
    fontSize: 10,
    color: '#3E3E60',
  },
  playButtonShadow: {
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 10,
  },
  comingSoonIcon: {
    marginRight: 5,
  },
  comingSoonText: {
    color: '#3A3A60',
    fontSize: 12,
  },
  bottomNav: {
    height: 80,
    backgroundColor: '#0E0E22',
    borderTopWidth: 1,
    borderTopColor: '#1A1A34',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navIconActive: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(124, 92, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  navIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  navTextActive: {
    fontSize: 9,
    color: '#7C5CFF',
    fontWeight: '700',
  },
  navText: {
    fontSize: 9,
    color: '#3A3A5E',
  },
});