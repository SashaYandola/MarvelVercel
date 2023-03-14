import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessages/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const setContent = (procces, Component, listItemLoading) => {
    switch (procces) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return listItemLoading ? <Component/> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('unexpected prcces state');
    }
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(300);
    const [listItemLoading, setListItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { getAllComics, procces, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics(comics => [...comics, ...newComics]);
        setListItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setListItemLoading(false) : setListItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded).then(() => setProcess('confirmed'));
    }

    const ViewComicsItem = (comics) => {
        const items = comics.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(procces, () => ViewComicsItem(comics), listItemLoading)}
            <button
                type='button'
                className="button button__main button__long"
                disabled={listItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div
                    className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;