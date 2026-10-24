import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView } from 'expo-camera';

export default function CameraViewComponent({ onPhotoCaptured, onOpenGallery }) {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [busy, setBusy] = useState(false);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === 'off' ? 'on' : 'off'));
  };

  const takePhoto = async () => {
    if (!cameraRef.current || busy) return;
    setBusy(true);
    try {
      const result = await cameraRef.current.takePictureAsync();
      if (result?.uri) {
        onPhotoCaptured(result.uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo capturar la fotografía.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} flash={flash}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
            <Text style={styles.iconText}>{flash === 'on' ? '⚡ Flash On' : '⚡ Flash Off'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onOpenGallery}>
            <Text style={styles.iconText}>🖼️ Galería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
            <Text style={styles.iconText}>🔄 {facing === 'back' ? 'Trasera' : 'Frontal'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={[styles.captureButton, busy && styles.disabledButton]} 
            onPress={takePhoto}
            disabled={busy}
          >
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 16 },
  iconButton: { backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  iconText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  bottomBar: { paddingBottom: 40, alignItems: 'center' },
  captureButton: { width: 76, height: 76, borderRadius: 38, borderWidth: 4, borderColor: '#ffffff', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  disabledButton: { opacity: 0.5 },
  innerCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ffffff' },
});