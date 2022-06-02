
import {View, Text, Pressable, TextInput, StyleSheet} from "react-native";

import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "../../../redux/hooks";

//authentication
import { auth } from "../../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userAction } from "../../../redux/user";
import { exam } from "../../../redux/user/reducers";

//styling
import {size} from "../../componants/globalStyle"
import { textInput, buttons } from "../../componants/globalStyle";



import Signup from "./Signup";

function Login() {
    const user = useSelector(state => state.user)
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const dispatch = useDispatch()



    const signIn = async() => {
        await signInWithEmailAndPassword(auth,email,password)
        if (auth.currentUser) {userAction.getUserFirebase(auth.currentUser.uid) (dispatch)}
        else{ console.log("Sorry Incorrect UserName or Password")}

    }
    const example = async() => {
        userAction.updateUser(exam) (dispatch)
        await signInWithEmailAndPassword(auth,"example@example.com","example")
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
            <Pressable onPress={() => {example()}} style={buttons.strong}><Text style={{color:'white'}}>Try Example</Text></Pressable>
            <Pressable onPress={() => {setNewUser(true)}} style={buttons.strong}><Text style={{color:'white'}}>New User</Text></Pressable>
            </View>
        </View>}
        </>
     );
}

export default Login;

const styles=StyleSheet.create({
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