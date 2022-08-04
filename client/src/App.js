import Main from './Components/MainComponent';
import './App.css';
import {
  BrowserRouter
} from 'react-router-dom';
import {
  ChakraProvider
} from '@chakra-ui/react';

function App() {
  
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
