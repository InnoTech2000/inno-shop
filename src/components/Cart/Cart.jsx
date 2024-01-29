import React from 'react'
import"./Cart.scss"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from 'react-redux';
import {removeItem, resetCart}  from "../../redux/cartReducer"
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";


function Cart() {

    // const data = [
    //     {
    //         id: 1,
    //         img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //         img: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //         title: "Long Sleeve Graphic T-shirt",
    //         isNew: true,
    //         oldPrice: 19,
    //         price: 12,
    //       },  {
    //         id: 2,
    //         img: "https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //         title: "Coat",
    //         isNew: true,
    //         oldPrice: 19,
    //         price: 12,
    //       },

    // ]

    const products = useSelector((state)=>state.cart.products);
    const dispatch = useDispatch();

    const TotalPrice = () => {
        let total = 0;
        products.forEach((item) => (total += item.quantity * item.price))
        return total.toFixed(2);
    }
    
    const stripePromise = loadStripe('pk_test_51OPLovI8Mj3tHMJb3mGqfcH1a53Bkfg3pDc15wGD7HYep3bal8Kcq2mGkOtca0yZU1SlG7C9FgtptIk5S5QM9fQy00ZZaPB4NB');
    
    const handlePayment = async () => {
        try {
          const stripe = await stripePromise;
          const res = await makeRequest.post("/orders", {
            products,
          });
          await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id,
          });
    
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className='cart' >
        <h1>Products in your cart</h1>
        {products?.map(item=>(
            <div className='item'  key={item.id} >
                <img src={ item.img} alt="" />
                /* process.env.REACT_APP_UPLOAD_TOKEN + */
                <div className='details'>
                    <h1>{item.title}</h1>
                    <p>{item.desc?.substring(0,100)}</p>
                    <div className='price'>
                        {item.quantity} x ${item.price}
                    </div>
                </div>
                <DeleteOutlinedIcon className='delete'  onClick={() => dispatch(removeItem(item.id))} />

            </div>
        ))}
        <div className='total'>
            <span>SUBTOTAL</span>
            <span>${TotalPrice()}</span>
        </div>
        <button onClick={handlePayment} >PROCEED TO CHECKOUT</button>
        <span className='reset' onClick={()=>dispatch(resetCart())} > Reset Cart </span>
    </div>
  )
}

export default Cart