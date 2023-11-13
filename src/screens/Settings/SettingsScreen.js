import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "native-base";
import { useAuth } from "../../hooks";
import { UserInfo, Options } from "../../components/Settings";

export function SettingsScreen() {
  const { user, accessToken, logout, updateUser } = useAuth();
  return (
    <SafeAreaView>
      <UserInfo user={user} />
      <Options  accessToken={accessToken} logout={logout} updateUser={updateUser} />
    </SafeAreaView>
  );
}
