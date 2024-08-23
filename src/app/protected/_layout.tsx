import { Slot, Stack } from "expo-router";

import { Amplify } from "aws-amplify";
import amplifyconfig from "../../amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

function ProtectedLayout() {
  return <Slot />;
}

export default ProtectedLayout;
