import { Hero } from '../components/Hero'
import NavBar from '../components/NavBar'
import TweetList from '../components/TweetList'

const HomePage = () => {
  return (
    <>
        <NavBar />
        <Hero title='Tweet App' subtitle='Hello Friends' />
        <TweetList />
    </>
  )
}

export default HomePage