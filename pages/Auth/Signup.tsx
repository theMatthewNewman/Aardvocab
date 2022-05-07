import { View, TextInput, Pressable, Text} from "react-native";
import {useState} from "react";
import {useDispatch} from "../../logic/store"

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase.config";
import { createUserLogic } from "../../logic/userHandler/logic";
import * as Umiddleware from "../../logic/userHandler/middleware";

//styles
import {styles} from "./LoginStyles"
import {globalStyling, buttons, textInput} from "../../componants/globalStyle";

function Signup({setNewUser}:any) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()

    const submitNewUser = async() => {

        await createUserWithEmailAndPassword(auth,email,password)
        .catch((error) => {
            console.log(error)
        });
        await signInWithEmailAndPassword(auth, email, password);
        if (auth.currentUser){
            const Ustate = createUserLogic(auth.currentUser, username)
            console.log(Ustate)
            Umiddleware.setUserObjectOnDatabase(Ustate)
            Umiddleware.getUserFromDatabase(Ustate.uid) (dispatch)
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