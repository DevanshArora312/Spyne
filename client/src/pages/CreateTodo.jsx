import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import useTodoCreate from "../hooks/useTodoCreate"
import { useSelector } from "react-redux";
const CreateTodo = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)
    const [formData,setFormData] = useState({
        title :"",
        writtenBy:"",
        body: "",
        liked : null
    })
    const changeHandler = (e) => {
        setFormData( prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        useTodoCreate(formData,token);
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
    },[toast])
    // console.log(formData)
    return (  
        <div className="w-full h-full">
            <NavBar/>
            <h1 className="text-2xl px-[15%] my-5 mt-20">
                Create a New Task!
            </h1>
            <form className="text-xl w-full flex flex-col gap-10 py-10 px-[10%] justify-center items-center" onSubmit={submitHandler}>
                <input className="sm:min-w-[0px] min-w-[200px] rounded-lg border-2 focus:outline-none p-2 w-2/3" placeholder="Enter Title" id ="title" name="title" value={formData.title} onChange={changeHandler}/>
                <input className="sm:min-w-[0px] min-w-[200px] rounded-lg border-2 focus:outline-none p-2  w-2/3" placeholder="Written by" id ="writtenBy" name="writtenBy" value={formData.writtenBy} onChange={changeHandler}/>
                <textarea className="sm:min-w-[0px] min-w-[200px] text-md rounded-lg border-2 min-h-[300px] focus:outline-none p-2 resize-none w-2/3" placeholder="Enter Body" id ="body" name="body" value={formData.body} onChange={changeHandler}/>
                <input type="submit" className="rounded-xl text-white bg-black cursor-pointer px-5 py-3 hover:opacity-70"/>
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
 
export default CreateTodo;