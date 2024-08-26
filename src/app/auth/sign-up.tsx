import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { signUp } from "aws-amplify/auth";
import { Link, router } from "expo-router";
import { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    try {
      const { userId, nextStep } = await signUp({
        username: form.email,
        password: form.password,
        options: {
          userAttributes: {
            email: form.email,
          },
          autoSignIn: true,
        },
      });

      console.log(userId);

      if (nextStep.signUpStep === "CONFIRM_SIGN_UP")
        return router.push({
          pathname: "/auth/verify-email",
          params: { email: form.email },
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

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

      <Button title="Sign up" onPress={handleSignUp} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Link href={"/auth/sign-in"}>Have an account? Sign in</Link>
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

export default SignUp;
