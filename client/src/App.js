import Main from './Components/MainComponent';
import './App.css';
import {
  BrowserRouter
} from 'react-router-dom';
import {
  ChakraProvider
} from '@chakra-ui/react';
import { removeSessionStoragee, updateLoggedInTimings } from './helpers/auth.helpers';

function App() {

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    removeSessionStoragee('token')
    return updateLoggedInTimings()
  })
  
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
