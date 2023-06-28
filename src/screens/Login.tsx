import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import MainContainer from '../components/Container/MainContainer';
import KeyboardAvoidWrapper from '../components/Container/KeyboardAvoidWrapper';
import CustomTextInput from '../components/InputText/CustomTextInput';

import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/solid';
import CustomButton from '../components/Buttons/CustomButton';
import { TailwindProvider } from 'tailwindcss-react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        alert('Empty fields');
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        alert('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('An account with this email already exists');
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
            <Text className="text-gray-800 text-md text-sm">Enter your account credentials</Text>
            <View className="h-[50px] w-full"></View>
            <CustomTextInput
              icon={<EnvelopeIcon color={'#1f2937'} width={18} height={18} />}
              onChangeText={setEmail}
              label="Email"
              keyboardType={'email-address'}
              placeholder="Enter your email"
            />
            <CustomTextInput
              icon={<LockClosedIcon color={'#1f2937'} width={18} height={18} />}
              onChangeText={setPassword}
              label="Password"
              IsSecureText={true}
              keyboardType="default"
              placeholder="* * * * * * * *"
            />
            <CustomButton
              buttonText="Login"
              buttonClassNames="w-full rounded-md p-4 bg-blue flex justify-center items-center mt-5"
              textClassNames="text-white text-sm"
              onPress={loginUser}
            />
            <CustomButton
              buttonText="Register"
              buttonClassNames="w-full rounded-md p-4 bg-transparent flex justify-center items-center mt-3 border-[1px] border-blue border-solid"
              textClassNames="text-gray-800 text-sm"
              onPress={() => navigation.navigate('Register')}
            />
            <View className="flex w-full justify-end items-end pt-4">
              <Pressable onPress={() => {}}>
                <Text
                  className="text-center text-gray-800 text-sm"
                  onPress={() => navigation.navigate('Reset password')}
                >
                  Forgot your password?
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidWrapper>
      </MainContainer>
    </TailwindProvider>
  );
};

export default Login;
