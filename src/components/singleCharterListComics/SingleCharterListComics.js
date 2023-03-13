import './singleCharterListComics.scss'
import { Link } from 'react-router-dom';

const SingleCharterListComics = ({comics}) => {
    return (
        <>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    !comics || comics.length <= 0 ? 'COMICS NOT FOUND' : comics.map((item, i) => {
                        const url = item.resourceURI.match(/\/(\d+)$/)[1];
                        // eslint-disable-next-line
                        if (i >= 10) return;
                        return (
                            <li className="char__comics-item" key={i}>
                                <Link to={`/comics/${url}`}>{item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default SingleCharterListComics;