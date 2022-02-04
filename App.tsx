import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Navbar from './componants/Navbar';
import Grammar from "./pages/lessons/Grammer"
import {Provider} from "react-redux"
import {store} from "./logic/store"
import { useSelector } from './logic/store';
import Home from "./pages/Home"
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase.config";
import { db } from './firebase.config';





export default function App() {

  const postResult=async() => {
    const resultDatabase = db.collection('users');

    await resultDatabase.add({
      content:"suprise haha"
    })

}

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={styles.pages}>
          <StatusBar style="auto" />

          <Home/>
        </View>
      </View>

      <Navbar />
      

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:100,

    backgroundColor: '#fff',
    alignItems: 'center',

  },
  pages: {
    marginVertical:5,
    flexDirection:"row",
  }
});
