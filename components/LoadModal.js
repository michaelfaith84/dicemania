import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Modal,
  Text,
  Button,
  Card,
  Input,
  SelectItem,
  Select,
  IndexPath,
} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadModal = ({
  props: { setDiePool, toggleModal, showModal, setError, updateKeys, poolKeys },
}) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  useEffect(async () => {
    await updateKeys();
  }, []);

  useEffect(() => {
    console.log("Stored Die Pools: ");
    console.log(poolKeys.length);
  }, [poolKeys]);

  // const poolSelectItem = (key, value) => {
  //   return (
  //   );
  // };

  const fetchData = async (key) => {
    try {
      const res = await AsyncStorage.getItem(key);
      return JSON.parse(res);
    } catch (err) {
      setError("Error: " + err);
      return false;
    }
  };

  const handlePress = async (e) => {
    setDiePool(await fetchData(poolKeys[selectedIndex.row - 1]));
    toggleModal("load");
  };

  return (
    <Modal
      visible={showModal}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => toggleModal("load")}
    >
      <Card disabled={true} style={styles.container}>
        <Select
          style={styles.container}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(new IndexPath(index.row));
          }}
          value={
            selectedIndex.row - 1 >= 0
              ? poolKeys[selectedIndex.row - 1].substring(1)
              : "Choose"
          }
        >
          <SelectItem title={""} value={""} />
          {poolKeys.length > 0
            ? poolKeys.map((e, i) => (
                <SelectItem
                  key={i}
                  title={e.substring(1)}
                  value={e.substring(1)}
                />
              ))
            : ""}
        </Select>
        <Button
          disabled={selectedIndex.row > 0 ? false : true}
          onPress={handlePress}
          style={styles.container}
        >
          Load
        </Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 25, marginVertical: 10, width: "100%" },
  items: { width: 200 },
  ibox: { paddingBottom: 20 },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LoadModal;
