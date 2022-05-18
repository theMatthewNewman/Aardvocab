import {View, Text, Dimensions, Image} from "react-native";
import DaysGraph from "./graphs/DaysGraph";
import LessonGraph from "./graphs/LessonGraph";
import { useEffect } from "react";
import { dataAction } from "../../../redux/graphs";
import { useSelector, useDispatch } from "../../../redux/hooks";


const Results = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dataAction.updateData(user) (dispatch)
},[])


    return(
        <View>
          <LessonGraph/>
          <DaysGraph/>
        </View>
          )
}

export default Results;