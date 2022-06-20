const accessRoute = require('./access-magement/routes');
const todoRoute = require('./todo-management/routes');

module.exports = (app) => {
    app.use('/access', accessRoute);
    app.use('/todos', todoRoute);

    // app.use('/', (req, res) => {
    //     res.json({status: 200, message: 'test ok!'})
    // });
}