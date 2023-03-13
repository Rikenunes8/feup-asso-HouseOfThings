import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./app/src/components/NavBar";
import { DevicesProvider } from "./app/src/contexts/DevicesContext";

export default function App() {
  return (
    <DevicesProvider>
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </DevicesProvider>
  );
}
