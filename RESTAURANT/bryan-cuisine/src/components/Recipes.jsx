import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
// import Recipe from "./Recipe";

const Recipes = ({setRecipes, setIsLoading }) =>{
    const [search, setSearch] = useState('')
    const [isError, setIsError] = useState(false)
    // const [recipes, setRecipes] = useState([])

    useEffect(()=>{
        const getData = async () =>{
            setIsError(false)
            setIsLoading(true)
        
        try{
            let response = await apiRequest('https://api.spoonacular.com/recipes/complexSearch?apiKey=a64f315c6ca447b59501cac59dcd64c6&query=')
            setRecipes(response.recipes)
            setIsLoading(false)
        }
        catch(err){
            setIsError(true)
            console.log(err)
        }}
        getData()
    },[setIsLoading,setRecipes])

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
        e.preventDefault()
        setIsError(false)
        setIsLoading(true)

        try{
            let q = search
            let response = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a64f315c6ca447b59501cac59dcd64c6&query=${q}`)
            console.log(response.data.results)
            if(response.data.results){
                console.log(response.data.results)
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
    
    
    const renderError = () =>{
        if(isError){
            return(
                <div>
                    <h1>An Error has Occured.</h1>
                    <h1>You May Try:</h1>
                    <h3>Entering a different recipe option.</h3>
                    <h3>Check spelling of desired recipe option.</h3>
                </div>
            )
        }
    }
    

    return(
        <div className="recipes">
            <form className="recipe-form">
                <input 
                    className="recipe-search"
                    value={search}
                    onChange={handleSearchSubmitChange}
                    type='text'
                    placeholder="Search for A Recipe"
                />
                <button type="submit" className="search-btn" onClick={handleSearchSubmit}>Search</button>
            </form>
            {/* {mappedRecipes} */}
            {renderError()}
        </div>
    )

}


export default Recipes;