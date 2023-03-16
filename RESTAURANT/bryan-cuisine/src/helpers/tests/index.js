
function deleteLocalStorage(){
    var localStorage = ['recipes']
    localStorage.pop('recipes')
    console.log(localStorage)
}

module.exports = deleteLocalStorage()