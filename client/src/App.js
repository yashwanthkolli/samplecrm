import Main from './Components/MainComponent';
import './App.css';
import {
  BrowserRouter
} from 'react-router-dom';
import {
  ChakraProvider
} from '@chakra-ui/react';
import { setLocalStorage } from './helpers/auth.helpers';
import moment from 'moment'

function App() {

  const upadteOnlineTime = () => {
    if(sessionStorage.getItem('user')){
      const loginTime = moment(localStorage.getItem('loginTime'), 'HH:mm')
      const currentTime = moment(new Date(), 'HH:mm')
      const loggedInDuration = currentTime.diff(loginTime)
      setLocalStorage('loggedInDuration', moment.utc(loggedInDuration).format('HH:mm'))
    }
  }

  
  setInterval(() => {
    if(localStorage.getItem('loginTime')) upadteOnlineTime()
  }, 3000)
  
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
