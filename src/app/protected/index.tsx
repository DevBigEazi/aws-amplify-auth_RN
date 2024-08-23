import { View, Text, StyleSheet } from "react-native";

const Protected = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>
        Hello, you are seeing this page because you are authenticated
      </Text>
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
