import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { signOut, updateEmail, updatePassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { EnvelopeIcon, LockClosedIcon, UserCircleIcon } from 'react-native-heroicons/solid';
import { doc, updateDoc } from 'firebase/firestore';
import CustomTextInput from '../InputText/CustomTextInput';
import CustomButton from '../Buttons/CustomButton';

interface IProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const DashboardCard: React.FC<IProps> = (user) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLasttName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const updateForm = doc(db, 'users', user.id);
    try {
      await updateEmail(auth.currentUser, email);
      await updatePassword(auth.currentUser, password);
      await updateDoc(updateForm, {
        firstName,
        lastName,
        email: email.toLowerCase(),
      });
      alert('Succefully update!');
      setIsUpdate((prev) => !prev);
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        alert('Your email was incorrect');
      } else if (error.code === 'auth/weak-password') {
        alert('Password required 6 characters');
      } else {
        alert('There was a problem with your request');
      }
    }
  };

  const handleUpdateFields = () => {
    if (user) {
      setFirstName(firstName || user.firstName);
      setLasttName(lastName || user.lastName);
      setEmail(email || user.email);
    }
    setIsUpdate((prev) => !prev);
  };

  return (
    <View className="bg-gray-50 rounded-md min-h-[150px] mx-[20px] my-[10px] py-[10px] px-[20px] shadow-lg">
      <Text className="text-gray-800 text-lg">{isUpdate ? 'Update' : 'Settings'}</Text>
      <View className="flex-row justify-between">
        {isUpdate && (
          <View className="w-full mt-8">
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
              IsSecureText={true}
              label="Password"
              placeholder="Enter your passowrd"
            />
            <View className="flex flex-row justify-center items-center">
              <CustomButton
                buttonText="Update"
                buttonClassNames="rounded-md p-3 bg-blue flex justify-center items-center mr-4 flex-1"
                textClassNames="text-gray-50 text-sm"
                onPress={handleUpdate}
              />
              <CustomButton
                buttonText="Cancel"
                buttonClassNames="rounded-md p-3 bg-transparent border-[1px] border-blue border-solid flex justify-center items-center flex-1"
                textClassNames="text-gray-800 text-sm"
                onPress={() => setIsUpdate((prev) => !prev)}
              />
            </View>
          </View>
        )}
        {!isUpdate && (
          <View className="w-full flex flex-row justify-center items-start pt-[20px]">
            <CustomButton
              buttonText="Edit"
              buttonClassNames="rounded-md p-3 bg-blue flex justify-center items-center mr-4 flex-1"
              textClassNames="text-gray-50 text-sm"
              onPress={handleUpdateFields}
            />
            <CustomButton
              buttonText="Logout"
              buttonClassNames="rounded-md p-3 bg-gray-50 flex flex-1 justify-center items-center border-[1px] border-blue border-solid"
              textClassNames="text-gray-800 text-sm"
              onPress={logout}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default DashboardCard;
