import { Redirect, Slot, Stack } from "expo-router";
import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";

export default function AuthLayout() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === "authenticated") return <Redirect href="/protected" />;

  return (
    <Stack>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" options={{title: ""}}/>
    </Stack>
  );
}
