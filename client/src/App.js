import Main from './Components/MainComponent';
import './App.css';
import {
  BrowserRouter
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
