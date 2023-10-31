const Store = require('../models/StoreModel')
const Product = require('../models/ProductModel')
const Image =  require('../models/ImageModel')
const Cart =  require('../models/CartModel')
const Order =  require('../models/OrderModel')
const Review = require('../models/ReviewModel')
const User = require('../models/UserModel')



async function createStore(name, bio, userId) {
    try {
        const checkUniqueName = await Store.findOne({ name: name });
        if (checkUniqueName) {
            throw new Error(`Store name already exists`);
        }

        const newStore = new Store({
            name: name,
            bio: bio,
            user_id: userId
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

async function removeProduct(productId){
    try {
        await Product.findByIdAndDelete(productId)
        return true 
    } catch (error) {
        throw new Error(`Error deleting product ${error.message}`)
    }
}

async function getAllStoreProducts(storeId){
    try {
        const products = await Product.find({store_id:storeId}).populate('images')
        return products
    } catch (error) {
        throw new Error(`Error getting all products in store  ${error.message}`)
    }
}


async function saveImages(imageName, path){
    try {
        const newImage = new Image({
            name:imageName,
            url:path
        })
        await newImage.save()
        return newImage
    } catch (error) {
        throw new Error(`Error saving images ${error.message}`)
    }
}


async function addImagesToProducts(productId, imageId) {
    try {
        const product = await Product.findById(productId)
        if (!product) {
            throw new Error('Product not found');
        }
        product.images.push(imageId);
        await product.save();
        return true
    } catch (error) {
        throw new Error(`Error updating product images: ${error.message}`);
    }
}

async function getProductDetails(productId){
    try {
        const product = await Product.findById(productId).populate('images')
        if (!product) {
            throw new Error('Product not found');
        }

        return product

    } catch (error) {
        throw new Error(`Error getting product details ${error.message}`)
    }
}

async function updateProductDetails(productId, name, description, stock, price, images){
    try {
        const product = await Product.findById(productId)
        product.name = name;
        product.description = description;
        product.stock = stock;
        product.price = price;
        product.images = images || product.images;
        await product.save()
        return product

    } catch (error) {
        throw new Error(`Error editing product details ${error.message}`)
    }
}

async function cart(storeId, amount, productId,quantity, userId){
    try{
        const newCart = new Cart({
            quantity:quantity,
            amount: amount,
            product_id:productId,
            store_id:storeId,
            user_id:userId
        })
        await newCart.save()
        return newCart

    } catch (error) {
        throw new Error(`Error add items to cart ${error.message}`)
    }
}
async function order(email, address, status, storeId, userId, cartId){
    try{
        const newOrder = new Order({
            email:email,
            address:address,
            status:status,
            store_id:storeId,
            user_id:userId,
            cart_id:cartId
        })

        await newOrder.save()
        return newOrder

    }catch (error) {
        throw new Error(`Error add items to order ${error.message}`)
    }
}

async function getStoreOrders(storeId){
    try{
        const orders =  await Order.find({store_id: storeId}) .populate({
            path: 'cart_id',
            populate: {
              path: 'product_id', // Path to the product reference within the cart object
            },
          });
        return orders
    }catch (error) {
        throw new Error(`Error getting store orders ${error.message}`)
    }
}

async function updateOrderStatus(orderId, status){
    try {
        const order = await Order.findById(orderId)
        const acceptedValues = [
            "processing", "shipped", "completed", "cancelled"
        ]
        if (acceptedValues.includes(status)) {
            order.status = status
            await order.save()
            return order
        }else{
            throw new Error(`status value not accepted`)
        }
    } catch (error) {
        throw new Error(`Error updating order status ${error.message}`)
    }
}


async function getAllReviews(storeId){
    try {
        const reviews =  await Review.find({store_id:storeId}).populate('product_id user_id').sort({ date: -1 });
        return reviews
    } catch (error) {
        throw new Error(`Error get reviews ${error.message}`)
    }
}

module.exports = {createStore, addProduct, removeProduct, getAllStoreProducts, saveImages, addImagesToProducts, getProductDetails, updateProductDetails, 
    cart, order, getStoreOrders, updateOrderStatus, getAllReviews}

