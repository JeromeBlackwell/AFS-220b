import { useState } from "react";
import IngredientsFormHandler from './IngredientFormHandler';

const Recipe = ({recipe, _id, img}) => {
    const [editToggle, setEditToggle] = useState(false)

    return(
        <div className='recipeDiv'>
            {!editToggle?
                <>
                    <div key={_id} className='Recipe'>
                    <h3 className='recipe-name'>{recipe.title}</h3>
                    <img src={img} alt={''}></img>
                    <button className='recipe-button' onClick={()=>"databasepost"}>Add to My List</button>
                    <button className='recipe-button' onClick={()=>"databasepost"}>Delete Recipe</button>
                    <button className='recipe-button' onClick={()=> setEditToggle(prevToggle => !prevToggle)}>Ingredients</button>
                    </div>
                </>
                :
                <>
                    <IngredientsFormHandler 
                    recipe={recipe}
                    title={recipe.title}/>
                    <button className='close-btn' onClick={()=> setEditToggle(prevToggle=>!prevToggle)}>Close</button>
                </>
            }

        </div>
    )
}


export default Recipe;