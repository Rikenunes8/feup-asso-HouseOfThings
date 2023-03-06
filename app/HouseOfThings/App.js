import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "./app/src/components/NavBar";
import HomeScreen from "./app/src/screens/HomeScreen";

export default function App() {
  return (
    <NavigationContainer>
      <NavBar/>
    </NavigationContainer>
  );
}
