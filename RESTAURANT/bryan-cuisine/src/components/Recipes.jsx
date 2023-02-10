import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Recipes = ({ setRecipes, setIsLoading }) =>{
    const [search, setSearch] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        const getData = async () =>{
            setIsError(false)
            setIsLoading(true)
        
        try{
            let response = await apiRequest('https://api.spoonacular.com/recipes/complexSearch?apiKey=5ca51407f1a649a2b35aef72a28100b6&query=')
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
            let response = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5ca51407f1a649a2b35aef72a28100b6&query=${q}`)
            console.log(response.data)
            if(response.data.Recipes){
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
            <form className="form">
                <input 
                    className="search-input"
                    value={search}
                    onChange={handleSearchSubmitChange}
                    type='text'
                    placeholder="Search for A Recipe"
                />
                <button type="submit" className="search-btn" onClick={handleSearchSubmit}>Search</button>
            </form>
            {renderError()}
        </div>
    )

}


export default Recipes;