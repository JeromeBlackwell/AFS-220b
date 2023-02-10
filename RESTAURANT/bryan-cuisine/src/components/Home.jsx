import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import Recipes from './Recipes';


const Home = ({ setIsLoading, setRecipes }) => {
    return (
        <div>
            <Recipes
            setIsLoading={setIsLoading}
            setRecipes={setRecipes}
            />
        </div>
    )
}

export default Home;
