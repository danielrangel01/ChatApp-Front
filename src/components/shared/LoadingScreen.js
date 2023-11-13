import React from "react";
import { Spinner, VStack, Heading } from "native-base";
import { View } from "react-native";

export function LoadingScreen() {
  const app = {}
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner size="lg" />
      <Heading color="primary.500" fontSize="md" marginTop={2}>
        Cargando
      </Heading>
    </View>
  );
}
