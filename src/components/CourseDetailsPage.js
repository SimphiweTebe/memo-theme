import React, { useState, useEffect, useContext } from 'react'
import CourseContext from '../context/courseContext/CoursesContext';
import Loader from './utils/Loader';
import axios from 'axios'

function CourseDetailsPage({ match }) {

    const { baseURL } = useContext(CourseContext)

    const [currentCourse, setCurrentCourse] = useState('')

    const { title, content, images, ACF } = currentCourse;

    useEffect(() => {
        const courseId = match.params.slug
        axios.get(`${baseURL}course?slug=${courseId}`).then(course => setCurrentCourse(course.data[0]))
    }, [])

    //if (ACF !== undefined) console.log(ACF)


    return (
        <>

            {
                currentCourse == '' ? <main className="content"><Loader /></main> :

                    <main className="content">
                        <header className="site__banner" style={{ backgroundImage: `url(${ACF.course_banner.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            &nbsp;
                        </header>

                        <div className="page">
                            <h2>{title.rendered}</h2>
                            <div className="page__content" dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
                            <div className="page__tags">
                                <p><strong>Skill level:</strong> {ACF.skill_level}</p>
                                <p><strong>Release month:</strong> {ACF.release_date}</p>
                                <p><strong>Duration:</strong> {ACF.duration} weeks</p>
                            </div>
                        </div>
                    </main>

            }
        </>
    )

}

export default CourseDetailsPage
