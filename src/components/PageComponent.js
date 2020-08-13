import React, { useState, useEffect, useContext } from 'react'
import CourseContext from '../context/courseContext/CoursesContext';
import Loader from './utils/Loader';
import axios from 'axios'

function PageComponent({ match }) {

    const { baseURL } = useContext(CourseContext)

    const [currentPage, setCurrentPage] = useState('');

    // const { id, title, content } = currentPage;

    useEffect(() => {

        const pageId = match.url.substring(7, match.url.length);

        axios.get(`${baseURL}pages?slug=${pageId}`).then(page => setCurrentPage(page.data[0]))

        return () => {
            console.log("cleaned up");
        };

    }, [])


    console.log(currentPage)
    return (
        <>
            {
                currentPage == '' ? <main className="content"><Loader /></main> :
                    <main className="content">
                        <h1>Page</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, eligendi molestiae! Dicta odit fuga facilis, excepturi nobis consequuntur iure earum saepe dolorum itaque, ad voluptates. Ipsam atque explicabo pariatur voluptatum.</p>
                    </main>
            }
        </>
    )
}

export default PageComponent
