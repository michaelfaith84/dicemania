import React, { useState, useEffect, Fragment } from "react";
import {
  Select,
  SelectItem,
  IndexPath,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";

const DieSelector = ({
  props: { selectedIndex, setSelectedIndex, dieQty, setDieQty, data, addDie },
}) => {
  // useEffect(() => {
  //   // console.log(data[selectedIndex.row]);
  // }, [selectedIndex]);
  // const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  // const addDie = () => {
  //   const dice = [];
  //   for (let i = 0; i <= dieQty; i++) {
  //     dice.push(data[selectedIndex.row]);
  //   }
  // };
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
          // style={styles.select}
          style={{ flex: 1, height: "100%" }}
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {data.map(renderOption)}
        </Select>
      </Layout>
      <Layout style={{ flex: 1 }}>
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

export default DieSelector;
