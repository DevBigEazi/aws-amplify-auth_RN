import { Stack } from "expo-router";

export default function protectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="protected" options={{ headerShown: false }} />
    </Stack>
  );
}
