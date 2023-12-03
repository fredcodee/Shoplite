import React from 'react'
import sample1 from '../assets/images/sample1.png';

const MyOrderLists = ({orders}) => {
    const imageSrc = import.meta.env.VITE_MODE == 'Production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV

    function formatDateTime(timestamp) {
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        };
    
        return new Date(timestamp).toLocaleString('en-US', options);
      }

    return (
        <div>
            {orders.length > 0 ? 
            (orders?.map((order, index)=>(
                <div className='border-solid border-2 border-gray-100 rounded-md mb-4 ' key={index}>
                    <span className='text-green-600 pl-2'><a href={`/store/${order.store_id.name}`}>Store: {order.store_id.name}</a></span>

                    <div className="grid grid-cols-5">
                        <div className='... p-3'>
                            <img src={`${imageSrc}/images/${order.cart_id.product_id.images[0].name}` || sample1} alt="" className='w-24' />
                        </div>
                        <div className='... text-xl'>
                            <p>{order.cart_id.product_id.name}</p>
                        </div>
                        <div className='... text-xl text-green-600'>
                            <p>$ <span>{order.cart_id.amount}</span></p>
                        </div>
                        <div className='... text-xl'>
                            <p>Quantity <span>{order.cart_id.quantity}</span></p>
                        </div>
                        <div>
                            <p>Order was placed on: <span className='font-bold'>{formatDateTime(order.date)}</span></p>
                            <p>Order Status: <span className={order.status === 'completed' ? 'text-green-800' : 'text-orange-500'} >{order.status}</span></p>
                        </div>

                    </div>
                    <div className='text-center text-orange-500 hover:cursor-pointer hover:text-green-600'>
                        <a href={`/review/product/${order.cart_id.product_id._id}`}>Review Product & Rate Store </a>
                    </div>

            </div>
            ))) : <div> <p>You have no orders yet  ...</p></div>}
        </div>
    )
}

export default MyOrderLists