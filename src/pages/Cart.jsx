import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, emptyCart, increment, removeCartItem } from '../Redux/cartSlice'
import { Link, useNavigate } from 'react-router-dom'





function Cart() {
  const usercart=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  const TotalPrice=usercart.map(pro=>pro.totalPrice).reduce((p1,p2)=>p1+p2,0)
  console.log(TotalPrice);
  
  const navigate = useNavigate()

  const handleDecrement=(productId)=>{

    const existingProduct = usercart.find(item=>item.id==productId)

    if(existingProduct.quantity>1){
      dispatch(decrement(productId))

    }
    else{
      dispatch(removeCartItem(productId))
    }

  }
  
  const handlecheckOut=()=>{
    alert("your order placed successfully")
    dispatch(emptyCart())
    navigate('/')
  }

  
  return (
    <>
      <Header />

      <div className='container ' style={{marginTop:'110px' }}>
      <h3>Cart Summary</h3>
{    
   usercart?.length>0 ?

        <div className='row'>
          <div className='col-lg-8'>

            <table className='table'>
              <thead className='fw-bold'>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
              { usercart?.map((item,index)=>(
                 <tr>
                 <td>{index+1}</td>
                 <td>{item.title}</td>
                 <td><img width={50} src={item?.thumbnail} alt="" /></td>
                 <td>
                   <button onClick={()=>handleDecrement(item?.id)} className='btn fw-bold text-dark'>-</button>
                   <input type="text" className='border border-none' value={item.quantity} name='' id='' style={{width:20}}  readOnly />
                   <button onClick={()=>dispatch(increment(item?.id))} className='btn fw-bold text-dark'>+</button>
                 </td>
                 <td>{item?.totalPrice}</td>
                <td><button onClick={()=>dispatch(removeCartItem(item?.id))}   className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
               </tr>
              ))}
             
            
              </tbody>
            </table>

            <div className='float  '>
              <button onClick={()=>dispatch(emptyCart())} className='btn bg-danger '>Empty Cart</button>
              <Link to ={'/'}><button className='btn bg-info mx-5'>Shope More</button></Link>

            </div>

          </div>
          <div className='col-lg-4 mt-4'>
            <div className='card p-4 shadow'>
              <h4>Total Items:{usercart?.length}</h4>
              <h3>Total Amount: <span className='text-danger'>${Math.floor(TotalPrice)}</span></h3>
             <button onClick={handlecheckOut} className='btn fw-bold bg-warning'>checkout</button>

            </div>
          </div>
        </div>
      :
      <div>
        <h2 className='text-danger text-center mt-5'>Your Cart is Empty</h2>
      </div>  
      }

      </div>

    </>   
  )
}

export default Cart