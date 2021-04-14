const cuid = require('cuid');
const { isURL } = require('validator');
const db = require('../db');

const Product = db.model('Product', {
    _id: {type: String, defautl: cuid},
    description: {type: String, required: true},
    imgThumb: urlSchema({required: true}),
    img: urlSchema({required: true}),
    link: urlSchema(),
    userId: { type: String, required: true},
    userName: { type: String, required: true},
    userLink: urlSchema(),
    tags: {type: [String], index: true}
});

async function create(fields) {
    const product = await new Product(fields).save();
    return product;
}

async function list(opts = {}) {
    const { offset = 0, limit = 25, tag} = opts;

    const query = tag ? { tags: tag} : {};

    const products = await Product.find(query)
                        .sort({ _id: 1 })
                        .skip(offset)
                        .limit(limit)

    return products;
}


async function get(id) {
    const product = await Product.findById(id);
    return product;
}

async function edit(id, change) { 
    const product = await get(id);

    Object.keys(change).forEach(key => {
        product[key] = change[key]
    })

    await product.save();

    return product;

}

async function remove(_id) {
    await Product.deleteOne({ _id });
}


function urlSchema(opts = {}) {
    const { required } = opts;

    return {
        type: String,
        required: !!required,
        validate: {
            validator: isURL,
            message: props => `${props.value} is not a valid URL`
        }
    }
}

module.exports = { 
    get,
    list,
    create,
    edit,
    remove
}