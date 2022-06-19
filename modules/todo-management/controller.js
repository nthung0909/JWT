module.exports = {getData}

function getData(req, res) {
    res.json({
        data: 'ok',
        message: 'get data successfully!'
    })
}