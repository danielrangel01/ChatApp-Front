import { View, Text, SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../uitls";
import { assets } from "../../../assets";
import { styles } from "./AuthStartScreen.styles";

export function AuthStartScreen() {
  
  const navigation = useNavigation();

  const goToLogin = () =>{
    navigation.navigate(screens.auth.loginScreen)
  }

  return (
    <SafeAreaView style={styles.content}>
      <Image source={assets.image.jpg.auth01} style={styles.img} />
      <View>
        <Text style={styles.title}>Te damos la bienvenida a chatapp</Text>
        <Text style={styles.description}>
          Recomendamos usar este servicio con resposabilidad para disfrutar de
          la experiencia que propociona esta app
        </Text>
        <Text style={styles.description}>
          consulta nuestras Politicas de privacidad. Pulsa "Aceptar y continuar"
          para aceptar las condiciones del servicio
        </Text>
        <Text style={styles.btn} onPress={goToLogin}>Aceptar y continuar</Text>
      </View>
    </SafeAreaView>
  );
}
