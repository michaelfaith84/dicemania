import React from "react";
import {
  Select,
  SelectItem,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const DieSelector = ({
  props: { selectedIndex, setSelectedIndex, dieQty, setDieQty, data, addDie },
}) => {
  const displayValue = data[selectedIndex.row];

  const renderOption = (title, index) => (
    <SelectItem style={{ alignContent: "center" }} title={title} key={index} />
  );

  const onDieQtyChange = (qty) => {
    setDieQty(qty.replace(/[^\d]/g, "").toString());
  };

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Layout style={{ flex: 1 }}>
        <Select
          style={styles.select}
          // style={{ flex: 1 }}
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {data.map(renderOption)}
        </Select>
      </Layout>
      <Layout style={styles.container}>
        <Input
          placeholder={"Quantity"}
          value={dieQty}
          onChangeText={(qty) => onDieQtyChange(qty)}
        />
      </Layout>
      <Layout style={{ flexShrink: 1 }}>
        <Button onPress={addDie}>+</Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 2 },
  select: { flex: 1, marginVertical: 2, marginLeft: 2 },
});

export default DieSelector;
