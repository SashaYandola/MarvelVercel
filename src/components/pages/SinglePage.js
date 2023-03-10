/* eslint-disable default-case */

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessages/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic,  getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const onDataLoaded = (data) => {
        // console.log('update')
        setData(data);
    }

    const updateData = () => {
        clearError();

        
        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }

    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;