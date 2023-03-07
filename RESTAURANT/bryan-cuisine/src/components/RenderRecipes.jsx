import Recipe from "./Recipe";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const RenderRecipes = ({recipe, isLoading }) =>{
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
        // setIsLoading(true)

            try{
                let q = search
                let response = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5ca51407f1a649a2b35aef72a28100b6&type=${foodType}&query=${q}`)
                console.log(response.data)
                if(response.data.Recipes){
                    console.log(response.data.recipes)
                    setRecipes(response.data.recipes)
                    // setIsLoading(false)
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
    
    
    // make map

    return(
        <div>

        </div>
    )
}


export default RenderRecipes;