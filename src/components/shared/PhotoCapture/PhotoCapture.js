import { useState } from "react";
import { View } from "react-native";
import { IconButton, Icon, CloseIcon, Image, Spinner } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ChatMessage } from "../../../api";
import { useAuth } from "../../../hooks";
import { imageExpoFormat } from "../../../uitls";
import { styles } from "./PhotoCapture.styles";

const chatMessageController = new ChatMessage();

export function PhotoCapture(props) {
  const { photo, type, id } = props;
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [loading, setloading] = useState(false);

  const sendMedia = async () => {
    try {
      setloading(true);
      const file = imageExpoFormat(photo.uri);
      if (type === "chat") {
        await chatMessageController.sendImage(accessToken, id, file);
      }
      //TODO: AÑADIR ENVIO EN IMAGENES A LOS GRUPOSS
      setTimeout(() => {
        setloading(false);
        navigation.goBack();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Image source={{ uri: photo.uri }} alt="photo" style={styles.photo} />
      <View style={styles.topActions}>
        <IconButton icon={null} />
        <IconButton
          onPress={navigation.goBack}
          icon={<CloseIcon style={styles.icon} size="8" />}
        />
        <IconButton icon={null} />
      </View>
      <View style={styles.bottomActions}>
        <IconButton icon={null} />
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <IconButton
            onPress={sendMedia}
            icon={
              <Icon
                as={MaterialCommunityIcons}
                size="20"
                name="check-circle-outline"
                style={styles.icon}
              />
            }
          />
        )}
        <IconButton icon={null} />
      </View>
    </View>
  );
}
