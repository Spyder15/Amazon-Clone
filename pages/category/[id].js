import React from 'react'
import Card from '../../components/Card'


export async function getServerSideProps(context) {
    const searchVaule = context.query.id;
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
      searchVaule
    },
  }
}

const Category = ({ data, searchVaule }) => {
    const filteredData = data.filter((product)=> product.name.toLowerCase().includes(searchVaule) || product.category.toLowerCase().includes(searchVaule));
  return (
    <div className='w-full h-[88vh] overflow-y-auto p-5'>
        <div className='flex justify-center items-center flex-wrap md:space-y-0 space-y-5'>
            {
              filteredData?.length > 0 ? filteredData?.map(product => <Card key={product.id} product={product} />) : <p>No Results Found !</p>
            }
        </div>
    </div>
  )
}

export default Category