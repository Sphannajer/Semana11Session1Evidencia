import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function ConfirmationScreen({ photoUri, onRetake, onConfirm }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(description);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Confirmar Evidencia</Text>
      
      <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="contain" />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Descripción de la evidencia:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Entrega conforme en almacén central..."
          placeholderTextColor="#64748b"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.retakeButton]} onPress={onRetake} disabled={loading}>
            <Text style={styles.retakeText}>Descartar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmText}>Guardar Evidencia</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginTop: 20, marginBottom: 10 },
  preview: { flex: 1, width: '100%', borderRadius: 16, backgroundColor: '#1e293b', marginVertical: 10 },
  formContainer: { backgroundColor: '#1e293b', padding: 16, borderRadius: 16 },
  label: { color: '#cbd5e1', fontSize: 14, marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155', borderRadius: 10, padding: 12, color: '#ffffff', fontSize: 14, height: 70, textAlignVertical: 'top', marginBottom: 16 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  button: { flex: 1, paddingVertical: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  retakeButton: { backgroundColor: '#334155' },
  confirmButton: { backgroundColor: '#10b981' },
  retakeText: { color: '#f8fafc', fontWeight: '600', fontSize: 14 },
  confirmText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
});