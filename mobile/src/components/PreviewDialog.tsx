import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Action } from '@/components/Action';
import { Icon } from '@/components/Icon';
import { colors, layout } from '@/constants/theme';
import type { CampusInformation } from '@/data/home';

export type DialogContent =
  | { kind: 'message'; title: string; description: string }
  | { kind: 'information'; item: CampusInformation };

export function PreviewDialog({ content, onClose }: { content: DialogContent | null; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const item = content?.kind === 'information' ? content.item : null;
  const title = content?.kind === 'message' ? content.title : item?.title;
  return (
    <Modal visible={content !== null} transparent animationType={Platform.OS === 'web' ? 'none' : 'fade'} onRequestClose={onClose}>
      <View style={[styles.overlay, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessible={false} />
        <View style={styles.dialog} accessibilityViewIsModal testID="preview-dialog">
          <View style={styles.heading}>
            <Text accessibilityRole="header" style={styles.title}>{title}</Text>
            <Action onPress={onClose} accessibilityLabel="Tutup dialog" style={styles.close}><Icon name="close" color={colors.muted} /></Action>
          </View>
          <ScrollView contentContainerStyle={styles.body} bounces={false}>
            {item ? <>
              <View style={styles.metadata}><Text style={styles.category}>{item.category}</Text><Text style={styles.date}>{item.dateLabel}</Text></View>
              <Text style={styles.demo}>Contoh informasi · Data dummy</Text>
              {item.paragraphs.map((paragraph) => <Text key={paragraph} style={styles.paragraph}>{paragraph}</Text>)}
              {item.event && <View style={styles.event}>
                <View style={styles.eventRow}><Icon name="calendar" size={20} /><Text style={styles.eventText}>{item.event.time}</Text></View>
                <View style={styles.eventRow}><Icon name="location" size={20} /><Text style={styles.eventText}>{item.event.location}</Text></View>
              </View>}
            </> : content?.kind === 'message' ? <Text style={styles.paragraph}>{content.description}</Text> : null}
          </ScrollView>
          <Action onPress={onClose} style={styles.button} focusColor={colors.surface} accessibilityLabel="Kembali ke Beranda"><Text style={styles.buttonText}>Kembali ke Beranda</Text></Action>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.overlay, paddingHorizontal: 20 },
  dialog: { width: '100%', maxWidth: layout.maxWidth - 40, maxHeight: '100%', flexShrink: 1, backgroundColor: colors.surface, borderRadius: 24, padding: 20 },
  heading: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 12 },
  title: { flex: 1, fontSize: 21, lineHeight: 29, fontWeight: '700', color: colors.text, paddingTop: 8 },
  close: { alignItems: 'center', justifyContent: 'center', borderRadius: 24 },
  body: { paddingBottom: 8 },
  metadata: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 12 },
  category: { color: colors.primary, backgroundColor: colors.softRed, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, fontSize: 13, fontWeight: '700' },
  date: { color: colors.muted, fontSize: 13 },
  demo: { fontSize: 13, color: colors.primary, fontWeight: '600', marginBottom: 16 },
  paragraph: { color: colors.muted, fontSize: 16, lineHeight: 25, marginBottom: 16 },
  event: { backgroundColor: colors.background, borderRadius: 12, padding: 14, gap: 14, marginBottom: 8 },
  eventRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  eventText: { color: colors.text, flex: 1, fontSize: 14, lineHeight: 21 },
  button: { backgroundColor: colors.primary, borderRadius: 12, alignItems: 'center', justifyContent: 'center', padding: 12, marginTop: 12 },
  buttonText: { color: colors.surface, textAlign: 'center', fontSize: 15, fontWeight: '700' },
});
