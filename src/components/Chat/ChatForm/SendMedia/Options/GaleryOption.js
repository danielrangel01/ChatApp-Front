import React from "react";
import { Actionsheet, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ChatMessage } from "../../../../../api";
import { imageExpoFormat } from "../../../../../uitls";
import { styles } from "../SendMedia.styles";

const chatMessageController = new ChatMessage();

export function GaleryOption(props) {
  const { chatId, onClose, accessToken } = props;

  const openGalery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      sendImage(result.assets[0].uri);
    }
  };

  const sendImage = async (uri) => {
    try {
      const file = imageExpoFormat(uri);
      await chatMessageController.sendImage(accessToken, chatId, file);
      onClose()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Actionsheet.Item
      style={[styles.option, styles.optionEnd]}
      _text={styles.optionText}
      onPress={openGalery}
      startIcon={
        <Icon
          as={MaterialCommunityIcons}
          size="6"
          name="image"
          color="primary.500"
        />
      }
    >
      Galeria
    </Actionsheet.Item>
  );
}
