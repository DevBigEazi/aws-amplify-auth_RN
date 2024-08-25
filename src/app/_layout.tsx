import { Authenticator } from "@aws-amplify/ui-react-native";
import { Slot, Stack } from "expo-router";

import { Amplify } from "aws-amplify";
import amplifyconfig from "../amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

export default function App() {
  return (
    <Authenticator.Provider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Onboard" }} />
      </Stack>
    </Authenticator.Provider>
  );
}
