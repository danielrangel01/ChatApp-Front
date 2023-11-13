import React from "react";
import { View, Text } from "react-native";
import { Input, Backdrop, Button } from "native-base";
import { useFormik } from "formik";
import { auth } from "../../../api";
import { useAuth } from "../../../hooks";
import { initialValues, validationSchema } from "./LoginForm.form";
import { styles } from "./LoginForm.styles";

const authController = new auth();

export function LoginForm() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(
          formValue.email,
          formValue.password
        );
        const { access, refresh } = response;

        await authController.setAcessToken(access);
        await authController.setRefreshToken(refresh);

        await login(access);
      } catch (error) {}
    },
  });
  return (
    <View>
      <View style={styles.viewInput}>
        <Input
          placeholder="Correo electronico"
          variant="unstyled"
          value={formik.values.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          style={[styles.input, formik.errors.email && styles.inputError]}
        />
      </View>
      <Input
        placeholder="Contraseña"
        variant="unstyled"
        secureTextEntry
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        style={[styles.input, formik.errors.password && styles.inputError]}
      />
      <Button
        style={styles.btn}
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      >
        Entrar
      </Button>
    </View>
  );
}
