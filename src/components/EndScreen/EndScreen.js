import React, { useEffect, useState } from "react";
import { Text, View, Modal, Pressable } from "react-native";
import moment from "moment";

import styles from "./EndScreen.styles";

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

function EndScreen({ visible, gameState, onClose, onShare }) {
  //   console.log(gameState);
  const getTimeUntilNextGame = () => {
    let today = new moment();
    let tomorrow = new moment().startOf("day").add(1, "days");
    const diff = tomorrow.diff(today);
    const diffDuration = moment.duration(diff);
    return moment.utc(diffDuration.asMilliseconds()).format("HH:mm:ss");
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
          {gameState !== "playing" && (
            <Text style={styles.gameStatusText}>
              {gameState === "won"
                ? "Congrats, you won!"
                : "You lost, try again tomorrow."}
            </Text>
          )}
          <View style={styles.bottomView}>
            <View style={styles.timeView}>
              <Text style={styles.title}>Next Worlde</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
            <Pressable onPress={onShare} style={styles.share}>
              <Text style={styles.buttonText}>Share</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default EndScreen;
