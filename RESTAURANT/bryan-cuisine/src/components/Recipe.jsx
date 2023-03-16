import { useState } from "react";
import axios from "axios";

import IngredientsFormHandler from './IngredientFormHandler';

const Recipe = ({recipe, _id, img}) => {
    const [editToggle, setEditToggle] = useState(false)
    const [ingredients, setIngredients] = useState([])
    
    const handleIngredientSearch = async (e) => {
        // e.preventDefault()
        try{
            let id = _id
            console.log(_id)
            let response = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=a64f315c6ca447b59501cac59dcd64c6`)
            if(response.data.extendedIngredients){
                setIngredients(response.data.extendedIngredients)
            } else {
                console.log('request error')
            }
        }
        catch(err){
            console.log(err)
        }
    }
    console.log(ingredients)
    return(
        <div className='recipeDiv'>
            {!editToggle?
                <>
                    <div key={_id} className='Recipe'>
                    <h3 className='recipe-name'>{recipe.title}</h3>
                    <img src={img} alt={''}></img>
                    <button className='recipe-button' onClick={()=>"databasepost"}>Add to My List</button>
                    <button className='recipe-button' onClick={()=>"databasepost"}>Delete Recipe</button>
                    <button className='recipe-button' onClick={()=> setEditToggle(prevToggle => !prevToggle && handleIngredientSearch())}>Ingredients</button>
                    </div>
                </>
                :
                <>
                    <IngredientsFormHandler
                    className='ingredient-handler'
                    recipe={recipe}
                    title={recipe.title}
                    ingredients={ingredients}
                    _id={_id}/>
                    <button className='close-btn' onClick={()=> setEditToggle(prevToggle=>!prevToggle)}>Close</button>
                </>
            }
            
        </div>
    )
}


export default Recipe;