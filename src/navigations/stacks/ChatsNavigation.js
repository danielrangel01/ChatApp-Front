import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateChatScreen, ChatsScreen } from "../../screens/Chats";
import { screens } from "../../uitls";
import { styles } from "./../Styles.styles";

const Stack = createNativeStackNavigator();

export function ChatsNavigation() {
  return (
    <Stack.Navigator screenOptions={{ ...styles.stackNavigationStyles }}>
      <Stack.Screen
        name={screens.tab.chats.chatsScreen}
        component={ChatsScreen}
        options={{
          title: "Chats",
        }}
      />
      <Stack.Screen
        name={screens.tab.chats.createChatScreen}
        component={CreateChatScreen}
        options={{
          title: "Nuevo Chat",
          presentation: "modal",
          ...styles.modalStyles,
        }}
      />
    </Stack.Navigator>
  );
}
