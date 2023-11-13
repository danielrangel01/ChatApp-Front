import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SettingsScreen,
  ChangeFirstnameScreen,
  ChangeLastnameScreen,
} from "../../screens/Settings";
import { styles } from "../Styles.styles";
import { screens } from "../../uitls/screens";

const Stack = createNativeStackNavigator();

export function SettinsgNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...styles.stackNavigationStyles,
      }}
    >
      <Stack.Screen
        name={screens.tab.settings.settingsScreen}
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.tab.settings.changeFirstnameScreen}
        component={ChangeFirstnameScreen}
        options={{
          title: "Cambiar nombre",
          presentation: "modal",
          ...styles.modalStyles,
        }}
      />
      <Stack.Screen
        name={screens.tab.settings.changeLastnameScreen}
        component={ChangeLastnameScreen}
        options={{
          title: "Cambiar Apellido",
          presentation: "modal",
          ...styles.modalStyles,
        }}
      />
    </Stack.Navigator>
  );
}
