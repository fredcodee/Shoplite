import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import sample1 from '../assets/images/sample1.png';
import Api from '../Api';

const CartPage = ({setOrderObjects}) => {
  const [cart, setCart] = useState([])
  const [success, setSuccess] = useState(null)
  const token = localStorage.getItem('token').replace(/"/g, '')
  const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV
  const [selectedCarts, setSelectedCarts] = useState([]);
  const [total, setTotal] = useState(0)
  const history = useNavigate()

  useEffect(() => {
    getCart()
  }, [])

  useEffect(()=>{
    calculateTotalExpensices()
  }, [selectedCarts])

  const getCart = async () => {
    try {
      await Api.get('/api/user/all/carts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.status == 200) setCart(response.data)
        })

    } catch (error) {
      setError(error.message)
    }
  }

  //delete single
  const deleteCart = async (cartId) => {
    try {
      await Api.delete('/api/user/cart/delete', {
        data: { cartIds: [cartId] },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => {
          if (response.status == 200) {
            setSuccess("Cart removed")
            setError(null);
            getCart()
          }
        })
    } catch (error) {
      setError(error.message)
    }
  }
  //delete all
  const deleteAllCart = async () => {
    try {
      if (cart.length === 0) {
        setSuccess(null)
        setError("you have no cart to delete")
      } else {
        const allCartIds = cart.map((cartItem) => cartItem._id);
        await Api.delete('/api/user/cart/delete', {
          data: { cartIds: allCartIds },
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setSuccess("Carts deleted successfully");
        setError(null);
        getCart();
      }
    } catch (error) {
      setSuccess(null)
      setError(error.message)
    }
  }

  const handleCheckboxChange = (cart) => {
    const cartExists = selectedCarts.some(selectedCart => selectedCart._id === cart._id);
    if (cartExists) {
      setSelectedCarts(selectedCarts.filter(selectedCart => selectedCart._id !== cart._id));
    } else {
      setSelectedCarts([...selectedCarts, cart]);
    }
  };

  const calculateTotalExpensices = ()=>{
    if(selectedCarts.length !== 0){
      let total = 29 + 2
      for(const product of selectedCarts){
        total += product.amount
      }
      setTotal(total)
    }
    else{
      setTotal(0)
    }
  }

  const navigateToCheckout = () => {
    if(selectedCarts.length > 0){ 
    setOrderObjects(selectedCarts)
    history('/checkout')}
  };

  return (
    <div className='container mx-auto pt-3'>
      <Navbar />
      <div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className='pt-3'>
                <a onClick={deleteAllCart} className='float-right hover: cursor-pointer'> <span><FontAwesomeIcon icon={faTrashCan} style={{ color: "#bf3d1d", }} className='pr-2' /></span>DELETE ALL</a>
                <span className='pl-2'>{cart.length} ITEM(S)</span><br />
                {cart.length > 0 ? (
                  (cart.map((cart, index) => (
                    <div className='border-solid border-2 border-gray-100 rounded-md mb-4 ' key={index}>
                      <label htmlFor={`option${index}`}></label>
                        <input type="checkbox" id={`option${index}`} name="options[]" value={cart._id} onChange={() => handleCheckboxChange(cart)} />
                        <span className='text-green-600 pl-2'><a href={`/store/${cart?.product_id?.store_id?.name}`}>{cart?.product_id?.store_id?.name}</a></span>
                        <div className='... text-sm'>
                          <p onClick={() => deleteCart(cart._id)} className=' text-red-600 hover:cursor-pointer'><span><FontAwesomeIcon icon={faTrashCan} style={{ color: "#bf3d1d", }} className='pr-2' />Remove</span></p>
                        </div>

                        <div className="grid grid-cols-4 gap-5">
                          <div className='... p-3'>
                            <img src={`${imageSrc}/images/${cart?.product_id?.images[0]?.name}` || sample1} alt="" className='w-24' />
                          </div>
                          <div className='... text-xl'>
                            <p>{cart?.product_id?.name}</p>
                          </div>
                          <div className='... text-xl text-green-600'>
                            <p>$ <span>{cart?.amount}</span></p>
                          </div>
                          <div className='... text-xl'>
                            <p>Quantity: <span>
                            {cart?.quantity}</span></p>
                          </div>
                        </div>
                      <br />
                    </div>
                  )))
                ) : (<div className='text-center'> Nothing in your cart yet ... </div>)}
            </div>
          </div>
          <div className="p-4 border-solid border-2 border-gray-100 rounded-md mt-4">
            <h1 className='text-center text-2xl font-bold'>Order Summary</h1>
            <div>
              <div className='text-xl'>
                <p>Total Items: {selectedCarts.length}</p>
                <p>Shipping Fee: $<span>29.00</span></p>
                <p>Service payment: $2</p>
                <hr />
              </div>
              <p className='text-2xl font-bold'>Subtotal: $<span>{total}</span></p>
              <div className='pt-4 text-center'>
                <button type="button" 
                  onClick={() => navigateToCheckout()}
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover-bg-green-700 dark:focus:ring-green-800">PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
