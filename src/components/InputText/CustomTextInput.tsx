import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { InputProps } from '../../../auth-app';
const CustomTextInput: React.FC<InputProps> = ({
  label,
  onChangeText,
  icon,
  IsSecureText,
  keyboardType,
  placeholder,
  value,
}) => {
  return (
    <View className="flex justify-start w-full mb-4">
      {label && <Text className="text-gray-800 mb-2 text-[13px]">{label}</Text>}
      <View className="w-full border-[1px] bg-gray-50 border-gray-400 rounded-md h-[57px] p-1 flex justify-center items-center flex-row ">
        {icon && <View className="flex items-center justify-center h-[38px] w-[32px]">{icon}</View>}
        <TextInput
          className="flex flex-1 bg-gray-50 text-lg text-gray-800 h-[50px] pl-1 text-sm"
          onChangeText={onChangeText}
          secureTextEntry={IsSecureText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={'#1f2937'}
          value={value}
        />
      </View>
    </View>
  );
};
export default CustomTextInput;
