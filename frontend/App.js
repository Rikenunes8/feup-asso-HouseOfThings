import { NavigationContainer } from "@react-navigation/native";

import { DevicesProvider } from "./app/src/contexts/DevicesContext";
import { DivisionsProvider } from "./app/src/contexts/DivisionsContext";
import { ModalsProvider } from "./app/src/contexts/ModalsContext";
import { RulesProvider } from "./app/src/contexts/RulesContext";
import { BuildProviderTree } from "./app/src/contexts/BuildProviderTree";
import SSEClient from "./app/src/services/SSEClient";

import NavBar from "./app/src/components/navbar/NavBar";

const Providers = BuildProviderTree([
  ModalsProvider,
  DevicesProvider,
  DivisionsProvider,
  RulesProvider,
]);

export default function App() {
  return (
    <Providers>
      <SSEClient />
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </Providers>
  );
}
