import React from "react";
import { View } from "react-native";
import { Input, Button } from "native-base";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { initialValues, validationSchema } from "./ChangeLastname.form";
import { styles } from "./ChangeLastname.styles";

const userController = new User();

export function ChangeLastnameScreen() {
  const navigation = useNavigation();
  const { accessToken, updateUser } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const dataUser = { lastname: formValue.lastname };
        await userController.updateUser(accessToken, dataUser);
        updateUser("lastname", formValue.lastname);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <View>
      <Input
        placeholder="Apellido"
        variant="unstyled"
        autoFocus
        value={formik.values.lastname}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        style={[styles.input, formik.errors.firstname && styles.inputError]}
      />
      <Button
        style={styles.btn}
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      >
        Cambiar
      </Button>
    </View>
  );
}
