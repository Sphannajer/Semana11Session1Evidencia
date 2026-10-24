import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useCameraPermissions } from "expo-camera";
import PermissionView from "./src/components/PermissionView";
import CameraViewComponent from "./src/components/CameraViewComponent";
import ConfirmationScreen from "./src/components/ConfirmationScreen";
import GalleryModal from "./src/components/GalleryModal";
import {
  savePhotoEvidence,
  getPhotoHistory,
} from "./src/services/storageService";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getPhotoHistory();
    setHistory(data);
  };

  const handleConfirmPhoto = async (description) => {
    try {
      const updatedHistory = await savePhotoEvidence(photoUri, description);
      setHistory(updatedHistory);
      setPhotoUri(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.loadingText}>
          Comprobando permisos de cámara...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <PermissionView onRequestPermission={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {photoUri ? (
        <ConfirmationScreen
          photoUri={photoUri}
          onRetake={() => setPhotoUri(null)}
          onConfirm={handleConfirmPhoto}
        />
      ) : (
        <CameraViewComponent
          onPhotoCaptured={(uri) => setPhotoUri(uri)}
          onOpenGallery={() => setGalleryVisible(true)}
        />
      )}

      <GalleryModal
        visible={galleryVisible}
        onClose={() => setGalleryVisible(false)}
        history={history}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  centered: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { color: "#94a3b8", fontSize: 16 },
});
