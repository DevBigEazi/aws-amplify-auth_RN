import { View, Text, StyleSheet, Button } from "react-native";
import {
  useAuthenticator,
} from "@aws-amplify/ui-react-native";

const Protected = () => {
  const { signOut } = useAuthenticator();
  return (
    <View style={style.container}>
      <Text style={style.text}>
        Hello, you are seeing this page because you are authenticated
      </Text>

      <Button title="sign out" onPress={() => signOut()} />
    </View>
  );
};

export default Protected;

const style = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
  },
});
