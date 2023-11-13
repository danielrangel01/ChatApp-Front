import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { IconButton, CloseIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../api";
import { useAuth } from "../../hooks";

const userController = new User();

export function CreateGroupScreen() {
  
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const { accessToken } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon={<CloseIcon />}
          padding={0}
          onPress={navigation.goBack}
        />
      ),
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getAll(accessToken);
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const nextStep = () => setStep((prevState) => prevState + 1);

  if (!usersResult) return null;

  return (
    <View>
      {step === 1 && (
        <Text style={{ color: "#fff" }}>Seleccionar usuarios del grupo</Text>
      )}
      {step === 2 && (
        <Text style={{ color: "#fff" }}>Añadir informacion del grupo</Text>
      )}
    </View>
  );
}
