import HomeScreen from "./HomeScreen";
import { AddDivisionProvider } from "../contexts/AddDivisionContext";

export default function HomeScreenWithContext() {
  return (
    <AddDivisionProvider>
      <HomeScreen />
    </AddDivisionProvider>
  );
}
