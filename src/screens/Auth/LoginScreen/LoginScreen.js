import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../uitls";
import {LoginForm} from "../../../components/Auth"
import { styles } from "./LoginScreen.styles";


export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screens.auth.registerScreen);
  };
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Entra y empieza a chatear</Text>

      <LoginForm  />

      <Text style={styles.register} onPress={goToRegister}>
        Registrarse
      </Text>
      <Text style={styles.info}>
        Debes de tener al menos 16 años de edad para registarte. Mas informacion
        sobre como trabaja ChatApp en las politicas.
      </Text>
    </View>
  );
}
