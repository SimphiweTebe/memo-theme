
import React, { useState, useEffect, useContext } from 'react'
import CourseContext from '../context/courseContext/CoursesContext';
import Loader from './utils/Loader';
import axios from 'axios'

function AccountPage({ match }) {
    const { baseURL } = useContext(CourseContext)

    const [currentPage, setCurrentPage] = useState('');

    const { title, content, images } = currentPage;

    useEffect(() => {

        const pageId = match.path.substring(1, match.path.length);

        axios.get(`${baseURL}pages?slug=${pageId}`).then(page => setCurrentPage(page.data[0]))
    }, [])


    return (
        <>
            {
                currentPage == '' ? <main className="content"><Loader /></main> :
                    <main className="content">
                        <div className="page">
                            <h1>{title.rendered}</h1>
                            <div className="page__content" dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
                        </div>
                    </main>
            }
        </>
    )
}

export default AccountPage
