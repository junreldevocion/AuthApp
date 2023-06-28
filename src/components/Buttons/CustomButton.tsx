import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { CustomButtonProps } from '../../../auth-app';

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, buttonClassNames, textClassNames, buttonText }) => {
  return (
    <View className={`${buttonClassNames}`}>
      <Pressable onPress={onPress} className="w-full justify-center items-center">
        <Text className={`${textClassNames}`}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};
export default CustomButton;
