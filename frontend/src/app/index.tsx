import { Text, View, Image } from "react-native";
import { useState } from "react";

const index = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View className="w-full h-full bg-green-600">
      <View className="absolute top-40 bottom-40 left-6 right-6 rounded-lg">
        <Image
          className="w-full h-full rounded-lg absolute z-0"
          source={require("@assets/images/logo.jpeg")}
        />
        <View className="w-full h-full absolute z-10 px-8 py-7 rounded-lg flex">
          <View className="bg-black/30 w-full h-full rounded-lg flex justify-between flex-col">
            <View className="p-4 opacity-100 flex-1">
              <Text className="text-2xl text-white">Log in</Text>
            </View>

            <View className="w-full  h-20 flex-[3]"></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;
