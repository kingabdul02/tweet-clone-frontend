import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTweetById, selectTweetById } from '../redux/reducers/tweetSlice';
import { AppDispatch, RootState } from '../redux/store';

const TweetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchTweetById(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  const tweet = useSelector((state: RootState) => 
    id ? selectTweetById(state, parseInt(id, 10)) : undefined
  );

  if (!tweet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">{tweet.title}</h1>
      <p>{tweet.content}</p>
    </div>
  );
};

export default TweetDetailsPage;
