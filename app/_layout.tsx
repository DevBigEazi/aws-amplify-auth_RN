import { Stack } from "expo-router";
import { Amplify } from "aws-amplify";
import amplifyconfig from "../amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

export default function App() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
