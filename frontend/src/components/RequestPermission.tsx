import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  description: string;
  requestPermission: () => void;
};

const RequestPermission = ({
  title,
  description,
  requestPermission
}: Props) => {
  return (
    <View className="text-col p-5">
      <Text className="text-2xl">{title}</Text>
      <TouchableOpacity onPress={requestPermission}>
        <Text>{description}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestPermission;
