import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAllusers } from '../redux/reducers/userSlice';
import { Tweet } from '../models/tweet.model';
import { openModal, closeModal } from '../redux/reducers/modalSlice';
import { AppDispatch, RootState } from '../redux/store';
import ShareModal from '../share/ShareModal';
import { useNavigate } from 'react-router-dom';

interface TweetCardProps {
  tweet: Tweet;
  isShareable?: boolean;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet, isShareable = false }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const users = useSelector(selectAllusers);
  const navigate = useNavigate();

  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    alert(tweet.id)
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchUsers());
    }
  }, [dispatch, isModalOpen]);

  const handleCardClick = () => {
    navigate(`/tweet/${tweet.id}`);
  };

  return (
    <div className="p-4 border rounded shadow hover:shadow-lg">
      <h2 className="text-xl font-bold mb-2">{tweet.title}</h2>
      <p className="text-gray-700 mb-4">{tweet.content}</p>
      <p className="text-gray-500">Author: {tweet.author.name}</p>
      <button
          onClick={handleCardClick}
          className="text-indigo-600 hover:text-indigo-900 p-3"
        >
          More...
        </button>
      {isShareable && (
        <button
          onClick={handleOpenModal}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Share
        </button>
      )}
      <ShareModal isOpen={isModalOpen} onClose={handleCloseModal} users={users} tweetId={tweet.id} />
    </div>
  );
};

export default TweetCard;
