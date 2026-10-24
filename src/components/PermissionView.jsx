import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PermissionView({ onRequestPermission }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evidencia Foto UTP</Text>
      <Text style={styles.text}>
        Se necesita autorización de la cámara para registrar entregas e inspecciones de campo.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onRequestPermission}>
        <Text style={styles.buttonText}>Conceder Permiso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 16, textAlign: 'center' },
  text: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 24 },
  button: { backgroundColor: '#2563eb', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});