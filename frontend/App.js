import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UsernameProvider } from "./app/src/contexts/UsernameContext";
import { DevicesProvider } from "./app/src/contexts/DevicesContext";
import { DivisionsProvider } from "./app/src/contexts/DivisionsContext";
import { ModalsProvider } from "./app/src/contexts/ModalsContext";

import NavBar from "./app/src/components/navbar/NavBar";
import ProfileScreen from "./app/src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ModalsProvider>
      <UsernameProvider>
        <DevicesProvider>
          <DivisionsProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="NavBar"
                  component={NavBar}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </DivisionsProvider>
        </DevicesProvider>
      </UsernameProvider>
    </ModalsProvider>
  );
}
