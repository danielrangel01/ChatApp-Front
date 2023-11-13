import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "native-base";
import { isEmpty } from "lodash";
import { DateTime } from "luxon";
import { ChatMessage, UnreadMessages, Chat } from "../../../../api";
import { ENV, screens, socket } from "../../../../uitls";
import { useAuth } from "../../../../hooks";
import { AlertConfirm } from "../../../shared";
import { styles } from "./Item.styles";

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();
const chatController = new Chat();

export function Item(props) {
  const { chat, onReload, upTopChat } = props;
  const { participant_one, participant_two } = chat;
  const { accessToken, user } = useAuth();
  const [lastMessage, setLastMessage] = useState(null);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const navigation = useNavigation()
  useEffect(() => {
    (async () => {
      try {
        const totalMessages = await chatMessageController.getTotal(
          accessToken,
          chat._id
        );

        const totalReadMessages =
          await unreadMessagesController.getTotalReadMessages(chat._id);
        console.log(totalMessages - totalReadMessages);
        setTotalUnreadMessages(totalMessages - totalReadMessages);
      } catch (error) {
        throw error;
      }
    })();
  }, [chat._id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await chatMessageController.getLastMessage(
          accessToken,
          chat._id
        );
        if (!isEmpty(response)) setLastMessage(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chat._id]);

  const userChat =
    user._id === participant_one._id ? participant_two : participant_one;

  const openCloseDelete = () => setShowDelete((prevState) => !prevState);

  const openChat = () => {
    setTotalUnreadMessages(0)
    navigation.navigate(screens.global.chatScreen, { chatId: chat._id })
  };

  const deleteChat = async () => {
    try {
      await chatController.remove(accessToken, chat._id);
      openCloseDelete();
      onReload();
    } catch (error) {}
  };

  useEffect(() => {
    socket.emit("subscribe", `${chat._id}_notify`);
    socket.on("message_notify", newMessage);
  }, []);

  const newMessage = async (newMessage) => {
    if (newMessage.chat === chat._id) {
      if (newMessage.user.id !== user._id) {
        upTopChat(newMessage.chat);
        setLastMessage(newMessage);

        const activeChatId = await AsyncStorage.getItem(ENV.ACTIVE_CHAT_ID);
        if (activeChatId !== newMessage.chat) {
          setTotalUnreadMessages((prevState) => prevState + 1);
        }
      }
    }
  };
  return (
    <>
      <TouchableOpacity
        style={styles.content}
        onPress={openChat}
        onLongPress={openCloseDelete}
      >
        <Avatar
          bg="cyan.500"
          size="lg"
          marginRight={3}
          style={styles.avatar}
          source={{
            uri: userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}`,
          }}
        >
          {userChat.email.substring(0, 2).toUpperCase()}
        </Avatar>
        <View style={styles.infoContent}>
          <View style={styles.info}>
            <Text style={styles.identity}>
              {userChat.firstname || userChat.lastname
                ? `${userChat.firstname || ""}${userChat.lastname || ""}`
                : userChat.email}
            </Text>
            <Text style={styles.message} numberOfLines={2}>
              {lastMessage?.message || ""}
            </Text>
          </View>

          <View style={styles.notify}>
            {lastMessage ? (
              <Text style={styles.time}>
                {DateTime.fromISO(
                  new Date(lastMessage.createdAt).toISOString()
                ).toFormat("HH:mm")}
              </Text>
            ) : null}
            {totalUnreadMessages > 0 ? (
              <View style={styles.totalUnreadContent}>
                <Text style={styles.totalUnread}>
                  {totalUnreadMessages < 99 ? totalUnreadMessages : "99+"}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <AlertConfirm
        show={showDelete}
        onClose={openCloseDelete}
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        title="Eliminar Chat"
        message={`Estas seguro de que quieres eliminar el chat con ${userChat.email} ?`}
        isDanger
      />
    </>
  );
}
