import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import DynamicTextInput from "../form/DynamicTextInput";
import DynamicDropDown from "../form/DynamicDropDown";
import DivisionsContext from "../../contexts/DivisionsContext";
import utils from "../../utils/utils";
import CreateRuleContext from "../../contexts/CreateRuleContext";
import AddDeviceContext from "../../contexts/AddDeviceContext";

export default function CreateRuleForm({ inputOnFocus, setInputOnFocus }) {

    const {
        ruleName,
        setRuleName
    } = useContext(CreateRuleContext);


  /*const { divisions } = useContext(DivisionsContext);

  const [items, setItems] = useState(
    divisions.map((item) => {
      return { label: utils.capitalize(item.name), value: item.name };
    })
  );

  const [uuidItems, setUUIDItems] = useState(
    availableDevices.map((item) => {
      return { label: item.uuid, value: JSON.stringify(item) };
    })
  );*/

  console.log(ruleName)

  return (
    <View style={styles.container}>
      <DynamicTextInput
        label={"NAME *"}
        name={ruleName ?? ""}
        setName={setRuleName}
        inputOnFocus={inputOnFocus}
        setInputOnFocus={setInputOnFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 5,
  },
});
