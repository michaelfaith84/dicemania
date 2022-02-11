import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  IndexPath,
} from "@ui-kitten/components";
import DieSelector from "./components/DieSelector";
import randomInteger from "random-int";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import uuid from "react-native-uuid";
import {
  faDiceD4,
  faDiceD6,
  faDiceD8,
  faDiceD10,
  faDiceD12,
  faDiceD20,
} from "@fortawesome/pro-solid-svg-icons";
import * as Shake from "expo-shake";

const HomeScreen = () => {
  // Die Type
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  // Die Quantity
  const [dieQty, setDieQty] = React.useState("0");
  const data = ["d4", "d6", "d8", "d10", "d12", "d20"];
  const iconMap = {
    d4: faDiceD4,
    d6: faDiceD6,
    d8: faDiceD8,
    d10: faDiceD10,
    d12: faDiceD12,
    d20: faDiceD20,
  };
  const [diePool, setDiePool] = useState([]);
  const [results, setResults] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [shaking, setShaking] = useState(false);
  const addDie = () => {
    const dice = [];
    const resultsArr = [];
    for (let i = 0; i < dieQty; i++) {
      dice.push(data[selectedIndex.row]);
    }
    diePool.length > 0 ? setDiePool([...diePool, ...dice]) : setDiePool(dice);
    // diePool.map((d) => resultsArr.push(icon(d)));
    // setResults(resultsArr);
  };
  const icon = (die) => {
    return (
      // <Text key={uuid.v4()}>
      <FontAwesomeIcon
        style={{
          padding: 10,
          flexWrap: "wrap",
          marginRight: 10,
          marginVertical: 10,
        }}
        size={32}
        icon={iconMap[die]}
        key={uuid.v4()}
      />
      // </Text>
    );
  };
  const iconResult = (die) => {
    return (
      <Text key={uuid.v4()} style={{ marginVertical: 10 }}>
        <FontAwesomeIcon
          style={{ padding: 10, flexWrap: "wrap" }}
          size={32}
          icon={iconMap[die]}
          key={uuid.v4()}
        />
        {randomInteger(1, parseInt(die.replace(/[^\d]/g, "")))}
      </Text>
    );
  };
  const rollDice = () => {
    let results = [];
    if (diePool.length > 0) {
      diePool.map((die) => {
        results.push(iconResult(die));
      });
      setResults(results);
      // console.log(results);
    }
  };
  const resetDiePool = () => {
    if (diePool.length > 0) {
      setDiePool([]);
      setResults([]);
    }
  };

  useEffect(() => {
    if (diePool.length > 0) {
      const icons = [];
      diePool.map((die) => icons.push(icon(die)));
      setResults(icons);
    }
  }, [diePool]);

  useEffect(() => {
    Shake.addListener(() => {
      return {
        shaking,
        setShaking,
        setSpeed,
        handler: () => {
          console.log("Shake shake shake!");
        },
      };
    });
  }, []);

  useEffect(() => {
    if (shaking === true && speed < 5 && diePool.length > 0) {
      rollDice();
      setShaking(false);
    }
    // if (shaking ===) {
    //     const icons = [];
    //     diePool.map((die) => icons.push(icon(die)));
    //     setResults(icons);
    // }
  }, [speed]);

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        paddingTop: 50,
      }}
      level={"4"}
    >
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 25,
        }}
      >
        <DieSelector
          props={{
            selectedIndex,
            setSelectedIndex,
            dieQty,
            setDieQty,
            data,
            addDie,
          }}
        />
      </Layout>
      <Layout
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {results.length > 0 ? results.map((res, index) => res) : null}
      </Layout>
      <Layout
        style={{
          width: "100%",
          marginTop: 25,
          justifyContent: "flex-end",
        }}
      >
        <Button onPress={rollDice}>Roll!</Button>
      </Layout>
      <Layout
        style={{
          width: "100%",
          marginTop: 25,
          justifyContent: "flex-end",
        }}
      >
        <Button onPress={resetDiePool}>Reset Pool!</Button>
      </Layout>
    </Layout>
  );
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);
