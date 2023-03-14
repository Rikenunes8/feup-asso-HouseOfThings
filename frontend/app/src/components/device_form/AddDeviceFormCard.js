import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import colors from "../../../configs/colors";

export default function AddDeviceFormCard({ on, handler }) {
  const [name, onChangeName] = React.useState('');
  const [division, onChangeDivision] = React.useState('');
  const [nameFocus, onNameFocus] = React.useState(false);
  const [divisionFocus, onDivisionFocus] = React.useState(false);

  return (
    <View style={styles().container}>
      <View style= {nameFocus ? styles().formFocused : styles().form}>
        <Text style={styles().field}>NAME*</Text>
        <TextInput
          maxLength={40}
          onChangeText={name => onChangeName(name)}
          onFocus={() => onNameFocus(true)}
          onEndEditing={()=> onNameFocus(false)}
          value={name}
          style={{padding: 10}}
      />
      </View>
      <View style= {divisionFocus ? styles().formFocused : styles().form}>
        <Text style={styles().field}>DIVISON</Text>
        <TextInput
          maxLength={40}
          onChangeText={division => onChangeDivision(division)}
          onFocus={() => onDivisionFocus(true)}
          onEndEditing={()=> onDivisionFocus(false)}
          value={division}
          style={{padding: 10}}
      />
      </View>
      </View>
  );
}

const styles = (on = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginVertical: 5,
    },
    form: {
      flexDirection: "row",
      alignItems: "center",
      margin: 20,
      borderBottomWidth: 1,
      width: "90%",
    },
    formFocused: {
      fontSize: 10,
      flexDirection: "column",
      margin: 20,
      borderBottomWidth: 1,
      width: "90%",
    },
    field:{
      color: colors.primary,
    }


  });


/*

import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import ChooseDeviceScrollView from "../components/choose_device/ChooseDeviceScrollView";
import ChooseDeviceSideBar from "../components/choose_device/ChooseDeviceSideBar";

import api from "../api/api";

export default function ChooseDeviceModal({ modalVisible, setModalVisible }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    return await api.getCategories();
  };

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategory(categories.length ? categories[0] : null);
    });
  }, []);

  return (
    <AddModal
      title={"Add Device"}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      leftIcon={"close"}
      leftIconCallback={() => setModalVisible(false)}
      modalContent={
        categories && selectedCategory ? (
          <View style={styles.modalContentView}>
            <ChooseDeviceSideBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ChooseDeviceScrollView
              deviceTypes={selectedCategory.subcategories}
            />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  modalContentView: {
    height: "100%",
    flexDirection: "row",
    paddingVertical: 15,
  },
});*/
