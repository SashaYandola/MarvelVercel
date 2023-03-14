import './charList.scss';
import { useEffect, useRef, useState, useMemo } from 'react';
import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessages/ErrorMessage';

import PropTypes from 'prop-types';
import React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const setContent = (procces, Component, listItemLoading) => {
    switch (procces) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return listItemLoading ? <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('unexpected prcces state');
    }
}

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [listItemLoading, setListItemLoading] = useState(false);
    const [offset, setOffset] = useState(300);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, procces, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setListItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setListItemLoading(false) : setListItemLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded).then(() => setProcess('confirmed'));
    }

    const itemRefs = useRef([]);

    const focusItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));

        itemRefs.current[id].classList.add('char__item_selected');

        itemRefs.current[id].focus();
    }

    const ViewItems = (chars) => {
        console.log('render')
        let items = chars.map((item, i) => {
            let imgStyle = item.thumbnail.indexOf('image_not_available') === 44 ? true : false;

            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        className={`char__item`}
                        onClick={() => {
                            props.selectChar(item.id);
                            focusItem(i);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.selectChar(item.id);
                                focusItem(i);
                            }
                        }}
                    >
                        <img src={item.thumbnail} alt="abyss" style={imgStyle ? { objectFit: 'unset' } : { objectFit: 'cover' }} />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })
        return (

            <TransitionGroup component={'ul'} className="char__grid">
                {items}
            </TransitionGroup>

        );
    }

    const element = useMemo(() => {
        return setContent(procces, () => ViewItems(chars), listItemLoading)
    // eslint-disable-next-line
    }, [procces])

    return (
        <div className="char__list">
            {element}

            <button className="button button__main button__long"
                disabled={listItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    selectChar: PropTypes.func.isRequired,
}


export default CharList;