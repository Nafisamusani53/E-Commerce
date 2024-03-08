import React, {useState} from 'react'
import axios from "axios"

const Signup = () => {
    const[data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        address:"",
        city:"",
        country:"",
        postalCode:"",
        phoneNumber:"",
    })

    const changeHandler=(event)=>{
        setData((prev)=>(
            {...prev,
            [event.target.name] : event.target.value
            }
        ))
    }

    const[role, setRole] = useState("Buyer")
    
    const submitHandler=async(event)=>{
        event.preventDefault();
        data.role = role;

        try {
            data.role = role;
            const response = await axios.post("http://localhost:4000/api/v1/auth/signup", data);
            console.log(response); // Log the entire response object to see its structure
    
            // Assuming the response contains a property named 'success'
            if (response.data.success) {
                console.log("Account created successfully");
            }
        } catch (error) {
            console.log("Error while creating account");
        }
    }
  return (
    <div>
      <form onSubmit={submitHandler}>
      <div className='text-richblack-200 flex py-1 px-1 gap-2 text-md w-fit
                    bg-richblack-800 rounded-full items-center justify-between
                    shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset] -mb-4'>
            <p 
                onClick={()=>{setRole("Buyer")}}
                className={`${role === "Buyer" ? "bg-richblack-900 text-richblack-5" : "bg-richblack-800"} 
                            px-5 py-2 rounded-full`}
            >Student</p>
            <p 
                onClick={()=>{setRole("Vendor")}}
                className={`${role === "Vendor" ? "bg-richblack-900 text-richblack-5" : "bg-richblack-800"} 
                px-5 py-2 rounded-full`}
            >Instructor</p>
        </div>
      <div>
            <label>
                <p >First Name <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='firstName'
                    type='text'
                    placeholder='Enter first Name'
                    value={data.firstName}
                    onChange={changeHandler} 
                />
            </label>
            <label>
                <p >Last Name <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='lastName'
                    type='text'
                    placeholder='Enter last Name'
                    value={data.lastName}
                    onChange={changeHandler} 
                />
            </label>
        </div>
        <div>
            <label>
                <p>Email Address <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='email'
                    type='email'
                    placeholder='Enter email address'
                    value={data.email}
                    onChange={changeHandler} 
                />
            </label>
        </div>
        <div>
            <label>
                <p>Create Password <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='password'
                    type='password'
                    placeholder='Enter password'
                    value={data.password}
                    onChange={changeHandler} 
                />
            </label>

            <label>
                <p>Confirm Password <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm password'
                    value={data.confirmPassword}
                    onChange={changeHandler} 
                />
            </label>
        </div>
        <div>
            <label>
                <p>Address <sup className='text-pink-200'>{` *`}</sup></p>
                <textarea
                    required
                    name='address'
                    placeholder='Enter Address'
                    value={data.address}
                    onChange={changeHandler} 
                />
            </label>
        </div>
        <div>
            <label>
                <p>City <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='city'
                    type='text'
                    placeholder='Enter city'
                    value={data.city}
                    onChange={changeHandler} 
                />
            </label>

            <label>
                <p>Country <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='country'
                    type='text'
                    placeholder='Enter Country'
                    value={data.country}
                    onChange={changeHandler} 
                />
            </label>
        </div>

        <div>
            <label>
                <p>PostalCode <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='postalCode'
                    type='text'
                    placeholder='Enter PostalCode'
                    value={data.postalCode}
                    onChange={changeHandler} 
                />
            </label>

            <label>
                <p>Phone Number <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='phoneNumber'
                    type='digit'
                    max = {10}
                    placeholder='Enter Phone Number'
                    value={data.phoneNumber}
                    onChange={changeHandler} 
                />
            </label>
        </div>
        <button type='submit'>
            <div className='bg-yellow-50 text-richblack-900 
            shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset] rounded-md px-6 py-3 font-bold'>
                Create Account
            </div>
        </button>
      </form>
    </div>
  )
}

export default Signup
