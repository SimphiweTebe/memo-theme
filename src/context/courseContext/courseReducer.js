import {
    FETCH_COURSES,
    TOGGLE_FILTER,
} from '../Types';

function courseReducer(state, { type, payload }) {

    switch (type) {

        case FETCH_COURSES:

            return {
                ...state,
                courses: [...state.courses, payload]
            }

        case SEARCH_COURSES:

            const reg = new RegExp(`${payload}`, 'gi')
            return {
                ...state,
                search: state.courses.filter(course => course.title.rendered.match(reg))
            }


        case TOGGLE_FILTER:

            return {
                ...state,
                filterGuest: !state.filterCourses
            }

        default:
            return state;
    }
}

export default courseReducer;