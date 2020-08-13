import React, { useContext, useState, useEffect } from 'react'
import CourseContext from '../context/courseContext/CoursesContext';
import axios from 'axios';
//COMPONENTS
import CardItem from './layout/CardItem'
import SearchForm from './layout/SearchForm'
import Loader from './utils/Loader';

function CourseListPage() {

    const { baseURL } = useContext(CourseContext)

    const [courses, setCourses] = useState([])

    const [filterCourse, setFilterCourse] = useState([])

    const getFilterType = (e) => {

        const filteredList = courses.filter(course => course.ACF.status.toLowerCase() === e.target.id)

        if (e.target.id === 'all' || filterCourse.length === 0) {
            setFilterCourse(courses)
        } else {
            setFilterCourse(filteredList)
        }

    }

    useEffect(() => {

        axios.get(`${baseURL}course?per_page=21`).then(res => {

            setCourses([...res.data])
            setFilterCourse([...res.data])
        })

    }, [])

    return (
        <main className="content">
            <header className="site__header">
                <h1>Courses</h1>
                <SearchForm />
            </header>
            <form className="filter_form">
                <label htmlFor="all" className="form__input">
                    <input type="radio" name="status" id="all" onChange={getFilterType} />
                    <span>All</span>
                </label>
                <label htmlFor="current" className="form__input">
                    <input type="radio" name="status" id="current" onChange={getFilterType} />
                    <span>Current</span>
                </label>
                <label htmlFor="pending" className="form__input">
                    <input type="radio" name="status" id="pending" onChange={getFilterType} />
                    <span>Pending</span>
                </label>
            </form>

            {
                filterCourse.length !== 0 ?
                    <div className="cards">
                        {filterCourse.map(course => <CardItem key={course.id} course={course} />)}
                    </div> : <Loader />
            }
        </main>
    )
}

export default CourseListPage
