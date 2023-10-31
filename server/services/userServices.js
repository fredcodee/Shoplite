const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const Store =  require('../models/StoreModel')
const Order =  require('../models/OrderModel')
const Cart = require("../models/CartModel")
const Review = require("../models/ReviewModel")
const Product =require('../models/ProductModel')
const Image = require('../models/ImageModel')
const bcrypt = require('bcrypt')


async function generateToken(user) {
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        return token;
    }
    catch (error) {
        throw new Error(`Cant generate token ${error}`);
    }

}

async function getUserById(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error(`Cant get user details ${error}`);
    }
}


async function findAndVerifyUserCredentials(email, password) {
    try {
        const user = await User.findOne({ email: email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return false;
        }

        return user;
    } catch (error) {
        throw new Error(`Cant find and verify user ${error}`);
    }
}


async function checkIfUserIsRegistered(email){
    try{
        const user  =await User.findOne({ email: email });
        if (user){
            return true
        }
        return false
    }
    catch(err){
        throw new Error(`Cant check if user is already registered ${err}`)
    }
}

async function addUserToDb(name, email, password){
    try {
        password = bcrypt.hashSync(password, 10)
         const user = new User({
             name : name || null,
             email: email || null,
             password: password || null
         });
         await user.save();
         return user;
    } catch (error) {
        throw new Error(`cant add user to database ${error}`)
    }
}

async function googleAuth(name, email, sub){
    try {
        const user  = await User.findOne({email:email})
        if(!user){
            const user = new User({
                name : name,
                email: email,
                googleId:sub
            })
            await user.save()
            return user
        }   
        return user
    } catch (error) {
       throw new Error(`caant save user from google auth ${error}`) 
    }
}

async function getUserStore(userId){
    try {
        const store =  await Store.findOne({user_id:userId}).populate('user_id image')
        if(store){
            return store
        }
        return false
    } catch (error) {
       throw new Error(`error getting user's store ${error}`) 
    }

}


  //check if has and own the store
const checkUserHasOwnStore = async(userId, storeId) =>{
    try {
        const storeCheck = await getUserStore(userId)
        if(storeCheck && !storeId){
            return storeCheck
        }
        else if(storeCheck && storeCheck._id == storeId){
            return true
        }
        return false
      
    } catch (error) {
      throw new Error(`Error checking if user owns store/ has access to the store  ${error.message}`)
    }
  }




async function addUpdateStoreImage(storeId, imageId){
    try {
        await Store.updateOne({ _id: storeId}, {
            $set: {
                image: imageId
            }
        });
        return true

    } catch (error) {
        throw new Error(`Error updating store image ${error.message}`)
    }

}


async function dashboardProps(storeId){
    try {
        // total orders and total revenue
        const orders =  await Order.find({store_id: storeId, status:"completed"}).populate('cart_id')
        let totalRevenue = 0
        if(orders.length > 0 ){
            for(const order of orders){
                totalRevenue += order.cart_id.amount
            }
        }

        // todays sales revenue
        const today = new Date(); // Get the current date
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); 

        const todayOrders =  await Order.find({ store_id: storeId,
            date: {
              $gte: today, // Greater than or equal to today
              $lt: tomorrow, // Less than the next day (midnight)
            }
          }).populate('cart_id')

          let todayTotalRevenue = 0
          if(todayOrders.length > 0){
            for(const order of todayOrders){
                todayTotalRevenue += order.cart_id.amount
            }
          }

        //weekly sales
        const startOfWeek = new Date(today); 
        startOfWeek.setHours(0, 0, 0, 0);

        // Calculate the number of days to subtract to get to the previous Sunday
        const daysToSunday = today.getDay();
        startOfWeek.setDate(today.getDate() - daysToSunday);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to Saturday

        const weekly  = await Order.find({store_id:storeId,
            date: {
                $gte: startOfWeek, 
                $lte: endOfWeek,
            },
        }).populate('cart_id')

        let weekTotalRevenue = 0
          if(weekly.length > 0){
            for(const order of weekly){
                weekTotalRevenue += order.cart_id.amount
            }
          }


    const data = {
        total_orders_completed: orders.length,
        total_revenue: totalRevenue,
        today_sales: todayTotalRevenue,
        today_orders: todayOrders.length,
        week_sale:weekTotalRevenue,
        week_orders: weekly.length

    }
    return data
        
    } catch (error) {
       throw new Error(`Error getting props for store dashboard ${error.message}`) 
    }
}


async function updateStoreProfile(storeId, name, bio, rating){
    try {
        const store = await Store.findById(storeId)
        store.name = name || store.name
        store.bio = bio|| store.bio
        store.rating = rating || store.rating

        await store.save()
        return store
        
    } catch (error) {
        throw new Error(`Error updating store profile ${error.message}`)
    }
}


async function deleteStore(storeId){
    try {
        await Cart.deleteMany({store_id:storeId})
        await Image.deleteMany({store_id:storeId})
        await Order.deleteMany({store_id:storeId})
        await Product.deleteMany({store_id:storeId})
        await Review.deleteMany({store_id:storeId})
        await Store.deleteOne({store_id:storeId})
        return true
    } catch (error) {
        throw new Error(`Error deleting store ${error.message}`)
    }
}




module.exports={generateToken,getUserById, findAndVerifyUserCredentials , addUserToDb, checkIfUserIsRegistered,
addUserToDb, googleAuth, getUserStore, addUpdateStoreImage, checkUserHasOwnStore, dashboardProps, updateStoreProfile,
deleteStore}