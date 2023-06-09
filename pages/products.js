import React from 'react'
import Card from '../components/Card'


export async function getServerSideProps(context) {
  const products = await fetch('https://www.screentechnicals.com/api/ecommerce/products', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });
  const data = await products.json();
  
  return {
    props: {
      data,
    },
  }
}

const Products = ({ data }) => {
  return (
    <div className='w-full h-[88vh] overflow-y-auto p-5'>
        <div className='flex justify-center items-center flex-wrap space-x-5 md:space-y-5'>
            {
              data?.map(product => <Card key={product.id} product={product} />)
            }
        </div>
    </div>
  )
}

export default Products