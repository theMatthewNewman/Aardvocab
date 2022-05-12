import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Navbar from './componants/Navbar/Navbar';
import {Provider} from "react-redux"
import {store} from "./logic/store"
import { useSelector } from './logic/store';
import Home from "./pages/Home"
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase.config";
import { db } from './firebase.config';





export default function App() {


  
  return (
    <Provider store={store}>
          <StatusBar style="auto" />
          <Home/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});
