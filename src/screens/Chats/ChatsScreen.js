import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { Chat } from "../../api";
import { useAuth } from "../../hooks";
import { screens } from "../../uitls";
import { size } from "lodash";
import { LoadingScreen } from "../../components/shared";
import { ListChat, Search } from "../../components/Chat";

const chatController = new Chat();

export function ChatsScreen() {
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const [chats, setChats] = useState(null);
  const [chatsResult, setChatsResult] = useState(null);
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<AddIcon />}
          padding={0}
          onPress={() =>
            navigation.navigate(screens.tab.chats.createChatScreen)
          }
        />
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await chatController.getall(accessToken);
          const result = response.sort((a, b) => {
            return (
              new Date(b.last_message_date) - new Date(a.last_message_date)
            );
          });
          setChats(result);
          setChatsResult(response);
        } catch (error) {
          throw error;
        }
      })();
    }, [reload])
  );

  const upTopChat = (chatId) => {
    const data = chatsResult;
    const formIndex = data.map((chat) => chat._id).indexOf(chatId);
    const toIndex = 0;

    const element = data.splice(formIndex, 1)[0];

    data.splice(toIndex, 0, element);

    setChats([...data]);
  };
  if (!chatsResult) return <LoadingScreen />;
  return (
    <View>
      {size(chats) > 0 && <Search data={chats} setData={setChatsResult} />}
      <ListChat
        chats={size(chats) === size(chatsResult) ? chats : chatsResult}
        onReload={onReload}
        upTopChat={upTopChat}
      />
    </View>
  );
}
