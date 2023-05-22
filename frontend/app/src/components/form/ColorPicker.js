import React, { useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import DynamicTextInput from "./DynamicTextInput";

import colors from "../../../configs/colors";

const CIRCLE_RING_SIZE = 2;
const CIRCLE_SIZE = 40;

const predefinedColors = [
  colors.purple,
  colors.blue,
  colors.red,
  colors.lightPink,
  colors.green,
  colors.mintGreen,
  colors.indigo,
  colors.coolWhite,
  colors.warmWhite,
  colors.orange,
  colors.coolYellow,
  colors.turquoise,
];

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View
          style={[styles.colorSelected, { backgroundColor: selectedColor }]}
        />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: colors.transparentGray,
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.modalBody}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Icon
                    name={"close"}
                    size={30}
                    color={colors.primary}
                    style={styles.leftIcon}
                  />
                </TouchableOpacity>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Select a color</Text>
                </View>
                <View style={styles.colors}>
                  {!inputOnFocus
                    ? predefinedColors.map((color, _) => {
                        return (
                          <View key={color}>
                            <TouchableWithoutFeedback
                              onPress={() => handleColorSelect(color)}
                            >
                              <View
                                style={[styles.circle, { borderColor: color }]}
                              >
                                <View
                                  style={[
                                    styles.circleInside,
                                    { backgroundColor: color },
                                  ]}
                                ></View>
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        );
                      })
                    : null}
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputDescription}>
                    Or enter a color <Text style={{ fontSize: 12 }}>(HEX)</Text>
                  </Text>
                  <View style={styles.inputBox}>
                    <DynamicTextInput
                      label={"Hexadecimal color"}
                      name={selectedColor}
                      setName={setSelectedColor}
                      inputOnFocus={inputOnFocus}
                      setInputOnFocus={setInputOnFocus}
                    ></DynamicTextInput>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftIcon: {
    marginBottom: 15,
  },
  modalBody: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "50%",
    padding: 25,
  },
  header: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.black,
  },
  colors: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    backgroundColor: "#f1f1f1",
    marginRight: 8,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: colors.transparent,
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 10,
    position: "absolute",
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
  },
  colorSelected: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputDescription: {
    fontSize: 20,
    fontWeight: 600,
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  inputBox: {
    alignItems: "flex-end",
  },
});

export default ColorPicker;
