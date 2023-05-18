import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../../configs/colors";

export default function MessageAction({ service, data }) {
  const [info, setInfo] = React.useState(
    service === "whatsapp" ? data.number : ""
  );

  const serviceCapitalized = service.charAt(0).toUpperCase() + service.slice(1);

  if (service === "discord") {
    fetch(data.url)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{serviceCapitalized}</Text>

      <Text style={styles.specs}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
  },
  name: {
    fontWeight: "bold",
    color: colors.primaryText,
    marginRight: 15,
  },
  specs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
