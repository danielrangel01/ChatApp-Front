import AsyncStorage from "@react-native-async-storage/async-storage";

export class UnreadMessages{
    async getTotalReadMessages(chatId) {
        const response = await AsyncStorage.getItem(`${chatId}_read`) 
        return response
    }

    async setTotalReadMessages(chatId, total){
        await AsyncStorage.setItem(`${chatId}_read`, JSON.stringify(total))
    }
}