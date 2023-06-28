import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import { EnvelopeIcon } from 'react-native-heroicons/solid';
import { TailwindProvider } from 'tailwindcss-react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { CustomButton, CustomTextInput, KeyboardAvoidWrapper, MainContainer } from '../components';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found');
      } else {
        alert('There was a problem with your request');
      }
    }
  };

  return (
    <TailwindProvider>
      <MainContainer>
        <StatusBar style="dark" />
        <KeyboardAvoidWrapper>
          <View className="flex flex-row items-center justify-center gap-0 pt-[25%]">
            <Text className="text-3xl text-blue">Secure</Text>
            <Text className="text-3xl text-blue">App</Text>
          </View>
          <View className="flex flex-1 justify-center items-center pt-[50px] px-[25px]">
            <Text className="text-gray-800 text-md text-sm">Reset password</Text>
            <View className="h-[50px] w-full"></View>
            {submitted ? (
              <Text>Please check your email for a reset password link.</Text>
            ) : (
              <>
                <CustomTextInput
                  icon={<EnvelopeIcon color={'#1f2937'} width={18} height={18} />}
                  onChangeText={setEmail}
                  label="Email"
                  keyboardType={'email-address'}
                  placeholder="Enter your email"
                />
                <CustomButton
                  buttonText="Reset password"
                  buttonClassNames="w-full rounded-md p-3 bg-blue flex justify-center items-center mt-5"
                  textClassNames="text-white text-sm font-semibold"
                  onPress={resetUserPassword}
                />
              </>
            )}
          </View>
        </KeyboardAvoidWrapper>
      </MainContainer>
    </TailwindProvider>
  );
};

export default ResetPassword;
