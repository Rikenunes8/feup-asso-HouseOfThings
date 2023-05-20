import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UsernameProvider } from "./app/src/contexts/UsernameContext";
import { DevicesProvider } from "./app/src/contexts/DevicesContext";
import { DivisionsProvider } from "./app/src/contexts/DivisionsContext";
import { ModalsProvider } from "./app/src/contexts/ModalsContext";
import { RulesProvider } from "./app/src/contexts/RulesContext";
import { BuildProviderTree } from "./app/src/contexts/BuildProviderTree";
import SSEClient from "./app/src/services/SSEClient";

import NavBar from "./app/src/components/navbar/NavBar";
import ProfileScreen from "./app/src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const Providers = BuildProviderTree([
  ModalsProvider,
  UsernameProvider,
  DevicesProvider,
  DivisionsProvider,
  RulesProvider,
]);

export default function App() {
  return (
    <Providers>
      <SSEClient />
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
    </Providers>
  );
}
