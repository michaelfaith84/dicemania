import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonGroup } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveLoad = ({ props: { diePool, toggleModal } }) => {
  const [loadDisabled, setLoadDisabled] = useState(true);

  useEffect(async () => {
    const res = await AsyncStorage.getAllKeys();
    if (res.length > 0) {
      setLoadDisabled(false);
    }
  }, [diePool]);

  return (
    <ButtonGroup style={styles.BtnGrp}>
      <Button disabled={loadDisabled} onPress={() => toggleModal("load")}>
        Load
      </Button>
      <Button
        disabled={diePool.length > 0 ? false : true}
        style={styles.Btn}
        onPress={() => toggleModal("save")}
      >
        Save
      </Button>
      <Button disabled={loadDisabled} onPress={() => toggleModal("delete")}>
        Delete
      </Button>
    </ButtonGroup>
  );
};

const styles = StyleSheet.create({
  BtnGrp: {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  Btn: { minWidth: "33%" },
});

export default SaveLoad;
