import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import AddDeviceModal from "../screens/AddDeviceModal";
import SettingsScreen from "../screens/SettingsScreen";
import RulesScreen from "../screens/RulesScreen";
import HistoryScreen from "../screens/HistoryScreen";

import NavBarIcon from "./NavBarIcon";
import AddDeviceIcon from "./AddDeviceIcon";
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
            <NavBarIcon
              image={require("../../../assets/home_icon.png")}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rules"
        component={RulesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavBarIcon
              image={require("../../../assets/rules_icon.png")}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Device"
        component={AddDeviceModal}
        options={{
          tabBarIcon: ({ focused }) => <AddDeviceIcon focused={focused} />,
          tabBarButton: (props) => <AddDeviceButton {...props} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavBarIcon
              image={require("../../../assets/history_icon.png")}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavBarIcon
              image={require("../../../assets/settings_icon.png")}
              focused={focused}
            />
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
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
