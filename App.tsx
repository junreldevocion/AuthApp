import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Dashboard, Login, Register, ResetPassword } from './src/screens';

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Reset password" component={ResetPassword} />
          </>
        ) : (
          <Stack.Screen name="Dashboard" component={Dashboard} initialParams={{ user: JSON.stringify(user) }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
