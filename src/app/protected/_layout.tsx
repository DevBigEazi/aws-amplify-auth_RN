import { Redirect, Slot, Stack } from "expo-router";

import { Amplify } from "aws-amplify";
import amplifyconfig from "../../amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";

function ProtectedLayout() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  if (authStatus !== "authenticated") return <Redirect href="/auth/sign-in" />;
  return <Slot />;
}

// export default withAuthenticator(ProtectedLayout);
export default ProtectedLayout;
