import { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function Index() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const toggleSwitch = () => {
    if (isPending) return;

    const newState = !isEnabled;
    setIsEnabled(newState);

    setIsPending(true);
    fetch(newState ? "http://localhost:3000/ON" : "http://localhost:3000/OFF")
      .catch((err) => console.error(err))
      .finally(() => setIsPending(false));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>RED LIGHT</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        disabled={isPending}
      />
    </View>
  );
}
