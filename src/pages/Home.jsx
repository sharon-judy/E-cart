import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import Pagination from '../components/Pagination';


// ?????????
Header
function Home() {
  const [currentPage,setCurrentPage]=useState(1)
  const cardPerPage=6



  const{allProducts,pending,error} = useSelector(state=>state.productReducer)
  console.log(allProducts,pending);

  const endingIndex=currentPage*cardPerPage
  const startingindex=endingIndex-cardPerPage
  const currentProducts=allProducts.slice(startingindex,endingIndex)
  

  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  
  return (

    <>

      <Header insideHome={true} />

     { 
     pending?

     <div className='text-center mt-5 fw-bolder'>
      <Spinner animation="border" variant="danger" />

     </div>

     :
      
      <div className='ms-5' style={{ marginTop: '50px' }}>
        <Row className='container ' style={{marginTop:'110px' }}>
          {
           currentProducts?.length>0?
           currentProducts?.map(product=>(
              <Col sm={12} md={6} lg={4} className='mb-3'>

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product?.thumbnail} height={250} />
                <Card.Body className='text-center'>
                  <Card.Title className='fw-bold'>{product?.title.slice(0,13)}...</Card.Title>
                  <Link to={`/View/${product?.id}`} className="text-danger text-decoration-none fw-bold">
                    View more..</Link>
  
                </Card.Body>
              </Card>
            </Col>
            ))
          
        :
        <div className='text-danger'>Nothing to display</div>
        }
        </Row>
      </div>
      }

      {

        currentProducts?.length>0 &&
        <Pagination totalProducts={allProducts?.length} cardPerPage={cardPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      }
    </>
  )
}

export default Home