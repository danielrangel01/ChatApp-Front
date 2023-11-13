import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GroupsScreen, CreateGroupScreen } from "../../screens/Groups";
import { styles } from "../Styles.styles";
import { screens } from "../../uitls";

const Stack = createNativeStackNavigator();

export function GroupsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...styles.stackNavigationStyles,
      }}
    >
      <Stack.Screen
        name={screens.tab.groups.groupScreen}
        component={GroupsScreen}
        options={{
          title: "Grupos",
        }}
      />

      <Stack.Screen
        name={screens.tab.groups.createGroupScreen}
        component={CreateGroupScreen}
        options={{
          title: "Crear Grupo",
          presentation: "modal",
          ...styles.modalStyles,
        }}
      />
    </Stack.Navigator>
  );
}
