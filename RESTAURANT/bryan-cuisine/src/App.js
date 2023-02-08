import { Routes , Route, Navigate } from 'react-router-dom'
import Navbar from './components/NavBar'
import Auth from './components/Auth'
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import './App.css';

function App() {
  
  const {token} = useContext(UserContext)

  return (
    <div className="App">
            <div className='landing-page'>
        <Navbar className="navbar" />
        <Routes>
          <Route
            exact path='/'
            element={token ? <Navigate replace to='/cart' /> : <Auth />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
