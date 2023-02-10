import { Routes , Route, Navigate } from 'react-router-dom'
import Navbar from './components/NavBar'
import Auth from './components/Auth'
import Home from './components/Home';

import { useContext, useState } from 'react';
import { UserContext } from './context/UserProvider';
import './App.css';

function App() {
  
  const {token} = useContext(UserContext)
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false) 

  return (
    <div className="App">
        <div className='home'>
          <Navbar className="navbar" />
          <Routes>
            <Route 
              exact path='/home'
              element={ <Home 
              recipes={recipes}
              isLoading={isLoading}
              setRecipes={setRecipes}
              setIsLoading={setIsLoading}
              />}
            />
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
