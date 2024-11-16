import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from "../redux/slices/auth";
const UpdateCar = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)
    const [formData,setFormData] = useState({
        title :"",
        desc:"",
    })
    const {id} = useParams();
    const [isLogged,setLogged] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/isLoggedIn`,{method:"GET",headers:{"Authorization" : "Bearer " + token}})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                setLogged(true);
            } else{
                setLogged(false);
                dispatch(setToken(null));
            }
        })
        .catch(err=> {
            console.log("here",err.message);
        })
    },[token,dispatch])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/get-todo/${id}`, {method: "GET" , headers : {"Authorization" : "Bearer "+token}})
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(data)
            setFormData(data.data);
        })
    },[id,token])
    const updateHandler = async (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/update-todo/${id}`, {method: "PUT" , headers : {"Content-Type" : "application/json","Authorization":'Bearer ' + token} , body:JSON.stringify({formData})})
        .then (res =>{
            return res.json()
        })
        .then(data => {
            if (data.success){
                toast.success('Updated Successfully !', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            else{
                toast.error('Some Error Occured!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }

        }).catch(err => {
            toast.error(`Some Error Occured! ${err.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }
    const changeHandler = (e) => {
        setFormData (prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    useEffect(()=>{
        toast.onChange(v => {
            if(v.status === "removed" && v.type === 'success'){
                navigate("/");
            }
        })
        return()=>{
            toast.onChange(undefined)
        }
    },[navigate])
    return (  
        <div className="w-full h-full">
            <NavBar isLogged={isLogged} show={false}/>
            <h1 className="text-2xl px-[15%] my-5 mt-20">
                Update a Task!
            </h1>
            <form className="text-xl w-full flex flex-col gap-10 py-10 px-[10%] justify-center items-center" onSubmit={updateHandler}>
                <input className="sm:min-w-[0px] min-w-[200px] rounded-lg border-2 focus:outline-none p-2 w-2/3" placeholder="Enter Title" id ="title" name="title" value={formData.title} onChange={changeHandler}/>
                <input className="sm:min-w-[0px] min-w-[200px] rounded-lg border-2 focus:outline-none p-2  w-2/3" placeholder="Written by" id ="writtenBy" name="writtenBy" value={formData.writtenBy} onChange={changeHandler}/>
                <textarea className="sm:min-w-[0px] min-w-[200px] text-md rounded-lg border-2 min-h-[300px] focus:outline-none p-2 resize-none w-2/3" placeholder="Enter Body" id ="body" name="body" value={formData.body} onChange={changeHandler}/>
                <input type="submit" className="rounded-xl min-w-[100px] text-white bg-black cursor-pointer px-5 py-3 hover:opacity-70"/>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="dark"
            />
        </div>
    );
}
 
export default UpdateCar;