import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";

import HomeScreen from "../screens/HomeScreen";
import ChooseDeviceModal from "../screens/ChooseDeviceModal";
import SettingsScreen from "../screens/SettingsScreen";
import RulesScreen from "../screens/RulesScreen";
import HistoryScreen from "../screens/HistoryScreen";

import NavBarIcon from "./NavBarIcon";
import AddDeviceButton from "./AddDeviceButton";

import colors from "../../configs/colors";

export default function NavBar() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavBarIcon name={"home"} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Rules"
        component={RulesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavBarIcon name={"list"} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Device"
        component={ChooseDeviceModal}
        options={{
          tabBarIcon: () => <Icon name="plus" size={40} color={colors.white} />,
          tabBarButton: (props) => <AddDeviceButton {...props} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavBarIcon name={"chart"} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavBarIcon name={"settings"} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 90,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
