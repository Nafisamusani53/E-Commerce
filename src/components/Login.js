import React,{useState} from 'react'
import axios from "axios"

const Login = () => {
    const[data, setData] = useState({
        email:"",
        password:""
    })

    const changeHandler = (event) => {
        setData((prev)=>(
            {
                ...prev,
                [event.target.name] : event.target.value
            }
        ))
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        console.log(data);
        // axios call
        const response = await axios.post("http://localhost:4000/api/v1/auth/login", data)
        if (response.data.success) {
            console.log("Loged In successfully");
        }

        // navigate to homepage
        setData({
            email:"",
            password:""
        })
    }
  return (
    <div>
      <form onSubmit={submitHandler}>
      <div className='flex flex-col gap-4 '>
       <div className='w-full'>
            <label>
                <p className='mb-1 text-md'>Email Address <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='email'
                    type='email'
                    placeholder='Enter Email'
                    value={data.email}
                    onChange={changeHandler}
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
            </label>
        </div>
        <div>
        <label>
                <p className='mb-1 text-md'>Password <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='password'
                    type='password'
                    placeholder='Enter Password'
                    value={data.password}
                    onChange={changeHandler}
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
            </label>
        </div>
       </div>
        
        <button type='submit'>
            <div className='bg-yellow-50 text-richblack-900 
            shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset] rounded-md px-6 py-3 font-bold'>
                Sign In
            </div>
        </button>

      </form>
    </div>
  )
}

export default Login
