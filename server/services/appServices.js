const Store = require('../models/StoreModel')
const Product = require('../models/ProductModel')
const User = require('../models/UserModel')


async function createStore(name, bio, image, userId) {
    try {
        const checkUniqueName = await Store.findOne({ name: name });
        if (checkUniqueName) {
            throw new Error(`Store name already exists`);
        }

        const newStore = new Store({
            name: name,
            bio: bio,
            user_id: userId,
            image: image || null,
        });

        await newStore.save();
        return newStore;
    } catch (error) {
        throw new Error(`Error creating store: ${error.message}`);
    }
}


async function addProduct(name, description,stock, price, image, storeId){
    try {
        const newProduct = new Product({
            name:name,
            description:description,
            stock:stock,
            price:price,
            image:image || null,
            store_id: storeId
        })
        await newProduct.save()
        return newProduct
    } catch (error) {
        throw new Error(`Error creating product: ${error.message}`)
    }
}


module.exports = {createStore, addProduct}

