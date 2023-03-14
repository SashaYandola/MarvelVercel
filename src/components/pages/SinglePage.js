/* eslint-disable default-case */

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

import setContent from '../../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComic,  getCharacter, clearError, procces, setProcess } = useMarvelService();

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
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        }

    }

    return (
        <>
            <AppBanner />
            {setContent(procces, Component, data)}
        </>
    )
}

export default SinglePage;