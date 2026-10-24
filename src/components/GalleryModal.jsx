import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

export default function GalleryModal({ visible, onClose, history }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🖼️ Últimas Evidencias (Galeria)</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>No hay evidencias guardadas aún.</Text>
            ) : (
              history.map((item) => (
                <View key={item.id} style={styles.card}>
                  <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
                    <Text style={styles.cardDate}>{item.date}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar Galería</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1e293b', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  closeText: { fontSize: 20, color: '#94a3b8', padding: 4 },
  scrollContent: { paddingBottom: 16 },
  emptyText: { color: '#94a3b8', textAlign: 'center', marginVertical: 32, fontSize: 15 },
  card: { flexDirection: 'row', backgroundColor: '#0f172a', borderRadius: 12, padding: 10, marginBottom: 12, alignItems: 'center' },
  thumbnail: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#334155' },
  cardInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  cardDesc: { color: '#f8fafc', fontSize: 14, fontWeight: '500', marginBottom: 6 },
  cardDate: { color: '#64748b', fontSize: 12 },
  closeButton: { backgroundColor: '#334155', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  closeButtonText: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
});