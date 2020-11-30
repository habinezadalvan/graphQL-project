console.log('=====')
module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert('Categories', [
        {
            name: 'Fruits & Vegetables',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]),
    down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
}