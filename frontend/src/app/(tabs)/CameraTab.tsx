import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import RequestPermission from "@/components/RequestPermission";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraTab() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera | null>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <RequestPermission
        title="Camera Permission"
        description="Request permission by clicking this"
        requestPermission={requestPermission}
      />
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const onTakePicture = async () => {
    if (camera != null) {
      const pictureTaken = await camera.takePictureAsync();
      setPicture(pictureTaken);
    }
  };

  const processImage = async () => {
    //send picture to the backend and display it
  };

  return (
    <View className="w-full h-full flex flex-col">
      <Camera
        className="flex-[8] "
        type={type}
        ref={(ref) => setCamera(ref)}
      />

      <View className="w-full flex-1 bg-slate-700 justify-center items-center">
        <View className="flex flex-row items-center justify-center gap-10 ">
          <Pressable
            className="aspect-square bg-black rounded-full p-6 flex items-center justify-center"
            onPress={processImage}
          >
            {picture === null ? null : (
              <SafeAreaView>
                <Image
                  source={{ uri: "data:image/jpg;base64," + picture.base64 }}
                />
              </SafeAreaView>
            )}
          </Pressable>

          <Pressable
            className=" rounded-full aspect-square bg-white flex justify-center items-center p-1"
            onPress={onTakePicture}
          >
            <FontAwesome
              name="circle-o"
              size={50}
              color={"#808080"}
            />
          </Pressable>

          <Pressable
            className="rounded-full aspect-square active:opacity-50"
            onPress={toggleCameraType}
          >
            <FontAwesome
              name="rotate-right"
              size={30}
              color={"#FFFFFF"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
