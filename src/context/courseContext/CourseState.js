import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import CourseContext from './CoursesContext';
import courseReducer from './courseReducer'
import {
    TOGGLE_FILTER,
    FETCH_COURSES
} from '../Types';

function CourseState(props) {

    const initialState = {
        baseURL: `https://simphiwedesign.co.za/wp-json/wp/v2/`,
    }

    const [state, dispatch] = useReducer(courseReducer, initialState);

    return (
        <CourseContext.Provider value={{
            baseURL: state.baseURL
        }}>
            {props.children}
        </CourseContext.Provider>
    )
}

export default CourseState
