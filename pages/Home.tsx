import { View, StyleSheet } from "react-native";
import { useSelector } from "../logic/store";
import Grammar from "./lessons/Grammer";
import Results from "./Results/Results";


function Home() {
    const page = useSelector(state => state.page)

    return ( <View style={styles.view}>
        {page.page==="Grammar"? <Grammar/>: null}
        {page.page==="Results"? <Results/> : null}
    </View> );
}

const styles = StyleSheet.create({
    view:{

    }

})

export default Home;