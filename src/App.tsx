import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import AddTweetPage from './pages/AddTweetPage';
import MyTweets from './pages/MyTweets';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import TweetDetailsPage from './pages/TweetDetailsPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />  
        <Route path='/add-tweet' element={<AddTweetPage />} />  
        <Route path="/tweet/:id" element={<TweetDetailsPage />} /> 
        <Route path='/my-tweet' element={<MyTweets />} />  
        <Route path='/my-profile' element={<ProfilePage />} />  
        <Route path='/register' element={<RegistrationPage />} />  
        <Route path='/login' element={<LoginPage />} />  
        <Route path='*' element={<NotFoundPage />} />  
      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App
