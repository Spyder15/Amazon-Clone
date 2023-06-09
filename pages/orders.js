import { collection, orderBy, query } from 'firebase/firestore'
import React from 'react'
import OrderCard from '../components/OrderCard'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

const Orders = ({ user }) => {

  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  const [orderSnapshots, loading] = useCollection(q);
  console.log(orderSnapshots?.docs?.filter(order => order.data().uid === user?.uid));
  return (
    <div className='w-full h-[88vh] overflow-y-auto p-10 space-y-5'>
        {
          !loading ? (
           orderSnapshots?.docs?.filter(order => order.data().uid === user?.uid)?.length > 0 ?
           orderSnapshots?.docs?.filter(order => order.data().uid === user?.uid)?.map(order => <OrderCard key={order?.id} order={order} />) : "NO ORDERS"
          ) : null
        }
    </div>
  )
}

export default Orders