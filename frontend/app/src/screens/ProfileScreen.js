import React, { useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import colors from "../../configs/colors";
import UsernameContext from "../contexts/UsernameContext";
import HoTTextInput from "../components/form/TextInput";

export default function ProfileScreen() {
  const { username, changeUsername } = useContext(UsernameContext);

  return (
    <SafeAreaView style={styles.container}>
      <HoTTextInput
        label="name"
        onChangeText={(text) => changeUsername(text)}
        value={username}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20,
  },
});
