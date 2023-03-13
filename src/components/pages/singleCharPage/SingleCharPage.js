import './singleCharPage.scss';
import SingleCharterListComics from '../../singleCharterListComics/SingleCharterListComics';

const SingleCharPage = ({data}) => {
    const {name, description, thumbnail, comics} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <SingleCharterListComics comics={comics}/>
            </div>
           
        </div>
    )
}

export default SingleCharPage;