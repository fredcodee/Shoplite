import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faTruckFast } from '@fortawesome/free-solid-svg-icons'
import Api from '../Api';

const StoreOrdersLists = ({ordersList}) => {
    const [error, setError] = useState(null)
    const storeId = `${localStorage.getItem('store')}`
    const token = localStorage.getItem('token').replace(/"/g, '');

    const updateStatus = async(orderId, status)=>{
        try {
            if(status != " "){
                const data = {
                    storeId:storeId,
                    orderId:orderId,
                    status: status
                }
                await Api.post('/api/store/order/status',data,{
                    headers:{
                        Authorization:token
                    }
                })
                .then((response)=>{
                        window.location.reload();
                })
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }
  return (
    <div>
        <div>
        {error && <div className='text-red-500 p-2 text-center'><p>{error}</p></div>}
              {ordersList.length > 0 ? (
                (ordersList.map((order, index)=>(
                    <div  key ={index} className='border-solid border-2 border-gray-100 rounded-md mb-2 '>
                      <div className="grid grid-cols-5 gap-5">
                          <div className='... text-xl'>
                              <p><span><FontAwesomeIcon icon={faUser} style={{ color: "#3e7a24", }} className='pr-2'/></span>{order.email}</p>
                          </div>
                          <div className='... text-xl'>
                              <p>{order.cart_id.product_id.name}</p>
                          </div>
                          <div className='... text-xl text-green-600'>
                              <p>$ <span>{order.cart_id.amount}</span></p>
                          </div>
                          <div className='... text-xl'>
                              <p>Quantity <span> {order.cart_id.quantity}</span></p>
                          </div>
                          <div>
                              <span><FontAwesomeIcon icon={faTruckFast} style={{ color: "#31511f", }} /></span>
                              <select name="" id="" value={order.status} onChange={(e) => updateStatus(order._id, e.target.value) } >
                                  <option value=" ">Update status</option>
                                  <option value= "processing" >Processing</option>
                                  <option value="shipped"> Shipping</option>
                                  <option value="completed"> Completed</option>
                                  <option value="cancelled"> Cancelled</option>
                              </select>
                          </div>
                      </div>
                  </div>
                )))           
              ) : (<div> <h1 className='text-center pt-6 text-cyan-800 text-lg'>No ordersList yet ...</h1></div>)
              }

            </div>
    </div>
  )
}

export default StoreOrdersLists