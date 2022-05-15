import { View } from "react-native";

type progressType = {
    progress:number
}

function ProgressBar({progress}:progressType) {
    return ( 
    <View style={{
        margin:10,
        backgroundColor:'lightgray',
        height:10,
        borderRadius:5,}}>

        <View style={{
            height:10,
            backgroundColor:'#3c427c',
            width:`${progress}%`,
            borderRadius:5,}}>
        </View>
    </View>
     );
}

export default ProgressBar;