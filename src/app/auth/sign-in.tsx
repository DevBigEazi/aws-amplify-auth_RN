import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";

import { resendSignUpCode, signIn } from "aws-amplify/auth";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: form.email,
        password: form.password,
      });

      if (isSignedIn) return router.push("/protected");
      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({
          username: form.email,
        });
        router.push({
          pathname: "/auth/verify-email",
          params: { email: form.email },
        });
      }
      //   else return setError("Something went wrong " + nextStep.signInStep);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        placeholder="jon@acme.com"
        style={styles.input}
        value={form.email}
        onChangeText={(e) =>
          setForm({
            ...form,
            email: e,
          })
        }
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(e) =>
          setForm({
            ...form,
            password: e,
          })
        }
      />

      <Button title="Sign in" onPress={handleSignIn} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Link href={"auth/sign-up"}>New here? Sign up</Link>
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

export default SignIn;
