import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSharedTweets, selectSharedTweets, selectTweetStatus } from '../redux/reducers/tweetSlice';
import { AppDispatch } from '../redux/store';
import TweetCard from '../components/TweetCard';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [profile, setProfile] = React.useState<any | null>(null);
  const sharedTweets = useSelector(selectSharedTweets);
  const status = useSelector(selectTweetStatus);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (profile) {
      dispatch(fetchSharedTweets());
    }
  }, [dispatch, profile]);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">User not logged in</h1>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/" className="text-indigo-500 hover:text-indigo-600 flex items-center">
            Back to Feeds
          </Link>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">{profile.name}</h1>
        <p>{profile.email}</p>
      </div>
      <section className="mt-8">
        <div className="container m-auto py-6 px-6">
          <h2 className="text-2xl font-bold mb-4">Shared with Me</h2>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'idle' && sharedTweets.length === 0 && <p>No tweets shared with you yet.</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedTweets.map((tweet) => (
              <TweetCard key={tweet.sharedPost?.id} tweet={tweet.sharedPost!} isShareable={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
