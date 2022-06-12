import React from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";

function EndScreen({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <Pressable onPress={onClose} style={styles.close}>
            <Text style={styles.closeText}>x</Text>
          </Pressable>
          <View style={styles.statsView}>
            <Text style={styles.title}>Statistics</Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.number}>2</Text>
                <Text style={styles.subtitle}>Played</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.number}>100</Text>
                <Text style={styles.subtitle}>Win %</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.number}>2</Text>
                <Text style={styles.subtitle}>Current Streak</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.number}>2</Text>
                <Text style={styles.subtitle}>Max Streak</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor: "transparent",
  },
  modalView: {
    backgroundColor: "black",
    width: "77%",
    height: "44%",
    alignItems: "center",
  },
  close: {
    position: "absolute",
    right: 20,
    top: 0,
    marginVertical: 10,
  },
  closeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "800",
    color: "white",
  },
  statsView: {
    marginTop: 30,
    alignItems: "center",
  },
  stats: {
    flexDirection: "row",
    marginTop: 20,
  },
  stat: {
    width: 70,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  number: {
    color: "white",
    fontSize: 25,
    fontWeight: "500",
  },
  subtitle: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
});

export default EndScreen;
