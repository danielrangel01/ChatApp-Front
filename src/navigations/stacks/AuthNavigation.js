import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AuthStartScreen,
  LoginScreen,
  RegisterScreen,
} from "../../screens/Auth";

import { screens } from "../../uitls";
import { IconBack } from "../../components/Navigation";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...styles.stackNavigationStyles,
        headerLeft: IconBack,
      }}
    >
      <Stack.Screen
        name={screens.auth.authStartScreen}
        component={AuthStartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.auth.loginScreen}
        component={LoginScreen}
        options={{ title: "Iniciar Sesion" }}
      />

      <Stack.Screen
        name={screens.auth.registerScreen}
        component={RegisterScreen}
        options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
}
