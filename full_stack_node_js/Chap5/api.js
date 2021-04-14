const Products = require('./products');

module.exports = { listProducts, getProduct };

async function listProducts(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { offset = 0, limit = 25, tag } = req.query;

    try {
        res.json(await Products.list({
            offset: Number(offset),
            limit: Number(limit),
            tag   
        }))
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

async function getProduct(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;

    try {
        const product = await Products.get(id)

        console.log(product)

        if(!product) return next();

        res.json(product);

    } catch (err) {
        res.status(500).json({err: err.message})
    }

}

