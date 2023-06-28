import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { UserIcon } from 'react-native-heroicons/solid';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { TailwindProvider } from 'tailwindcss-react-native';
import { DashboardCard, KeyboardAvoidWrapper, MainContainer } from '../components';

export interface TUsers {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const Dashboard = ({ route }: any) => {
  const [fullName, setFullName] = useState('');
  const [user, setuser] = useState<TUsers>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  useEffect(() => {
    const userParams = JSON.parse(route.params.user);
    const q = query(collection(db, 'users'), where('email', '==', userParams.email.toLowerCase()));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc: any) => {
        setFullName(`${doc.data().lastName}, ${doc.data().firstName}`);
        const docData = doc.data();
        setuser(Object.assign(docData, { id: doc.id }));
      });
    });
    return () => unsub();
  }, []);

  return (
    <TailwindProvider>
      <MainContainer>
        <KeyboardAvoidWrapper>
          <StatusBar style="dark" />
          <View className="h-[55px] z-20 mt-8 flex flex-row justify-between items-center px-4">
            <View className="flex flex-row gap-4 justify-center items-center">
              <Text className="text-white text-xl">Dashboard</Text>
            </View>
            <View className="w-[40px] h-[40px] bg-gray-50 justify-center items-center rounded-full">
              <UserIcon color="#1f2937" />
            </View>
          </View>
          <View className="w-full bg-blue h-[62%] rounded-[20px] absolute" />
          <Text className="text-white mt-[20px] mb-[20px] text-sm text-bold ml-[20px]  z-10">
            <Text className="text-gray-50 text-md">Hello {fullName}</Text>
          </Text>
          <DashboardCard id={user.id} lastName={user.lastName} firstName={user.firstName} email={user.email} />
        </KeyboardAvoidWrapper>
      </MainContainer>
    </TailwindProvider>
  );
};

export default Dashboard;
