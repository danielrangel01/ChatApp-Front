import { useState, useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import { View } from "native-base";
import { HeaderChat } from "../../components/Navigation";
import { LoadingScreen } from "../../components/shared";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatMessage, UnreadMessages } from "../../api";
import { ListMessages, ChatForm } from "../../components/Chat";
import { ENV, socket } from "../../uitls";
import { size } from "lodash";

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export function ChatScreen() {
  const {
    params: { chatId },
  } = useRoute();
  const { accessToken } = useAuth();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID, chatId);
    })();

    return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID);
    };
  }, [chatId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await chatMessageController.getAll(
          accessToken,
          chatId
        );
        setMessages(response.messages);
        unreadMessagesController.setTotalReadMessages(chatId, response.total);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      unreadMessagesController.setTotalReadMessages(chatId, size(messages));
    };
  }, [chatId]);

  useEffect(() => {
    socket.emit("subscribe", chatId);
    socket.on("message", newMessage);

    return () => {
      socket.emit("unsubscribe", chatId);
      socket.off("message", newMessage);
    };
  }, [chatId, messages]);

  const newMessage = (msg) => {
    setMessages([...messages, msg]);
  };

  return (
    <>
       <HeaderChat chatId={chatId} /> 
      {!messages ? (
        <LoadingScreen />
      ) : (
        <View flex>
          <ListMessages messages={messages} />
          <ChatForm chatId={chatId} /> 
        </View>
      )}
    </>
  );
}
