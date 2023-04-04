import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`http://127.0.0.1:8000/server/check_inventory/${name}/${quantity}/`, {
    })
    .then((response) => {
      setMessage(response.data.message);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  const [products, setProducts] = useState<any>([])
  useEffect(()=>{
    const call = async ()=>{
     let product = await axios.get('http://127.0.0.1:8000/server/product')
     console.log(product)
     setProducts(product.data)
    }
    call()
   },[])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
        </label>
        <br />
        <button type="submit">Check Inventory</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
