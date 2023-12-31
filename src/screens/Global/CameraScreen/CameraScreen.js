import React, { useState, useRef } from "react";
import { View } from "react-native";
import { IconButton, CloseIcon, Icon } from "native-base";
import { Camera, FlashMode, CameraType } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PhotoCapture } from "../../../components/shared";
import { styles } from "./CameraScreen.styles";

export function CameraScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [photo, setphoto] = useState(null);
  const [flashOn, setflashOn] = useState(false);
  const [cameraBack, setcameraBack] = useState(true);
  const cameraRef = useRef();

  const onClose = () => {
    navigation.goBack();
  };

  const onOffFlash = () => setflashOn((prevState) => !prevState);

  const changeTypeCamera = () => setcameraBack((prevState) => !prevState);

  const capturePhoto = async () => {
    const options = { quality: 1 };
    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setphoto(newPhoto);
  };

  if (photo) {
    return <PhotoCapture photo={photo} type={params.type} id={params.id} />;
  }

  return (
    <Camera
      ref={cameraRef}
      style={styles.container}
      flashMode={flashOn ? FlashMode.torch : FlashMode.off}
      type={cameraBack ? CameraType.back : CameraType.front}
    >
      <View style={styles.topActions}>
        <IconButton
          icon={<CloseIcon style={styles.icon} />}
          onPress={onClose}
        />
        <IconButton
          onPress={onOffFlash}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name={flashOn ? "flash" : "flash-off"}
              style={styles.icon}
            />
          }
        />
      </View>
      <View style={styles.bottomActions}>
        <IconButton icon={null} />
        <IconButton
          onPress={capturePhoto}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="20"
              name="circle-outline"
              style={styles.icon}
            />
          }
        />
        <IconButton
          onPress={changeTypeCamera}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="8"
              name="camera-flip"
              style={styles.icon}
            />
          }
        />
      </View>
    </Camera>
  );
}
