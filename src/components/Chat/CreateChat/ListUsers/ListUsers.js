import { ScrollView, view, Text, TouchableOpacity } from "react-native";
import { Avatar, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { styles } from "./ListUsers.styles";
import { ENV } from "../../../../uitls";
import { Chat } from "../../../../api";
import { useAuth } from "../../../../hooks";

const chatController = new Chat();

export function ListUsers(props) {
  const { users } = props;
  const auth = useAuth();
  const navigation = useNavigation();

  const createChat = async (user) => {
    try {
      await chatController.create(auth.accessToken, auth.user._id, user._id);
      navigation.goBack();
    } catch (error) {
      throw error;
    }
  };

  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {map(users, (user) => (
        <TouchableOpacity
          key={user._id}
          style={styles.item}
          onPress={() => createChat(user)}
        >
          <Avatar
            bg="cyan.500"
            marginRight={3}
            source={{ uri: user.avatar && `${ENV.BASE_PATH}/${user.avatar}` }}
          >
            {user.email.substring(0, 2).toUpperCase()}
          </Avatar>
          <View>
            <Text style={styles.name}>
              {user.firstname || user.lastname
                ? `${user.firstname || ""} ${user.lastname || ""}`
                : "...."}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
