import { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import Animated, {
  SlideInLeft,
  FlipInEasyY,
  ZoomIn,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

import { colors, colorsToEmoji, CLEAR, ENTER } from "../../constants";
import { copyArray, getDayKey } from "../../utils/index";
import EndScreen from "../EndScreen/EndScreen";
import styles from "./Game.styles";
import Keyboard from "../Keyboard/Keyboard";

const word = "hello";
const letters = word.split("");
const NUMBER_OF_TRIES = 6;

const dayKey = getDayKey();

const initializeRows = () => {
  return new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""));
};

const Game = () => {
  const [rows, setRows] = useState(initializeRows());
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing");

  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //When we first mount the component, read the game state from cache
  useEffect(() => {
    //AsyncStorage.setItem("game", "");
    readGameState();
  }, []);

  //When user clicks enter, we check to see if they won or lost and update accordingly
  useEffect(() => {
    if (curRow > 0 && gameState === "playing") {
      checkGameState();
    }
  }, [curRow]);

  /* Whenever any state variable changes, we persist it to the cache
  so if user exits apps, the data will still be available. */
  useEffect(() => {
    if (loaded) persistGameState();
  }, [rows, curRow, curCol, gameState]);

  useEffect(() => {
    if (gameState !== "playing") setModalVisible(true);
  }, [gameState]);

  const resetGame = async () => {
    const dataForToday = {
      rows: initializeRows(),
      curRow: 0,
      curCol: 0,
      gameState: "playing",
    };
    setRows(dataForToday.rows);
    setCurRow(dataForToday.curRow);
    setCurCol(dataForToday.curCol);
    setGameState(dataForToday.gameState);
  };

  const persistGameState = async () => {
    const dataForToday = {
      rows,
      curRow,
      curCol,
      gameState,
    };

    try {
      let existingStateString = await AsyncStorage.getItem("game");
      const existingState = existingStateString
        ? JSON.parse(existingStateString)
        : {};
      existingState[dayKey] = dataForToday;
      const dataString = JSON.stringify(existingState);
      await AsyncStorage.setItem("game", dataString);
    } catch (e) {
      console.log("Error persisting game state to Async Storage", e);
    }
  };

  const readGameState = async () => {
    try {
      const gameStateString = await AsyncStorage.getItem("game");
      //   console.log(gameStateString);
      if (gameStateString) {
        const game = JSON.parse(gameStateString);
        const todaysGame = game[dayKey];
        setRows(todaysGame.rows);
        setCurRow(todaysGame.curRow);
        setCurCol(todaysGame.curCol);
        setGameState(todaysGame.gameState);
      }
    } catch (e) {
      console.log("Error getting game state from Async Storage", e);
    }
    setLoaded(true);
  };

  const checkGameState = () => {
    const row = rows[curRow - 1];
    if (row.every((letter, i) => letter === letters[i])) {
      setGameState("won");
    }
    if (curRow === rows.length) {
      setGameState("lost");
    }
  };

  const shareScore = async () => {
    const emojiText = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("")
      )
      .filter((row) => row)
      .join("\n");
    const textToShare = `Wordle\n${emojiText}`;
    await Clipboard.setStringAsync(textToShare);
    Alert.alert("Copied successfully", "Share your score!");
  };

  const onKeyPressed = (key) => {
    //Only keep going if user is still in playing mode
    if (gameState !== "playing") return;

    //Copy current rows to make changes to state.
    const updatedRows = copyArray(rows);

    //Erase previous cell letter
    if (key === CLEAR) {
      if (curCol > 0) {
        const prevCol = curCol - 1;
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }

      //Go to the next row
    } else if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
    } else if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      if (curCol < rows[0].length) {
        setCurCol(curCol + 1);
      } else {
        setCurCol(0);
      }
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];

    if (row >= curRow) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((letter, j) => getCellBGColor(i, j) === color)
    );
  };

  const getCellStyle = (i, j) => [
    styles.cell,
    {
      borderColor: isCellActive(i, j) ? colors.grey : colors.darkgrey,
      backgroundColor: getCellBGColor(i, j),
    },
  ];

  if (!loaded) return <ActivityIndicator />;

  return (
    <>
      <EndScreen
        visible={modalVisible}
        gameState={gameState}
        onShare={() => shareScore()}
        onClose={() => setModalVisible(!modalVisible)}
      />
      <View style={styles.buttonView}>
        <Pressable
          onPress={() => resetGame()}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={[styles.button, { backgroundColor: colors.secondary }]}
        >
          <Text style={styles.buttonText}>Stats</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <Animated.View
            entering={SlideInLeft.delay(i * 33)}
            key={`row-${i}`}
            style={styles.row}
          >
            {row.map((letter, j) => (
              <>
                {i < curRow && (
                  <Animated.View
                    entering={FlipInEasyY.delay(j * 55)}
                    key={`cell-color-${i}-${j}`}
                    style={getCellStyle(i, j)}
                  >
                    <Text style={styles.letter}>{letter}</Text>
                  </Animated.View>
                )}
                {i === curRow && !!letter && (
                  <Animated.View
                    entering={ZoomIn}
                    key={`cell-active-${i}-${j}`}
                    style={getCellStyle(i, j)}
                  >
                    <Text style={styles.letter}>{letter}</Text>
                  </Animated.View>
                )}
                {!letter && (
                  <Animated.View
                    key={`cell-${i}-${j}`}
                    style={getCellStyle(i, j)}
                  >
                    <Text style={styles.letter}>{letter}</Text>
                  </Animated.View>
                )}
              </>
            ))}
          </Animated.View>
        ))}
      </ScrollView>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={getAllLettersWithColor(colors.primary)}
        yellowCaps={getAllLettersWithColor(colors.secondary)}
        greyCaps={getAllLettersWithColor(colors.darkgrey)}
      />
    </>
  );
};

export default Game;
