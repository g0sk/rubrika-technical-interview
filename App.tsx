import NavigationProvider from "./src/navigation/RootNavigator";
import {type AppStateStatus, Platform} from "react-native";
import {useOnlineManager} from "./src/hooks/app/useOnlineManager";
import {useAppState} from "./src/hooks/app/useAppState";
import {QueryClientProvider, focusManager} from "@tanstack/react-query";
import QueryClient from "./src/services/api";

/* function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
} */

export default function App() {
  //useOnlineManager();
  //useAppState(onAppStateChange);
  return (
    <QueryClientProvider client={QueryClient}>
      <NavigationProvider />
    </QueryClientProvider>
  );
}
