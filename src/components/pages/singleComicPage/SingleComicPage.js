import './singleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessages/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import AppBanner from '../../appBanner/AppBanner';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId])

    const onComicLoaded = (comic) => {
        // console.log('update')
        setComic(comic);
    }

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <ViewComic comic={comic} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ViewComic = ({ comic }) => {
    const { title, description, pageCount, language, thumbnail, price } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;