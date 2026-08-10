import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { BarcodeScanningResult, CameraType, CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [takingPicture, setTakingPicture] = useState(false);
  const [scanned, setScanned] = useState(false);

  function toggleCameraFacing() {
    setFacing((oldState) => oldState === "back" ? "front" : "back");
  }

  function toggleFlash() {
    setFlash((oldState) => oldState === "off" ? "on" : "off");
  }

  async function takePicture() {
    if (!cameraRef.current || takingPicture) return;

    setTakingPicture(true);
    const mediaLibrary = await MediaLibrary.requestPermissionsAsync();

    if (mediaLibrary.status !== "granted") {
      Alert.alert("Permissão necessária", "Permita o acesso às fotos para salvar na galeria.",
      );
      return;
    }

    cameraRef.current
      .takePictureAsync()
      .then((photo) => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() =>
          Alert.alert("Foto salva!"),
        );
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Erro", "Não foi possível capturar a foto");
      })
      .finally(() => setTakingPicture(false));
  }

  async function handleBarcodeScanned(result : BarcodeScanningResult){
    if(scanned) return;

    setScanned(true);
    Alert.alert("QR Code", result.data);
  }

  if (!permission) {
    return (
      <View>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <FontAwesome name="camera" size={54} color="white" />
        <Text style={styles.permissionTitle}>Acesso à câmera</Text>

        <Text style={styles.permissionText}>O pokéhunter precisa de acesso à câmera para capturar Pokémons.</Text>

        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.permissionButton}>Permitir acesso</Text>
        </TouchableOpacity>
        <Pressable style={styles.cancelButton} onPress={router.back}>
          <Text style={styles.cancelButtonText}>Voltar</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <CameraView 
        style={styles.camera} 
        ref={cameraRef} 
        facing={facing} 
        flash={flash} 
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <SafeAreaView style={styles.overlay} edges={["top"]}>

        <View style={styles.topControls}>
          <Pressable style={styles.controlButton} onPress={router.back}>
            <FontAwesome name="close" size={24} color="white" />
          </Pressable>

          <Pressable style={[styles.controlButton, flash === "on" && styles.activeControlButton]} onPress={toggleFlash}>
            <FontAwesome name="bolt" size={24} color={flash === "on" ? "#ffd60a" : "white"}></FontAwesome>
          </Pressable>
        </View>

        <View style={styles.bottomArea}>
          <View style={styles.modeContainer}>
            <Text style={styles.activeMode}>FOTO</Text>
          </View>

          <View style={styles.cameraControls}>
            <View style={styles.sideButton} />

            <Pressable style={styles.captureButtonOuter} onPress={takePicture} disabled={takingPicture}>
              <View style={[styles.captureButtonInner, takingPicture && styles.captureButtonPressed]}>
                <MaterialIcons name="catching-pokemon" color={"black"} size={takingPicture ? 56 : 64} style={{ marginBottom: -3 }} />
              </View>
            </Pressable>

            <Pressable style={styles.sideButton} onPress={toggleCameraFacing}>
              <View style={styles.flipButton}>
                <FontAwesome name="refresh" size={24} color="white" />
              </View>
            </Pressable>

          </View>

          <SafeAreaView edges={["bottom"]} />
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  },
  camera: {
    height: "100%",
  },
  permissionContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#121212",
  },
  permissionTitle: {
    marginTop: 24,
    color: "white",
    fontWeight: "bold",
  },
  permissionText: {
    marginTop: 12,
    color: "#a3a3a3",
    fontSize: 16,
    textAlign: "center",
  },
  permissionButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "red",
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 18,
    padding: 10,
  },
  cancelButtonText: {
    color: "#a3a3a3",
    fontSize: 14,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    justifyContent: "space-between",
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  activeControlButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bottomArea: {
    paddingTop: 18,
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: "rgba(0,0,0,0.72)",
  },
  modeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
    marginBottom: 24,
  },
  activeMode: {
    color: "#ffd60a",
    fontSize: 13,
    fontWeight: "semibold",
  },
  cameraControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  captureButtonOuter: {
    width: 78,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 39,
    borderWidth: 4,
    borderColor: "white",
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
  },
  captureButtonPressed: {
    width: 56,
    height: 56,
    borderRadius: 28,
    opacity: 0.7,
  },
  sideButton: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  flipButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "rgba(35,35,35,0.9)",
  },
});
