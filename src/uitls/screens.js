const auth = {
  authStartScreen: "AuthStartScreen",
  loginScreen: "LoginScreen",
  registerScreen: "RegisterScreen",
};
const global = {
  userProfileScreen: "UserProfileScreen",
  chatScreen: "ChatScreen",
  cameraScreen: "CameraScreen",
  imageFullscreen: "ImageFullscreen",
  groupScreen: "GroupScreen",
  groupProfileScreen: "GroupProfileScreen",
  addUserGroupScreen: "addUserGroupScreen,",
  changeNameGroupScreen: "ChangeNameGroupScreen",
};

const chats = {
  root: "ChatsRoot",
  chatsScreen: "ChatsScreen",
  createChatScreen: "CreateChatScreen",
};
const groups = {
  root: "GroupsRoot",
  groupScreen: "GroupScreen",
  createGroupScreen: "CreateGroupScreen",
};
const settings = {
  root: "SettingsRoot",
  settingsScreen: "SettingsScreen",
  changeFirstnameScreen: "ChangeFirstnameScreen",
  changeLastnameScreen: "ChangeLastnameScreen",
};

export const screens = {
    auth,
    global,
    tab: {
        root:"BottomTabRoot",
        chats,
        groups,
        settings
    }   
};
