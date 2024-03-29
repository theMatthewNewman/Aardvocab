
import {View, Text, TouchableHighlight, TextInput, StyleSheet} from "react-native";

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
import { pageAction } from "../../../redux/pages";
import { dataAction } from "../../../redux/data";

function Login() {
    const user = useSelector(state => state.user)
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const dispatch = useDispatch()



    const signIn = async() => {
        try{
            await signInWithEmailAndPassword(auth,email,password)
            if (auth.currentUser) {userAction.getUserFirebase(auth.currentUser.uid) (dispatch)}
            
        }
        catch(error:any){
            pageAction.updateMessage({active:true,type:'alert',message:error.toString()}) (dispatch)
        }

    }
    const example = async() => {
        try {
            userAction.updateUser(exam) (dispatch)
            await signInWithEmailAndPassword(auth,"example@example.com","example")
            
        }
        catch(error:any){
            pageAction.updateMessage({active:true,type:'alert',message:error.toString()}) (dispatch)
        }
    }

    

    return ( 
            <>
            {newUser? <Signup setNewUser={setNewUser}/>:
            <View>
        <View style={styles.container}>
            <Text>Email:</Text>
            <TextInput onChangeText={setEmail} style={textInput.form}/>
            <Text>Password:</Text>
            <TextInput onChangeText={setPassword} style={textInput.form}/>
            <View style={{flexDirection:'row'}}>
            <TouchableHighlight onPress={() => {signIn()}} style={buttons.strong}><Text style={{color:'white'}}>Sign in</Text></TouchableHighlight>
            
            <TouchableHighlight onPress={() => {setNewUser(true)}} style={buttons.strong}><Text style={{color:'white'}}>New User</Text></TouchableHighlight>
            </View>
            </View>
            <TouchableHighlight onPress={() => {example()}} style={buttons.example}><Text style={{color:'black',fontSize:size.large,textAlign:'center'}}>Example</Text></TouchableHighlight>
            
        </View>}
        
        </>
     );
}

export default Login;

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