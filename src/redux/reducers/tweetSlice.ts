import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SharedWithMeTweet, Tweet } from '../../models/tweet.model';

interface TweetState {
  tweets: Tweet[];
  status: 'idle' | 'loading' | 'failed';
  hasFetched: boolean; 
  sharedTweets: SharedWithMeTweet[];
}

const initialState: TweetState = {
  tweets: [],
  status: 'idle',
  hasFetched: false,
  sharedTweets: []
};

export const fetchTweets = createAsyncThunk('tweets/fetchTweets', async () => {
  const response = await fetch('http://localhost:3000/api/tweets');
  const data = await response.json();
  return data as Tweet[];
});

export const fetchMyTweets = createAsyncThunk('tweets/fetchMyTweets', async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:3000/api/my-tweets', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data as Tweet[];
});

export const addTweet = createAsyncThunk('tweets/addTweet', async (tweet: { title: string, content: string }) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:3000/api/tweets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(tweet),
  });
  const data = await response.json();
  return data as Tweet;
});

export const shareTweet = createAsyncThunk(
  'tweets/shareTweet',
  async ({ tweetId, recipients }: { tweetId: number, recipients: { email_address: string }[] }, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:3000/api/share-tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tweetId, recipients }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTweetById = createAsyncThunk('tweets/fetchTweetById', async (tweetId: number) => {
  const response = await fetch(`http://localhost:3000/api/tweets/${tweetId}`);
  const data = await response.json();
  return data as Tweet;
});

export const fetchSharedTweets = createAsyncThunk('tweets/fetchSharedTweets', async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:3000/api/shared-with-me-tweets', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data as Tweet[];
});

const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tweets = action.payload;
        state.hasFetched = true; // Set flag to true after successful fetch
      })
      .addCase(fetchTweets.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchMyTweets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyTweets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tweets = action.payload;
        state.hasFetched = true; // Set flag to true after successful fetch
      })
      .addCase(fetchMyTweets.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addTweet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTweet.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tweets.push(action.payload);
      })
      .addCase(addTweet.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(shareTweet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(shareTweet.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(shareTweet.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchTweetById.fulfilled, (state, action) => {
        const existingTweet = state.tweets.find(tweet => tweet.id === action.payload.id);
        if (existingTweet) {
          Object.assign(existingTweet, action.payload);
        } else {
          state.tweets.push(action.payload);
        }
      })
      .addCase(fetchSharedTweets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSharedTweets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.sharedTweets = action.payload;
      })
      .addCase(fetchSharedTweets.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAllTweets = (state: RootState) => state.tweets.tweets;
export const selectTweetStatus = (state: RootState) => state.tweets.status;
export const selectTweetById = (state: RootState, tweetId: number) =>
  state.tweets.tweets.find(tweet => tweet.id === tweetId);
export const selectSharedTweets = (state: RootState) => state.tweets.sharedTweets;

export default tweetSlice.reducer;
