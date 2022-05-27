import { View, TextInput, Pressable, Text, StyleSheet} from "react-native";
import {useState} from "react";
import {useDispatch} from "../../../redux/hooks"

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../../firebase.config";
import { userAction } from "../../../redux/user";
import * as Keychain from 'react-native-keychain';

//styles
import { buttons, textInput, size} from "../../componants/globalStyle";

function Signup({setNewUser}:any) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()



    const submitNewUser = async() => {

        await createUserWithEmailAndPassword(auth,email,password);
        await signInWithEmailAndPassword(auth, email, password);
        if (auth.currentUser){
            userAction.newUser(auth.currentUser, username) (dispatch)
        }
    }


    return ( 
            <View style={styles.container}>
                <Text>Email:</Text>
                <TextInput onChangeText={setEmail} style={textInput.form}/>
                <Text>Username:</Text>
                <TextInput onChangeText={setUsername} style={textInput.form}/>
                <Text>Password:</Text>
                <TextInput onChangeText={setPassword} style={textInput.form}/>
                <Text>Re-enter Password:</Text>
                <TextInput onChangeText={setPasswordVerify} style={textInput.form}/>
                <View style={{flexDirection:'row'}}>
                    <Pressable onPress={() => {submitNewUser()}} style={buttons.strong}>
                        <Text style={{color:'white'}}>Create New User</Text>
                    </Pressable>
                    <Pressable onPress={() => {setNewUser(false)}} style={buttons.strong}>
                        <Text style={{color:'white'}}>Back to Sign in</Text>
                    </Pressable>
                </View>
            </View>
    );
}

export default Signup;

export const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        margin:size.small,
        padding:size.small,
        borderRadius:size.small,
        borderWidth:size.thin,

    },
    textInput:{
        
    }
})