import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import Col from "../../../grid/Column";
import Row from "../../../grid/Row";
import DynamicDropDown from "../../../form/DynamicDropDown";
import CreateRuleContext from "../../../../contexts/CreateRuleContext";
import colors from "../../../../../configs/colors";

export default function ComparatorDropdownCondition({
  index,
  attribute,
  current_comparator,
  current_state,
  start,
  stop,
}) {
  const { addRuleConditionState } = useContext(CreateRuleContext);

  const [comparators, setComparators] = useState([
    { label: ">", value: ">" },
    { label: "<", value: "<" },
    { label: "==", value: "==" },
  ]);

  const [step, setStep] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const [comparator, setComparator] = useState(
    current_comparator ? current_comparator : comparators[0].value
  );

  const [value, setValue] = useState(current_state ?? step[0].value);

  const handleValueChange = (item) => {
    addRuleConditionState(index, attribute, item.value, comparator);
    setValue(item);
  };

  const handleComparatorChange = (item) => {
    addRuleConditionState(index, attribute, value, item.value);
    setComparator(item);
  };

  const modalProps = {
    transparent: true,
    presentationStyle: "overFullScreen",
  };

  useEffect(() => {
    setStep(
      Array.from({ length: (stop - start) / 5 + 1 }, (_, index) => ({
        label: `${start + index * 5}`,
        value: start + index * 5,
      }))
    );
    addRuleConditionState(index, attribute, value, comparator);
  }, [index, attribute, value, comparator]);

  return (
    <Row style={{ width: "100%", justifyContent: "space-around" }}>
      <Col flex={0.4}>
        <DynamicDropDown
          items={comparators}
          setItems={setComparators}
          value={comparator}
          setValue={setComparator}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={handleComparatorChange}
        ></DynamicDropDown>
      </Col>
      <Col flex={0.5}>
        <DynamicDropDown
          items={step}
          setItems={setStep}
          value={value}
          setValue={setValue}
          listMode={"MODAL"}
          modalProps={modalProps}
          modalContentContainerStyle={styles.modalContent}
          onSelectItem={handleValueChange}
        ></DynamicDropDown>
      </Col>
    </Row>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 28,
    marginBottom: 25,
    marginTop: "92.5%",
  },
});
