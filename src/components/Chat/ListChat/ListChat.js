import React from "react";
import { View, Text, ScrollView } from "react-native";
import { map, size } from "lodash";
import { styles } from "./ListChat.styles";
import { Item } from "./item";

export function ListChat(props) {
  const { chats, onReload, upTopChat} = props;
  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={styles.content}>
        {size(chats) === 0 ? (
          <Text style={styles.noChats}>
            No tienes ningun chat, dale al (+) y empieza una nueva conversancion
          </Text>
        ) : null}
        {map(chats, (chat) => (
          <Item key={chat._id} chat={chat} onReload={onReload} upTopChat={upTopChat} />
        ))}
      </View>
    </ScrollView>
  );
}
