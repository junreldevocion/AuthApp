import { View, Text, Pressable, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, UserCircleIcon } from 'react-native-heroicons/solid';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { TailwindProvider } from 'tailwindcss-react-native';
import { CustomButton, CustomTextInput, KeyboardAvoidWrapper, MainContainer } from '../components/Index';

const Register = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLasttName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createAccount = async () => {
    try {
      if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && confirmPassword !== '') {
        if (password === confirmPassword) {
          await createUserWithEmailAndPassword(auth, email, password);
          await addDoc(collection(db, 'users'), {
            firstName,
            lastName,
            email: email.toLowerCase(),
          });
        } else {
          alert("Password don't match");
        }
      } else {
        alert('empty fields');
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        alert('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('An account with this email already exists');
      } else if (error.code === 'auth/weak-password') {
        alert('Password required 6 characters');
      } else {
        alert('There was a problem with your request');
      }
    }
  };

  return (
    <TailwindProvider>
      <MainContainer>
        <KeyboardAvoidWrapper>
          <View className="flex flex-row items-center justify-center gap-0 pt-[25%]">
            <Text className="text-3xl text-gray-800">Secure</Text>
            <Text className="text-3xl text-blue">App</Text>
          </View>
          <View className="flex flex-1 justify-center items-center pt-[7%] px-[25px]">
            <Text className="text-gray-800 text-md">Enter your account details to register</Text>
            <View className="h-[30px] w-full"></View>
            <CustomTextInput
              icon={<UserCircleIcon color={'#1f2937'} width={18} height={18} />}
              value={firstName}
              onChangeText={setFirstName}
              label="First name"
              placeholder="Enter your first name"
            />

            <CustomTextInput
              icon={<UserCircleIcon color={'#1f2937'} width={18} height={18} />}
              value={lastName}
              onChangeText={setLasttName}
              label="Last name"
              placeholder="Enter your last name"
            />

            <CustomTextInput
              icon={<EnvelopeIcon color={'#1f2937'} width={18} height={18} />}
              value={email}
              onChangeText={setEmail}
              label="Email"
              keyboardType={'email-address'}
              placeholder="Enter your email"
            />
            <CustomTextInput
              icon={<LockClosedIcon color={'#1f2937'} width={18} height={18} />}
              value={password}
              onChangeText={setPassword}
              label="Password"
              IsSecureText={true}
              placeholder="* * * * * * * *"
            />
            <CustomTextInput
              icon={<LockClosedIcon color={'#1f2937'} width={18} height={18} />}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              label="Confirm Password"
              IsSecureText={true}
              placeholder="* * * * * * * *"
            />
            <CustomButton
              buttonText="Register"
              buttonClassNames="w-full rounded-md p-4 bg-blue flex justify-center items-center mt-5"
              textClassNames="text-gray-50 text-sm"
              onPress={createAccount}
            />

            <View className="flex w-full justify-end items-end pt-4">
              <Pressable onPress={() => {}}>
                <Text className="text-center text-gray-800 text-sm" onPress={() => navigation.navigate('Login')}>
                  Already have an account?
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidWrapper>
      </MainContainer>
    </TailwindProvider>
  );
};

export default Register;
