import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const STORAGE_KEY = "@utp_photo_evidence_history";
const MAX_GALLERY_ITEMS = 3;

export const savePhotoEvidence = async (tempUri, description) => {
  try {
    const filename = tempUri.split("/").pop();
    const permanentUri = `${FileSystem.documentDirectory}${Date.now()}_${filename}`;

    // Copiar al almacenamiento persistente para evitar pérdida por caché
    await FileSystem.copyAsync({
      from: tempUri,
      to: permanentUri,
    });

    const newEvidence = {
      id: Date.now().toString(),
      uri: permanentUri,
      description: description || "Sin descripción",
      date: new Date().toLocaleString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const history = existingData ? JSON.parse(existingData) : [];

    // Mantener estrictamente las últimas 3 fotografías
    const updatedHistory = [newEvidence, ...history].slice(
      0,
      MAX_GALLERY_ITEMS,
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error("Error al persistir la fotografía:", error);
    throw error;
  }
};

export const getPhotoHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al obtener el historial:", error);
    return [];
  }
};
