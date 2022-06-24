import { View, TextInput, TouchableHighlight, Text, StyleSheet} from "react-native";
import {useState} from "react";
import {useDispatch} from "../../../redux/hooks"

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../../firebase.config";
import { userAction } from "../../../redux/user";
import * as Keychain from 'react-native-keychain';

//styles
import { buttons, textInput, size} from "../../componants/globalStyle";
import { pageAction } from "../../../redux/pages";

function Signup({setNewUser}:any) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()



    const submitNewUser = async() => {
        try {
            if (password!==passwordVerify){
                pageAction.updateMessage({active:true,type:'alert',message:"ERROR passwords don't match."}) (dispatch)
                return;
            }
            await createUserWithEmailAndPassword(auth,email,password);
            await signInWithEmailAndPassword(auth, email, password);
            if (auth.currentUser){
                userAction.newUser(auth.currentUser, username) (dispatch)
            }
        } 
        catch(error:any){
            pageAction.updateMessage({active:true,type:'alert',message:error.toString()}) (dispatch)
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
                    <TouchableHighlight onPress={() => {submitNewUser()}} style={buttons.strong}>
                        <Text style={{color:'white'}}>Create New User</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {setNewUser(false)}} style={buttons.strong}>
                        <Text style={{color:'white'}}>Back to Sign in</Text>
                    </TouchableHighlight>
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