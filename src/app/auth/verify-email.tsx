import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";

import { autoSignIn, confirmSignUp } from "aws-amplify/auth";

const VerifyEmail = () => {
  const { email } = useLocalSearchParams();

  const [form, setForm] = useState({
    email: email,
    confirmationCode: "",
  });
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");

    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: form.email,
        confirmationCode: form.confirmationCode,
      });

      console.log(nextStep.signUpStep);

      if (isSignUpComplete === true) await autoSignIn();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Email</Text>

      <TextInput
        secureTextEntry
        style={styles.input}
        value={form.confirmationCode}
        onChangeText={(e) =>
          setForm({
            ...form,
            confirmationCode: e,
          })
        }
      />

      <Button title="Confirm Email" onPress={handleVerify} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontFamily: "InterSemi",
    fontSize: 24,
    color: "dimgray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default VerifyEmail;
