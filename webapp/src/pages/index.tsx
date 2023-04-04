
import { Inter } from 'next/font/google'
import axios from 'axios'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState<any>([])

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`http://127.0.0.1:5000/api/check_inventory/${name}/${quantity}/`, {
    })
    .then((response) => {
      setMessage(response.data.message);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(()=>{
    const call = async ()=>{
     let product = await axios.get('http://127.0.0.1:5000/api/products')
     console.log(product)
     setProducts(product.data)
    }
    call()
   },[])


  return (
    <div className="w-screen h-screen items-center justify-center flex flex-col">
      <form className='max-w-xl w-full flex flex-col space-y-2' onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" placeholder="Number" className="input input-bordered w-full max-w-xs" value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
        </label>
        <br />
        <button className='btn btn-info' type="submit">Check Inventory</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
