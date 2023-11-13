import React from "react";
import { View, Text } from "react-native";
import { DateTime } from "luxon";
import { useAuth } from "../../../../hooks";
import { styled } from "./ItemText.styles";

export function ItemText(props) {
  const { message } = props;
  const { user } = useAuth();
  console.log(user);
  const isMe = user._id === message.user._id;
  const styles = styled(isMe);
  const createMessages = new Date(message.createdAt)

  return (
    <View style={styles.content}>
      <View style={styles.message}>
        <Text style={styles.text}>{message.message}</Text>
        <Text style={styles.date}>
            {DateTime.fromISO(createMessages.toISOString()).toFormat("HH:mm")}
        </Text>
      </View>
    </View>
  );
}
