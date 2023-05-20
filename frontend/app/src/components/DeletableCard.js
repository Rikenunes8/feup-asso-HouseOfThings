import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";

import colors from "../../configs/colors";

import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

export default function DeletableCard(props) {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={props.handleDelete}
        activeOpacity={0.6}
        style={styles(props.deleteDisabled).deleteBox}
      >
        <View>
          <Animated.View style={{ transform: [{ scale: scale }] }}>
            <Icon name={"delete"} size={30} color={colors.white} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  return <Swipeable renderLeftActions={leftSwipe}>{props.children}</Swipeable>;
}

const styles = (deleteDisabled = false) =>
  StyleSheet.create({
    deleteBox: {
      backgroundColor: colors.red,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      shadowColor: "#171717",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      marginVertical: 10,
      width: 90,
      zIndex: 0,
      opacity: deleteDisabled ? 0.5 : 1,
    },
  });
