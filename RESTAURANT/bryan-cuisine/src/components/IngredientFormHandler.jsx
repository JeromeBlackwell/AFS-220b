import axios from "axios";
import { useState } from "react";

const IngredientsFormHandler = (recipe, _id) => {
    const [ingredients, setIngredients] = useState('')

    const apiRequest = async (url) =>{
        return new Promise((resolve, reject) =>
            axios.get(url)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        )
    }

    
    const handleIngredientsSearch = async (e) => {
        // e.preventDefault()

        try{
            let id = recipe._id
            console.log(recipe._id)
            let response = await apiRequest(`https://api.spoonacular.com/recipes/${id}/information?apiKey=a64f315c6ca447b59501cac59dcd64c6`)
            if(response.extendedIngredients){
                setIngredients(response.extendedIngredients)
            } else {
                console.log('request error')
            }
        }
        catch(err){
            console.log(err)
        }
    }


    return(
        <div className="ingredients-form">
            <h1 className="ingredients-title">Ingredients: {recipe.title}</h1>
            {console.log(ingredients)}
        </div>
    )
}

export default IngredientsFormHandler