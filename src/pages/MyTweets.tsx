import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyTweets, selectAllTweets, selectTweetStatus } from '../redux/reducers/tweetSlice';
import TweetCard from '../components/TweetCard';
import { Tweet } from '../models/tweet.model';
import { AppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';

const MyTweets: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tweets = useSelector(selectAllTweets);
  const status = useSelector(selectTweetStatus);

  useEffect(() => {
    dispatch(fetchMyTweets());
  }, [dispatch]);

  return (
   <>
     <section>
            <div className='container m-auto py-6 px-6'>
                <Link
                to='/'
                className='text-indigo-500 hover:text-indigo-600 flex items-center'
                >
                    Back to Feeds
                </Link>
            </div>
        </section>
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">My Tweets</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Failed to load tweets.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tweets.map((tweet: Tweet, index: number) => (
          <TweetCard key={index} tweet={tweet} isShareable={true} />
        ))}
      </div>
    </div>
   </>
  );
};

export default MyTweets;
