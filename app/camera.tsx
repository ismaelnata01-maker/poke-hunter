import { FontAwesome } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { captureOwnerStack } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

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

      <CameraView style={styles.camera} />

      <SafeAreaView style={styles.overlay} edges={["top"]}>

        <View style={styles.topControls}>
          <Pressable style={styles.controlButton} onPress={router.back}>
            <FontAwesome name="close" size={24} color="white" />
          </Pressable>

          <Pressable style={[styles.controlButton]}>
            <FontAwesome name="bolt" size={24} color="white"></FontAwesome>
          </Pressable>
        </View>

        <View style={styles.bottomArea}>
          <View style={styles.modeContainer}>
            <Text style={styles.activeMode}>FOTO</Text>
          </View>

          <View style={styles.cameraControls}>
            <View style={styles.sideButton}/>

            <Pressable style={styles.captureButtonOuter}>
              <View style={[styles.captureButtonInner]}/>
            </Pressable>

            <Pressable style={styles.sideButton}>
              <View style={styles.flipButton}>
                <FontAwesome name="refresh" size={24} color="white"/>
              </View>
            </Pressable>

          </View>

          <SafeAreaView edges={["bottom"]}/>
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
