import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets, selectAllTweets } from '../redux/reducers/tweetSlice';
import TweetCard from '../components/TweetCard';
import { AppDispatch } from '../redux/store';

const MyTweets: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tweets = useSelector(selectAllTweets);

  useEffect(() => {
    dispatch(fetchTweets())
  }, [dispatch])

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Trending</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tweets.map((tweet, index) => (
          <TweetCard key={index} tweet={tweet} isShareable={false} />
        ))}
      </div>
    </div>
  );
};

export default MyTweets;