import React from "react";
import { View, Text } from "react-native";
import { AppNavigation } from "./AppNavigation";
import { AuthNavigation } from "./stacks/AuthNavigation";
import { useAuth } from "../hooks";

export function HandlerNavigation() {
  const {user} = useAuth();

  return user ? <AppNavigation /> : <AuthNavigation />;
}
