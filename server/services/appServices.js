const Store = require('../models/StoreModel')
const Product = require('../models/ProductModel')
const Image =  require('../models/ImageModel')
const Cart =  require('../models/CartModel')
const Order =  require('../models/OrderModel')
const Review = require('../models/ReviewModel')
const User = require('../models/UserModel')
const mongoose = require('mongoose');



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
        const product = await Product.findById(productId).populate('images store_id')
        const reviews =  await Review.find({product_id:product._id}).populate('user_id')
        const data = {
            product: product,
            reviews: reviews,
            total_reviews:reviews.length
        }
        if (!product) {
            throw new Error('Product not found');
        }

        return data

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

async function cart(storeId, amount, productId, quantity, userId) {
    try {
        //check if product already in user cart
        const checkCart = await Cart.findOne({ user_id: userId, product_id: productId , order_placed:false})
        if (checkCart) {
            checkCart.amount = amount
            checkCart.quantity = quantity
            await checkCart.save()
            return checkCart
        } else {
            const newCart = new Cart({
                quantity: quantity,
                amount: amount,
                product_id: productId,
                store_id: storeId,
                user_id: userId
            })
            await newCart.save()
            return newCart
        }

    } catch (error) {
        throw new Error(`Error add items to cart ${error.message}`)
    }
}


async function getCart(userId){
    try {
        const cart = await Cart.find({user_id:userId, order_placed:false}).populate({
            path: 'product_id',
            populate: [
                {
                  path: 'images', 
                },
                {
                  path: 'store_id',
                },
              ],})
        return cart
    } catch (error) {
       throw new Error(`Error add items to cart ${error.message}`) 
    }
}

async function populateCart(cartId){
    try{
        const cart = await Cart.findById(cartId).populate({
            path: 'product_id',
            populate: [
                {
                  path: 'images', 
                },
                {
                  path: 'store_id',
                },
              ],})
        return cart
    }catch (error) {
        throw new Error(`Error populate cart data ${error.message}`)
    }
}


async function order(email, address, status, userId, cartIds) {
    try {
        // Validate input parameters
        if (!Array.isArray(cartIds) || cartIds.length === 0) {
            throw new Error('Invalid cartIds');
        }
        // Use a transaction to ensure data integrity
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            for (const cartId of cartIds) {
                const cart = await Cart.findById(cartId)
                if (!cart) {
                    throw new Error(`Cart not found for ID: ${cartId}`);
                }

                if (cart.order_placed) {
                    throw new Error(`this cart has already been ordered: ${cartId}`);
                }

                const newOrder = new Order({
                    email,
                    address,
                    status,
                    store_id: cart.store_id,
                    user_id: userId,
                    cart_id: cart._id,
                });
                await newOrder.save()
                cart.order_placed = true
                await cart.save()
                //update product stock
                const product = await Product.findById(cart.product_id)
                product.stock -= cart.quantity
                if (product <= 0) {
                    product.stock = 0
                }
                await product.save()

            }

            await session.commitTransaction();
            session.endSession();

            return true
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }

    } catch (error) {
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
          }).sort({ date: -1 })
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
        throw new Error(`Error getting reviews ${error.message}`)
    }
}


async function getStore(storeName){
    try {
        const store  = await Store.findOne({name: storeName})
        if (store){
            return store
        }
        return false
        
    } catch (error) {
        throw new Error(`Error getting store ${error.message}`)
    }
}

async function deleteCart(cartId, userId){
    try{
        const cart =  await Cart.findOne({user_id:userId, _id:cartId})
        if(cart){
            cart.deleteOne()
            return true
        }
        throw new Error(`Cart doesnt exists`)

    } catch(error){
        throw new Error(`Error delete cart${error.message}`)
    }
}

async function searchAll(word){
        try{
            const products = await Product.find({ name: { $regex: `^${word}`, $options: 'i' } }).populate('images store_id')
            const stores = await Store.find({ name: { $regex: `^${word}`, $options: 'i' } }).populate('image')
            return  {
                word,
                products,
                stores
            }

        } catch(error){
        throw new Error(`Error search all products/store${error.message}`)
    }
}

module.exports = {createStore, addProduct, removeProduct, getAllStoreProducts, saveImages, addImagesToProducts, getProductDetails, updateProductDetails, 
    cart, order, getStoreOrders, updateOrderStatus, getAllReviews, getStore, getCart, deleteCart, populateCart, searchAll}

