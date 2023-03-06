import Recipe from "./Recipe";
import Recipes from "./Recipes";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const RenderRecipes = ({ isLoading, setIsLoading }) =>{
    const [search, setSearch] = useState('')
    const [isError, setIsError] = useState(false)
    const [recipes, setRecipes] = useState([])

    const location = useLocation()
    const [foodType, setFoodType] = useState('')

    
    const apiRequest = async (url) =>{
        return new Promise((resolve, reject) =>
            axios.get(url)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        )
    }

    const handleSearchSubmitChange = (e) => {
        setSearch(e.target.value)
    }
    
    const handleSearchSubmit = async (e) => {
        // e.preventDefault()
        setIsError(false)
        setIsLoading(true)

            try{
                let q = search
                let response = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5ca51407f1a649a2b35aef72a28100b6&type=${foodType}&query=${q}`)
                console.log(response.data)
                if(response.data.recipes){
                    console.log(response.data.recipes)
                    setRecipes(response.data.recipes)
                    setIsLoading(false)
                } else {
                    setIsError(true)
                }
            }
            catch(err){
                setIsError(true)
                console.log(err)
            }
        }


        useEffect(()=>{
            setFoodType(location.state.type)
            handleSearchSubmit()
        },[location.state.type])
    
    
    let mappedRecipes = recipes.map((recipe, i) => {
        console.log(recipe)
        return (
            <Recipe
                recipe={recipe}
                key={i}
                _id={recipe.id}
                img={recipe.image}
            />
        )
    })

    return(
        <div>
            {isLoading ? <div className="loading-screen"><h1>Loading</h1></div> : mappedRecipes}
        </div>
    )
}


export default RenderRecipes;