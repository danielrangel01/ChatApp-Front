import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { screens } from "../../uitls";

export function GroupsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<AddIcon />}
          padding={0}
          onPress={() =>
            navigation.navigate(screens.tab.groups.createGroupScreen)
          }
        />
      ),
    });
  }, []);
  return (
    <View>
      <Text>GroupsScreen</Text>
    </View>
  );
}
