
const tests = require('./index')
const deleteLocalStorage = require('./index')
const localStorage = require('./index')

test('Returns an empty local storage array', () => {
    expect(deleteLocalStorage(localStorage).toBe([]))
})