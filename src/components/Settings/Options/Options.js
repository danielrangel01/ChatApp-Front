import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { User } from "../../../api";
import { imageExpoFormat } from "../../../uitls";
import { styles } from "./Options.styles";
import { screens } from "../../../uitls";

export function Options(props) {
  const { accessToken, logout, updateUser } = props;

  const navigation = useNavigation();

  const userController = new User();

  const opernGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const file = imageExpoFormat(result.assets[0].uri);
      updateUserData({ avatar: file });
    }
  };

  const updateUserData = async (userData) => {
    try {
      const response = await userController.updateUser(accessToken, userData);
      const { avatar } = response;
      updateUser("avatar", avatar);
      console.log(avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const goChangeFirstname = () => {
    navigation.navigate(screens.tab.settings.changeFirstnameScreen);
  };

  const goChangeLastname = () => {
    navigation.navigate(screens.tab.settings.changeLastnameScreen);
  };

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.item} onPress={opernGallery}>
        <Text style={styles.text}>Cambiar foto de perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={goChangeFirstname}>
        <Text style={styles.text}>Cambiar nombre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={goChangeLastname}>
        <Text style={styles.text}>Cambiar apellido</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.item, styles.itemClose]}
        onPress={logout}
      >
        <Text style={styles.textClose}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
}
