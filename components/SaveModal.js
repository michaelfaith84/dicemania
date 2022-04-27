import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, Button, Card, Input } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveModal = ({
  props: { diePool, toggleModal, showModal, setError, updateKeys },
}) => {
  const [poolName, setPoolName] = useState("");
  const handlePress = async () => {
    try {
      const res = await AsyncStorage.getItem("@" + poolName);
      if (res == null || res === "") {
        try {
          const addRes = await AsyncStorage.setItem(
            "@" + poolName,
            JSON.stringify(diePool)
          );
          updateKeys();
          toggleModal("save");
          setPoolName("");
        } catch (err) {
          setError("Error: " + err);

          setPoolName("");
        }
      } else {
        setError("Error: A die pool with that name already exists.");
        setPoolName("");
      }
    } catch (err) {
      // This code runs if there were any errors.
      setError("Error: " + err);
      toggleModal("save");
    }
  };

  return (
    <Modal
      visible={showModal}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => toggleModal("save")}
    >
      <Card disabled={true}>
        <Input
          placeholder="Pool Name"
          value={poolName}
          onChangeText={(nextValue) => setPoolName(nextValue)}
          style={styles.ibox}
        />
        <Button disabled={poolName === "" ? true : false} onPress={handlePress}>
          Save
        </Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ibox: { paddingBottom: 20 },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default SaveModal;
