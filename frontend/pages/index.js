import HomeView from '../components/home/home'
import { useEffect} from 'react';
import Cookies from 'js-cookie'

export default function Home() {
  useEffect(() => {
    Cookies.remove('jwt');
  }, []);
  
  return (
    <HomeView>
    </HomeView>
  )
}