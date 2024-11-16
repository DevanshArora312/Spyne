import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom'
import { setToken } from '../redux/slices/auth';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/isLoggedIn`,{method:"GET",headers:{"Authorization" : "application/json"}})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                navigate('/');
            }
        })
        .catch(err => {
            alert(err.message)
        })
    },[dispatch,navigate,token])
    const [formData,setFormData] = useState({
        email : "",
        password : "",
        username : ""
    });
    const changeHandler = (e) => {
        setFormData (prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    const submitHandler = e =>{
        e.preventDefault();
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/signup`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify(formData)})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                dispatch(setToken(data.token));
                navigate('/');
            } else{
                alert(data.message)
            }
        })
        .catch(err => {
            console.log(err.message);
        })
    }
  return (
    <div className='w-full h-screen bg-transparent flex justify-center items-center' >
        <div 
        style={{background:"url(/login-bg.jpg)",backgroundSize:"cover",filter:"brightness(70%)"}}
        className='absolute top-0 left-0 w-screen h-screen '
        />
        <div className= 'min-w-[280px] z-10 w-[40%] flex flex-col px-4 py-8 justify-center items-center backdrop-blur-md bg-white/10 rounded-2xl gap-y-10'>
            <h1 className='sm:text-[30px] text-[20px] text-white'>Register a new account!</h1>
            <form className='w-full h-full flex flex-col items-center justify-between gap-y-10' onSubmit={submitHandler}>
                <input className='text-white/50 p-2 w-[90%] h-10 bg-transparent/60 border-b-2 rounded-md focus:outline-none duration-500' type='text' name='username' placeholder='Username' onChange={changeHandler} value={formData.username}/>
                <input className='text-white/50 p-2 w-[90%] h-10 bg-transparent/60 border-b-2 rounded-md focus:outline-none duration-500' type='email'  placeholder='Email' name='email' value={formData.email} onChange={changeHandler} />
                <input className='text-white/50 p-2 w-[90%] h-10 bg-transparent/60 border-b-2 rounded-md focus:outline-none duration-500' type='password'  placeholder='Password' name='password' value={formData.password} onChange={changeHandler}/>
                <input className='bg-black text-white hover:text-black hover:bg-white duration-500 focus:outline-none hover:shadow-lg hover:shadow-white rounded-xl p-3' type='submit' />
            </form>
            <div className='text-white text-[14px] sm:text-[18px] gap-x-1 mt-2 flex'> 
                <p>
                Already have an account?
                </p> 
                <Link to="/login" className='hover:opacity-60 underline'>
                    Login!
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Signup;

