import { StatusBar } from 'expo-status-bar';
import { useRef, useState, useSyncExternalStore } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions, type ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Action } from '@/components/Action';
import { Icon } from '@/components/Icon';
import { PreviewDialog, type DialogContent } from '@/components/PreviewDialog';
import { colors, layout } from '@/constants/theme';
import {
  campus, information, member, navigation, previewMessages, services,
  type CampusInformation, type CampusService, type NavigationId,
} from '@/data/home';

const campusLogo = require('../../assets/images/logo-kampus.png');
const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

function Header({ onNotifications }: { onNotifications: () => void }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 24, paddingLeft: layout.gutter + insets.left, paddingRight: layout.gutter + insets.right }]}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none" accessible={false}>
        <Svg width="100%" height="100%" viewBox="0 0 430 250" preserveAspectRatio="none">
          <Path d="M250 0H430V250H160C280 185 220 130 330 80 375 60 360 15 250 0Z" fill={colors.primaryLight} />
          <Path d="M430 65V250H90C190 200 270 205 310 145 340 100 375 85 430 65Z" fill={colors.wave} opacity={0.5} />
        </Svg>
      </View>
      <View style={styles.brandRow}>
        <View style={styles.logoPlate}>
          <Image source={campusLogo} style={styles.logo} resizeMode="contain" accessibilityLabel="Logo Politeknik Semen Indonesia" />
        </View>
        <View style={styles.brandDivider} />
        <View style={styles.brandText}>
          <Text style={[styles.appName, width < 380 && styles.appNameCompact]}>{campus.appName}</Text>
          <Text style={styles.campusName}>{campus.name}</Text>
        </View>
        <Action onPress={onNotifications} accessibilityLabel="Notifikasi, belum tersedia" style={styles.bell} focusColor={colors.surface}>
          <Icon name="bell" color={colors.surface} size={27} />
        </Action>
      </View>
      <View style={styles.greeting}>
        <Text accessibilityRole="header" style={styles.welcome}>Selamat datang, <Text style={styles.memberName}>{member.name}</Text></Text>
        <Text style={styles.identity}>{member.identity} · {member.program}</Text>
      </View>
      <View style={styles.headerWave} pointerEvents="none" accessible={false}>
        <Svg width="100%" height="100%" viewBox="0 0 430 30" preserveAspectRatio="none">
          <Path d="M0 26C35-5 90 9 155 16S350 30 430 5V30H0Z" fill={colors.background} />
        </Svg>
      </View>
    </View>
  );
}

function SectionHeading({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <View style={styles.sectionHeading}>
      <View style={styles.headingTitle}>
        <View style={styles.headingMarker} />
        <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function ServiceCard({ service, onPress, wide }: { service: CampusService; onPress: () => void; wide: boolean }) {
  const { width } = useWindowDimensions();
  return (
    <Action onPress={onPress} accessibilityLabel={service.name + ', ' + service.description + ', Belum tersedia'}
      accessibilityHint="Membuka penjelasan modul" style={[styles.serviceCard, wide && styles.serviceCardWide]}>
      <View style={styles.serviceTop}>
        <Icon name={service.icon} size={width < 420 ? 30 : 38} />
        <View style={styles.serviceText}>
          <Text style={[styles.serviceName, width < 380 && styles.serviceNameCompact]}>{service.name}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>
        <Icon name="chevron" color={colors.muted} size={14} />
      </View>
      <View style={styles.serviceStatus}><Text style={styles.statusText}>Belum tersedia</Text></View>
    </Action>
  );
}

function InformationCard({ item, onPress }: { item: CampusInformation; onPress: () => void }) {
  const { width, fontScale } = useWindowDimensions();
  const compact = width < 360 || fontScale > 1.25;
  return (
    <Action onPress={onPress} style={styles.informationCard} accessibilityLabel={'Buka ' + item.title} accessibilityHint="Membuka detail contoh informasi">
      <View style={[styles.informationIcon, compact && styles.informationIconCompact]}><Icon name={item.icon} size={compact ? 25 : 35} /></View>
      <View style={styles.informationText}>
        <View style={styles.categoryBadge}><Text style={styles.category}>{item.category}</Text></View>
        <Text style={styles.informationTitle}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
        <View style={styles.dateRow}><Icon name="calendar" size={14} color={colors.muted} /><Text style={styles.date}>{item.dateLabel}</Text></View>
      </View>
      <Icon name="chevron" color={colors.muted} size={16} />
    </Action>
  );
}

function BottomNavigation({ onSelect }: { onSelect: (id: NavigationId) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.navigation, { paddingBottom: Math.max(insets.bottom, 8), paddingLeft: insets.left + 8, paddingRight: insets.right + 8 }]}>
      {navigation.map((item) => {
        const active = item.id === 'home';
        return (
          <Action key={item.id} onPress={() => onSelect(item.id)} accessibilityRole="tab" accessibilityState={{ selected: active }}
            accessibilityLabel={item.label + (active ? '' : ', belum tersedia pada pratinjau ini')} style={styles.navigationItem}>
            <Icon name={item.icon} size={25} color={active ? colors.primary : colors.muted} />
            <Text style={[styles.navigationLabel, active && styles.navigationLabelActive]}>{item.label}</Text>
            {active && <View style={styles.activeIndicator} />}
          </Action>
        );
      })}
    </View>
  );
}

