import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
const CreateCar = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)
    const [isLogged,setLogged] = useState(false);
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    
    const imageChangeHandler = (e) => {
        const files = Array.from(e.target.files);
        setImages(files); 
    };
    const [formData,setFormData] = useState({
        title :"",
        tags:"",
        desc: "",
    })
    const changeHandler = (e) => {
        setFormData( prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }
    const SubmitHandler = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error('Please select at least one image!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }
        const formDataToSend = new FormData();

        formDataToSend.append('title', formData.title);
        formDataToSend.append('tags', formData.tags);
        formDataToSend.append('desc', formData.desc);

        images.forEach((image) => {
            formDataToSend.append('images', image); 
        });

        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/create-car`,{
                method:"POST",
                headers:{"Authorization":"Bearer "+token},
                body:formDataToSend
        })
        .then(res =>{
            return res.json();
        }).then(data=>{
            if (data.success){
                toast.success('Created Successfully !', {
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
            if(err.message == "t2 is not a function"){
                return;
            }
            toast.error('Some Error Occured!'+err.message, {
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
                toast.info('Login to add a car!', {
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
        })
        .catch(err=> {
            console.log("here",err.message);
        })
    },[token,dispatch,navigate])
    useEffect(()=>{
        toast.onChange(v => {
            if(v.status === "removed" && v.type === 'success'){
                navigate("/");
            }
            else if(v.type=='info' && v.status === "removed"){
                navigate("/login");
            }
        })
        return()=>{
            toast.onChange(undefined)
        }
    },[navigate])
    // console.log(formData)
    
    return (  
        <div className="w-full h-full">
            <NavBar isLogged={isLogged} show={false}/>
            <h1 className="text-2xl px-[15%] my-5 mt-20">
                Add a New Car!
            </h1>
            <form className="text-xl w-full flex flex-col gap-10 py-10 px-[10%] justify-center items-center" onSubmit={SubmitHandler}>
                <input className="sm:min-w-[0px] min-w-[200px] rounded-lg border-2 focus:outline-none p-2 w-2/3" placeholder="Enter Title" id ="title" name="title" value={formData.title} onChange={changeHandler}/>
                <input className="sm:min-w-[0px] min-w-[200px] rounded-lg border-2 focus:outline-none p-2  w-2/3" placeholder="Tags" id ="tags" name="tags" value={formData.tags} onChange={changeHandler}/>
                <textarea className="sm:min-w-[0px] min-w-[200px] text-md rounded-lg border-2 min-h-[300px] focus:outline-none p-2 resize-none w-2/3" placeholder="Enter Descreption" id ="desc" name="desc" value={formData.desc} onChange={changeHandler}/>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={imageChangeHandler}
                    className="w-2/3 border-2 rounded-lg p-2"
                />
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
 
export default CreateCar;