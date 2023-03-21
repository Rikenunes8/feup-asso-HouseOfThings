import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import colors from "../../configs/colors";

export default function LoadingSpinner({ isLoading }) {
  return (
    isLoading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.transparentLightGray,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
