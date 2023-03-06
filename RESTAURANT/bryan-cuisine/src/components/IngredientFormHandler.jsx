const IngredientsFormHandler = (recipe) => {
    console.log(recipe)
    return(
        <div className="ingredients-form">
            <h1 className="ingredients-title">Ingredients: {recipe.title}</h1>
        </div>
    )
}

export default IngredientsFormHandler