import React from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { removeWishlistItem } from '../Redux/wishlist';
import { addToCart } from '../Redux/cartSlice';




function Wishlist() {
  const userWishList = useSelector(state => state.wishlistReducer)
  const userCart=useSelector(state=>state.cartReducer)

  const dispatch =useDispatch()
  console.log(userWishList);

      const handleCart=(product)=>{
  
           const existingProduct = userCart.find(item=>item.id==product.id)
  
          if(existingProduct){
              alert("product added to cart")
              dispatch(addToCart(product))
              dispatch(removeWishlistItem(product?.id))
          }
          else{
  
              dispatch(addToCart(product))
              dispatch(removeWishlistItem(product?.id))
  
          }

        }
  
  
  return (

    <>

      <Header />

      {
        userWishList?.length>0 ?
          <div className='ms-5' style={{marginTop:'110px' }}>
            <h3 className='text-danger ms-2 mb-3'>Your Wishlist</h3>

            <Row className='container mt-3'>
              {
                userWishList?.map(product => (
                  <Col sm={12} md={6} lg={4}>

                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={product?.thumbnail} height={250} />
                      <Card.Body className='text-center'>
                        <Card.Title>{product?.title}</Card.Title>
                        <div className='d-flex justify-content-between mt-2'>
                          <button onClick={()=>dispatch(removeWishlistItem(product?.id)) }className='btn'><i className="fa-solid fa-heart-circle-xmark text-danger fa-xl"></i></button>
                          <button  onClick={()=>dispatch(handleCart(product))} className='btn'><i className="fa-duotone fa-solid fa-cart-plus text-success fa-xl"></i></button>
                        </div>

                      </Card.Body>
                    </Card>
                  </Col>
                ))
              }
            </Row>

          </div>
          :
          <div className='d-flex-col'>
             
            <img style={{marginLeft:'457px', height:'500px'}} src="https://img.freepik.com/premium-vector/empty-cart-concept-illustration_108061-1600.jpg" alt="" />
            <h2 className='text-danger text-center '>Your wishlist is empty</h2>
          </div>
      }
    </>
  )
}

export default Wishlist



