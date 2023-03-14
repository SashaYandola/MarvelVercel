import './charInfo.scss';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import SingleCharterListComics from '../singleCharterListComics/SingleCharterListComics';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {getCharacter, clearError, procces, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

    const onCharLoaded = (char) => {
        // console.log('update')
        setChar(char);
    }

    const updateChar = () => {
        if (!props.charId) {
            return;
        }
        clearError();
        getCharacter(props.charId)
            .then(onCharLoaded).then(() => setProcess('confirmed'));
    }


    // const skeleton = char || loading || error ? null : <Skeleton />
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {setContent(procces, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

    const imageNotFound = thumbnail.indexOf('image_not_available') === 44 ? true : false;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imageNotFound ? { objectFit: 'contain' } : { objectFit: 'cover' }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <SingleCharterListComics comics = {comics}/>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;