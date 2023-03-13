import axios from "axios";
import { useState } from "react";

const IngredientsFormHandler = ({recipe, ingredients, _id}) => {

    const mappedIngredients = ingredients.map(ingredient => {
        return(ingredient.name)
    })

    
    return(
        <div className="ingredients-form">
            <h1 className="ingredients-title">Ingredients:{mappedIngredients} </h1>
        </div>
    )
}

export default IngredientsFormHandler