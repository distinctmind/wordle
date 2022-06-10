import { useEffect, useState } from "react";
import { Text, ScrollView, View, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";

import { colors, colorsToEmoji, CLEAR, ENTER } from "../../constants";
import { copyArray, getDayOfTheYear } from "../../utils/index";
import styles from "./Game.styles";
import Keyboard from "../Keyboard/Keyboard";

const word = "hello";
const letters = word.split("");
const NUMBER_OF_TRIES = 6;

const initializeRows = () => {
  return new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""));
};

const Game = () => {
  const [rows, setRows] = useState(initializeRows());
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing");

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = () => {
    if (gameState !== "playing") return;

    const row = rows[curRow - 1];

    if (row.every((letter, i) => letter === letters[i])) {
      setGameState("won");
      return Alert.alert("Congrats", "You Won!!!", [
        { text: "Share", onPress: shareScore },
      ]);
    }
    if (curRow === rows.length) {
      setGameState("lost");
      return Alert.alert("Try again tomorrow");
    }
  };

  const shareScore = async () => {
    const emojiText = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("")
      )
      .filter((row) => row)
      .join("\n");
    const textToShare = `Wordle \n ${emojiText}`;
    await Clipboard.setStringAsync(textToShare);
    Alert.alert("Copied successfully", "Share your score!");
  };

  const onKeyPressed = (key) => {
    if (gameState !== "playing") return;

    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      if (curCol > 0) {
        const prevCol = curCol - 1;
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }
    if (curCol >= rows[0].length) return;
    updatedRows[curRow][curCol] = key;
    setRows(updatedRows);
    if (curCol < rows[0].length) {
      setCurCol(curCol + 1);
    } else {
      setCurCol(0);
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

  return (
    <>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.grey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={styles.letter}>{letter}</Text>
              </View>
            ))}
          </View>
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
