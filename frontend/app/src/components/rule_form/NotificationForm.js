import React from "react";
import { View, StyleSheet } from "react-native";
import DynamicTextInput from "../form/DynamicTextInput";

export default function NotificationForm({ webhookURL, setWebhookURL }) {
  return (
    <View style={styles.container}>
      <DynamicTextInput
        label={"Webhook URL"}
        name={webhookURL ?? ""}
        setName={setWebhookURL}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
