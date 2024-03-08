import React, {useEffect,useState} from 'react'
import Card from './Card';
import filter from "../data/filters"
import { FaPlus } from "react-icons/fa6";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const Home = () => {
    const [product, setProduct] = useState()
    const fetchData = async() => {
        try{
            const data = await axios.get("http://localhost:4000/api/v1/product/getAllProduct");
        setProduct(data.data.products)
        }
        catch(error){
            console.log("error in get request")
        }
    }
    useEffect(()=>{
        fetchData();

    },[])
  return (
    <div className='flex flex-col'>
      <div className='flex py-10 px-6'>
        <p>Sofas</p>
        <div className='flex gap-6 p'>

        </div>
      </div>

      <div className='flex flex-col py-4 px-6'>
        <div>
            <button>Sort by alphbets</button>
            <button>Sort by price</button>
        </div>
        <div className='flex justify-between'>
            <div>
                <div className='flex gap-10 items-center'>
                    <HiOutlineAdjustmentsHorizontal/>
                    <p>Filters</p>
                </div>
                {
                    filter.map((item, index) => (
                        <div className='px-4 py-2 flex justify-between items-center'> 
                            <p>
                                {filter.name}
                            </p>
                            <FaPlus />

                        </div>
                    ))
                }
            </div>

            <div className='flex gap-4'>
                {
                    product.map((item,index) => (
                        <Card image={item.imageUrl} name={item.productName} price={item.price} key={index}/>                    
                    ))
                }
            </div>

        </div>
      </div>
    </div>
  )
}

export default Home
