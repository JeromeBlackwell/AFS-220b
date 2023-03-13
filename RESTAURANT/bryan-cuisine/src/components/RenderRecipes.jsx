import Recipe from "./Recipe";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const RenderRecipes = ({ isLoading, setIsLoading }) =>{
    const [search, setSearch] = useState('')
    const [isError, setIsError] = useState(false)
    const [recipes, setRecipes] = useState([])

    const location = useLocation()
    const [foodType, setFoodType] = useState('')


    // const handleSearchSubmitChange = (e) => {
    //     setSearch(e.target.value)
    // }
    
    const handleSearchSubmit = async (e) => {
        // e.preventDefault()
        setIsError(false)
        setIsLoading(true)

            try{
                let q = search
                let response = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a64f315c6ca447b59501cac59dcd64c6&type=${foodType}`)
                console.log(response.data.results)
                if(response.data.results){
                    setRecipes(response.data.results)
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
            {console.log(recipes)}
            <h1 className="recipe-header">Try Something New</h1>
            {isLoading ? <div className="loading-screen"><h1>Loading</h1></div> : mappedRecipes}
        </div>
    )
}


export default RenderRecipes;