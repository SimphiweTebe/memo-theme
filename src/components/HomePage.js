import React, { useContext, useState, useEffect } from 'react'
import CourseContext from '../context/courseContext/CoursesContext';
import axios from 'axios';
//COMPONENTS
import CardItem from './layout/CardItem'
import SearchForm from './layout/SearchForm';
import Loader from './utils/Loader';

function HomePage() {

    const { baseURL } = useContext(CourseContext)

    const [courses, setCourses] = useState([])

    useEffect(() => {

        axios.get(`${baseURL}course?per_page=3`).then(res => {

            setCourses([...res.data])

        }).catch(err => console.log(err.error))

    }, [])

    //console.log(courses)

    return (
        <main className="content">
            <header className="site__header">
                <h1>Featured</h1>
                <SearchForm />
            </header>

            {
                courses.length !== 0 ? <div className="cards">{courses.map(course => <CardItem key={course.id} course={course} />)}</div> :
                    <Loader />
            }

        </main>
    )
}

export default HomePage
