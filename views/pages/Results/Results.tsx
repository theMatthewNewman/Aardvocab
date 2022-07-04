import { Text,  Image, ScrollView} from "react-native";
import DaysGraph from "./graphs/DaysGraph";
import LessonGraph from "./graphs/LessonGraph";
import { useEffect } from "react";
import { dataAction } from "../../../redux/data";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { globalStyling, size } from "../../componants/globalStyle";
import AccuracyGraph from "./graphs/AccuracyGraph";


const Results = () => {
  const user = useSelector(state => state.user)
  const data = useSelector(state => state.graph.bucketedLevels);
  const selfIndex = useSelector(state => state.graph.selfIndex)
  const dispatch = useDispatch()
  useEffect(() => {
    dataAction.updateData(user) (dispatch)
  },[])


    return(
        <>
        <Text style={globalStyling.head}>Results</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:size.large}}>
          
          <LessonGraph user={user} data={data} selfIndex={selfIndex}/>
          <DaysGraph user={user}/>
          <AccuracyGraph user={user}/>
          
        </ScrollView>
        </>
          )
}

export default Results;