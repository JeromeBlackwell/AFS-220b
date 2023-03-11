import { Routes , Route, Navigate } from 'react-router-dom'
import Navbar from './components/NavBar'
import Auth from './components/Auth'
import Home from './components/Home';
import RenderRecipes from './components/RenderRecipes';
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
              exact path='/breakfast'
              element={ <RenderRecipes
                setIsLoading={setIsLoading} 
              />}
            />
            <Route 
              exact path='/appetizer'
              element={ <RenderRecipes
                setIsLoading={setIsLoading}  
              />}
            />
            <Route 
              exact path='/dinner'
              element={ <RenderRecipes
                setIsLoading={setIsLoading}  
              />}
            />
            <Route 
              exact path='/auth'
              element={ <Auth 
              />}
            />
            <Route
              exact path='/'
              element={token ? <Navigate replace to='/home' /> : <Auth />}
            />
          </Routes>
      </div>
    </div>
  );
}
// test
export default App;
