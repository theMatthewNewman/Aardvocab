import { Platform } from "react-native";
import {View, Text, Pressable, TextInput} from "react-native";

import {useState, useEffect} from "react";
import {useDispatch} from "../../logic/store";

//authentication
import { GoogleSignin, GoogleSigninButton, statusCodes} from "react-native-google-signin";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Umiddleware from "../../logic/userHandler/middleware"

//styling
import {styles} from "./LoginStyles";
import { globalStyling, textInput, buttons } from "../../componants/globalStyle";

import Signup from "./Signup";

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    const dispatch = useDispatch()

    const signIn = async() => {
        await signInWithEmailAndPassword(auth,email,password)
        if (auth.currentUser) Umiddleware.getUserFromDatabase(auth.currentUser.uid) (dispatch)
    }
    

    return ( 
            <>
            {newUser? <Signup setNewUser={setNewUser}/>:
        <View style={styles.container}>
            <Text>Email:</Text>
            <TextInput onChangeText={setEmail} style={textInput.form}/>
            <Text>Password:</Text>
            <TextInput onChangeText={setPassword} style={textInput.form}/>
            <View style={{flexDirection:'row'}}>
            <Pressable onPress={() => {signIn()}} style={buttons.strong}><Text style={{color:'white'}}>Sign in</Text></Pressable>
            <Pressable onPress={() => {setNewUser(true)}} style={buttons.strong}><Text style={{color:'white'}}>New User</Text></Pressable>
            </View>
        </View>}
        </>
     );
}

export default Login;