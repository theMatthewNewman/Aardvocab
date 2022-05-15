import {Dispatch} from 'redux';
import { userState } from '../userHandler/types';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

export const getGlobalAverage = () => (dispatch:Dispatch) => {
    
}

export const addAverageToDatabase = async(user:userState) => {
    if (user.uid) setDoc(doc(db, "averages", 'globalAverage'),{
       
    })
}