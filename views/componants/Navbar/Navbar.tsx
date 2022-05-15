import { Text, StyleSheet, View, Image, Pressable} from "react-native";
import Buttons from "../Buttons/Button";
import { NavbarStyles } from "./NavbarStyles";
import { useState } from 'react';

import { pageAction } from "../../../redux/pages";
import { useDispatch, useSelector } from "../../../redux/hooks";



function Navbar() {
    const dispatch = useDispatch()
    const page = useSelector(state => state.page)


    return ( 
        <>
        <View style={styles.background}>

            <Image style={styles.image} source={require('../../../images/logo.png')} />

            <Buttons onPress={() => {pageAction.changePage("Profile") (dispatch)}}
                     style={page.page==="Profile"? "NavSelected":"Nav"}
                     title="Profile"/>

            <Buttons onPress={() => {pageAction.changePage("Results") (dispatch)}}
                     style={page.page==="Results"? "NavSelected":"Nav"}
                     title="Results"/>
            
            <Buttons onPress={() => {pageAction.changePage("Lessons") (dispatch)}}
                     style={page.page==="Lessons"? "NavSelected":"Nav"}
                     title="Lessons"/>

        </View>
        </>
     );
}
const styles = StyleSheet.create({
    background: {
      flexDirection:"row-reverse",
      backgroundColor: 'white',
      borderBottomWidth:2,

      paddingTop:40,
      paddingBottom:5,

      width:'100%',

      justifyContent:"space-evenly",
      alignItems:"center",
      
    },
    image: {
        height:40,
        width:40,
    },
  });
  

export default Navbar;