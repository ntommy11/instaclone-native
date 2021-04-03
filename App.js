import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import client from './components/auth/apollo';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    // 폰트 로딩
    const fontsToLoad = [Ionicons.font]
    const fontPromises = fontsToLoad.map(font=>Font.loadAsync(font));
    console.log(fontPromises);

    // 이미지 로딩
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map(image=>Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  }
  if(loading){
    return <AppLoading
      startAsync ={preload}
      onError={console.warn}
      onFinish={onFinish}
      />;
  }
  console.log(`color scheme: ${Appearance.getColorScheme()}`);

  const subscription = Appearance.addChangeListener(({colorScheme})=>{
    console.log(colorScheme);  
  })
  return (
    <AppearanceProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer>
          <LoggedOutNav/>
        </NavigationContainer>
      </AppearanceProvider>
    </AppearanceProvider>


  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