export default function HomeScreen() {
  // Snapshot server menjaga kontrol web tetap menunggu hidrasi; native langsung siap.
  const ready = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const insets = useSafeAreaInsets();
  const { width, fontScale } = useWindowDimensions();
  const singleColumn = width < 340 || fontScale > 1.25;

  function openMenu(id: NavigationId) {
    if (id === 'home') {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }
    setDialog({ kind: 'message', ...previewMessages[id] });
  }

  if (!ready) {
    return <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={styles.empty}>Memuat Beranda...</Text></View>;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.app} testID="home-app">
        <ScrollView ref={scrollRef} testID="home-scroll" style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="never">
          <Header onNotifications={() => openMenu('notifications')} />
          <View style={[styles.content, { paddingLeft: layout.gutter + insets.left, paddingRight: layout.gutter + insets.right }]}>
            <View style={styles.informationBanner}>
              <View style={styles.bannerIcon}><Icon name="book" size={38} /></View>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>Informasi Kampus</Text>
                <Text style={styles.bannerDescription}>Pengumuman dan agenda terbaru untuk Anda.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <SectionHeading title="Layanan Kampus" />
              <View style={styles.serviceGrid}>
                {services.map((service) => <ServiceCard key={service.id} service={service} wide={singleColumn}
                  onPress={() => setDialog({ kind: 'message', title: 'Belum tersedia', description: 'Modul ' + service.name + ' (' + service.description + ') belum tersedia. Pengembangan awal berfokus pada Informasi Kampus dan fondasi akun.' })} />)}
              </View>
            </View>

            <View style={styles.section}>
              <SectionHeading title="Informasi Terbaru">
                <Action onPress={() => openMenu('information')} accessibilityLabel="Lihat semua informasi, daftar belum dibuat" style={styles.seeAll}>
                  <Text style={styles.seeAllText}>Lihat semua</Text><Icon name="chevron" size={15} />
                </Action>
              </SectionHeading>
              <View style={styles.informationList}>
                {information.length === 0 ? <Text style={styles.empty}>Belum ada informasi untuk ditampilkan.</Text>
                  : information.map((item) => <InformationCard key={item.id} item={item} onPress={() => setDialog({ kind: 'information', item })} />)}
              </View>
            </View>
            <Text style={styles.previewNote}>Pratinjau UI · Identitas dan konten dummy</Text>
          </View>
        </ScrollView>
        <BottomNavigation onSelect={openMenu} />
      </View>
      <PreviewDialog content={dialog} onClose={() => setDialog(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, alignItems: 'center' },
  loading: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  app: { flex: 1, width: '100%', maxWidth: layout.maxWidth, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 4 },
  header: { paddingHorizontal: layout.gutter, paddingBottom: 48, backgroundColor: colors.primary, overflow: 'hidden' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoPlate: { backgroundColor: colors.surface, borderRadius: 8, padding: 5 },
  logo: { width: 44, height: 52 },
  brandDivider: { width: 1, height: 48, backgroundColor: colors.headerMuted },
  brandText: { flex: 1 },
  appName: { color: colors.surface, fontSize: 25, fontWeight: '700', letterSpacing: 0.1 },
  appNameCompact: { fontSize: 21 },
  campusName: { color: colors.surface, fontSize: 11, lineHeight: 16, marginTop: 3 },
  bell: { borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  greeting: { marginTop: 26 },
  welcome: { color: colors.headerMuted, fontSize: 24, lineHeight: 33, fontWeight: '600' },
  memberName: { color: colors.surface, fontWeight: '700' },
  identity: { color: colors.surface, fontSize: 14, lineHeight: 21, marginTop: 4 },
  headerWave: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 28 },
  content: { paddingTop: 4, paddingBottom: 12 },
  informationBanner: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: colors.surface, borderRadius: layout.cardRadius, borderWidth: 1, borderColor: colors.border, padding: 18, minHeight: 116 },
  bannerIcon: { backgroundColor: colors.softRed, padding: 13, borderRadius: 15 },
  bannerContent: { flex: 1 },
  bannerTitle: { fontSize: 20, fontWeight: '700', lineHeight: 27, color: colors.text },
  bannerDescription: { fontSize: 14, color: colors.muted, lineHeight: 21, marginTop: 5 },
  section: { marginTop: 22 },
  sectionHeading: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 8, marginBottom: 12 },
  headingTitle: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1, minHeight: 40 },
  headingMarker: { width: 4, height: 25, borderRadius: 2, backgroundColor: colors.primary },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '700', flexShrink: 1 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: layout.gap },
  serviceCard: { width: '48%', flexGrow: 1, flexBasis: '46%', backgroundColor: colors.surface, borderRadius: layout.cardRadius, padding: 10, minHeight: 106, justifyContent: 'center', boxShadow: '0px 2px 8px rgba(45, 12, 23, 0.06)' },
  serviceCardWide: { width: '100%', flexBasis: '100%' },
  serviceTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  serviceText: { flex: 1 },
  serviceName: { color: colors.text, fontSize: 16, fontWeight: '700' },
  serviceNameCompact: { fontSize: 14 },
  serviceDescription: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 3 },
  serviceStatus: { alignSelf: 'flex-start', borderRadius: 9, backgroundColor: colors.softRed, paddingHorizontal: 8, paddingVertical: 4, marginTop: 10 },
  statusText: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 2, borderRadius: 8 },
  seeAllText: { fontSize: 13, fontWeight: '600', color: colors.primary },
  informationList: { gap: 12 },
  informationCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: layout.cardRadius, padding: 12, boxShadow: '0px 2px 8px rgba(45, 12, 23, 0.06)' },
  informationIcon: { width: 66, minHeight: 88, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.softRed, borderRadius: 12 },
  informationIconCompact: { width: 42, minHeight: 64 },
  informationText: { flex: 1 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: colors.softRed, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 5 },
  category: { fontSize: 11, fontWeight: '700', color: colors.primary },
  informationTitle: { fontSize: 15, lineHeight: 20, fontWeight: '700', color: colors.text },
  summary: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 7 },
  date: { fontSize: 11, color: colors.muted },
  previewNote: { fontSize: 11, color: colors.muted, textAlign: 'center', marginTop: 22, lineHeight: 17 },
  empty: { padding: 20, color: colors.muted, fontSize: 14, textAlign: 'center' },
  navigation: { flexDirection: 'row', alignItems: 'stretch', backgroundColor: colors.surface, borderTopLeftRadius: 22, borderTopRightRadius: 22, borderTopWidth: 1, borderColor: colors.border, paddingTop: 7 },
  navigationItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 6, paddingBottom: 10, paddingHorizontal: 1, gap: 5, borderRadius: 8 },
  navigationLabel: { color: colors.muted, fontSize: 11, textAlign: 'center' },
  navigationLabelActive: { color: colors.primary, fontWeight: '700' },
  activeIndicator: { position: 'absolute', bottom: 0, height: 3, width: '85%', backgroundColor: colors.primary, borderRadius: 2 },
});
