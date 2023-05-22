import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  View,
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import colors from "../../configs/colors";
import Header from "../components/header/Header";
import { getServerAddress, setServerAddress } from "../api/client";

export default function SettingsScreen() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getServerAddress();
      setAddress(address);
    };

    fetchAddress();
  }, []);

  useEffect(() => {
    if (!address) return;
    setText(address);
  }, [address]);

  const confirm = async () => {
    await setServerAddress(text);
    setAddress(text);
    setEditing(false);
  };

  const reset = async () => {
    setText(address);
    setEditing(false);
  };

  const subsectionHeaderButton = (name, callback) => {
    let color = colors.primary;
    if (name === "close") color = colors.red;
    if (name === "check") color = colors.active;

    return (
      <SimpleLineIcons
        name={name}
        size={20}
        color={color}
        style={styles.icon}
        onPress={callback}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.body}>
        <Text style={styles.sectionHeader}>Settings</Text>

        <View style={styles.sectionBody}>
          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>Server Address</Text>
            {!editing ? (
              subsectionHeaderButton("pencil", () => setEditing(true))
            ) : (
              <>
                {subsectionHeaderButton("close", () => reset())}
                {subsectionHeaderButton("check", () => confirm())}
              </>
            )}
          </View>

          {editing ? (
            <TextInput
              style={styles.input}
              onChangeText={(text) => setText(text)}
              value={text}
            />
          ) : (
            <Text style={styles.address}>{address}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  body: {
    flex: 0.85,
    width: "85%",
    alignItems: "flex-start",
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    paddingTop: 16,
    paddingBottom: 5,
  },
  sectionBody: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  subsectionHeader: {
    flexDirection: "row",
    zIndex: 1,
    marginBottom: 10,
  },
  subsectionTitle: {
    flexGrow: 1,
    fontSize: 15,
    color: colors.primary,
    textTransform: "uppercase",
  },
  icon: {
    flexGrow: 0,
    marginRight: 5,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderBottomWidth: 1,
    color: colors.black,
  },
  address: {
    color: colors.black,
  },
});
