import React from "react";
import { Text, View, StyleSheet, Modal } from "react-native";

function EndScreen({ gameState }) {
  return (
    <Modal>
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <Text>Hello</Text>
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
  },
  modalView: {
    backgroundColor: "black",
    width: "80%",
    height: "50%",
  },
});

export default EndScreen;
