import React from 'react'
import { Link } from 'react-router-dom';

function CardItem(props) {

    const { slug, title, published_date, excerpt, images, ACF } = props.course;

    //console.table(ACF)

    return (
        <div className="card">
            <h3 className="card__month">{ACF.month}</h3>
            <p className="card__title">{title.rendered}</p>
            <p className="card__category">{images.course_topic.name}</p>
            <p className="card__date">{ACF.release_date}</p>
            <img src={ACF.feature_image} alt="Card poster" className="card__image" />
            <div className="card__footer">
                <p className="card__excerpt" dangerouslySetInnerHTML={{ __html: `${excerpt.rendered.substring(0, 55) + '...'}` }}></p>
                <Link to={`/course/${slug}`}>more</Link>
            </div>
        </div>
    )
}

export default CardItem
