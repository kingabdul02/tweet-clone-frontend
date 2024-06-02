import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { shareTweet } from '../redux/reducers/tweetSlice';
import { AppDispatch } from '../redux/store';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: { id: number; name: string; email: string }[];
  tweetId: number;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, users, tweetId }) => {
  const [selectedUsers, setSelectedUsers] = useState<{ [key: number]: boolean }>({});
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const selectedEmails = users
      .filter((user) => selectedUsers[user.id])
      .map((user) => ({ email_address: user.email }));

    if (selectedEmails.length === 0) {
      alert('Please select at least one user to share the tweet.');
      return;
    }

    dispatch(shareTweet({ tweetId, recipients: selectedEmails }))
      .unwrap()
      .then((result) => {
        alert(result.message);
        onClose();
      })
      .catch((error: any) => {
        if (error.message) {
          alert(`Failed to share tweet: ${error.message}`);
        } else if (error.error) {
          alert(`Failed to share tweet: ${error.error}`);
        } else {
          alert('Failed to share tweet: Unknown error');
        }
      });
  };

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Share with:</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600"
                    checked={selectedUsers[user.id] || false}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                  <span className="ml-2">{user.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareModal;