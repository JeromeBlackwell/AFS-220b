import axios from "axios";
import { useState } from "react";

const IngredientsFormHandler = ({recipe, ingredients, _id}) => {

    const mappedIngredients = ingredients.map(ingredient => {
        return(`${ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}, `)
    })

    
    return(
        <div className="ingredients-form">
            <h1 className="ingredients-title">Ingredients:</h1>
            <h2>{mappedIngredients}</h2>
        </div>
    )
}

export default IngredientsFormHandler