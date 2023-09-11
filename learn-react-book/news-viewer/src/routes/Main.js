import React, {useCallback, useState} from 'react';
import { useParams } from 'react-router-dom';
import NewsList from '../components/NewsList';
import Categories from '../components/Categories';
const Main = () => {

  const params = useParams();

  const category = params.category || 'all';

  return (
    <>
    <Categories/>
    <NewsList category={category}/>
    </>
  );
};

export default Main;