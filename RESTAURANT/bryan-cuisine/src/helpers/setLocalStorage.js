const setLocalStorage = (e) => {
    let storage = [e]

    if(localStorage.getItem('recipes')) {
        let prevStorage = JSON.parse(localStorage.getItem('recipes'))
        storage = [...storage, ...prevStorage]
    }

    localStorage.setItem('recipes', JSON.stringify(storage))
}

export default setLocalStorage