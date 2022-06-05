import { Text,  Image, ScrollView} from "react-native";
import DaysGraph from "./graphs/DaysGraph";
import LessonGraph from "./graphs/LessonGraph";
import { useEffect } from "react";
import { dataAction } from "../../../redux/data";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { globalStyling } from "../../componants/globalStyle";
import AccuracyGraph from "./graphs/AccuracyGraph";


const Results = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dataAction.updateData(user) (dispatch)
},[])


    return(
        <>
        <Text style={globalStyling.head}>Results</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <LessonGraph/>
          <DaysGraph/>
          <AccuracyGraph/>
          <Image style={{width:'100%', resizeMode:'contain'}} source={require('../../../images/cautionTape.png')}/>
        </ScrollView>
        </>
          )
}

export default Results;