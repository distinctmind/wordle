import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import moment from "moment";

const stats = [
  {
    number: 2,
    subtitle: "Played",
  },
  {
    number: 100,
    subtitle: "Win %",
  },
  {
    number: 2,
    subtitle: "Current Streak",
  },
  {
    number: 2,
    subtitle: "Max Streak",
  },
];

function EndScreen({ visible, onClose }) {
  const getTimeUntilNextGame = () => {
    let today = new moment();
    let tomorrow = new moment().startOf("day").add(1, "days");
    const diff = tomorrow.diff(today);
    const diffDuration = moment.duration(diff);
    return {
      hours: diffDuration.hours(),
      minutes: diffDuration.minutes(),
      seconds: diffDuration.seconds(),
    };
  };

  const updateTime = () => {
    setTime(getTimeUntilNextGame());
  };
  const [time, setTime] = useState(getTimeUntilNextGame());

  useEffect(() => {
    const timer = setInterval(() => updateTime(), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // var tId = setInterval(getTimeLeft, 1000);

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
              {stats.map((stat) => (
                <View
                  key={`${stat.number}-${stat.subtitle}`}
                  style={styles.stat}
                >
                  <Text style={styles.number}>{stat.number}</Text>
                  <Text style={styles.subtitle}>{stat.subtitle}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.title}>Next Worlde</Text>
            <Text
              style={styles.time}
            >{`${time.hours}:${time.minutes}:${time.seconds}`}</Text>
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
  time: {
    color: "white",
    fontSize: 22,
    margin: 10,
    fontWeight: "600",
  },
  timeView: {
    position: "absolute",
    bottom: 10,
    left: 30,
    marginVertical: 25,
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
