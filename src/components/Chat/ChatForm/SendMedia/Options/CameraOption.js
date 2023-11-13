import React from "react";
import { View, Text } from "react-native";
import { Actionsheet, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../../../uitls";
import { styles } from "../SendMedia.styles";

export function CameraOption(props) {
  const { onClose, chatId } = props;
  const navigation = useNavigation();

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== "granted") {
      console.error("Camera permission denied");
    } else {
      onClose();
      navigation.navigate(screens.global.cameraScreen, {
        type: "chat",
        id: chatId,
      });
    }
  };

  return (
    <Actionsheet.Item
      style={[styles.option, styles.optionStart]}
      _text={styles.optionText}
      onPress={openCamera}
      startIcon={
        <Icon
          as={MaterialCommunityIcons}
          size="6"
          name="camera"
          color="primary.500"
        />
      }
    >
      Camara
    </Actionsheet.Item>
  );
}
