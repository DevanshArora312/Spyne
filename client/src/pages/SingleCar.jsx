import { useEffect, useState } from "react";
import { useParams,useNavigate, Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import deleteHandler from "../hooks/useTodoDelete"
import { useDispatch, useSelector } from "react-redux";
// import {setOne} from "../redux/slices/cars"
import { setToken } from "../redux/slices/auth";

const SingleCar = () => {
    const {id} = useParams();
    const navigate  = useNavigate();
    const [deleted,setDeleted] = useState(false); 
    const [car,setCar] = useState("null")
    const token = useSelector(state => state.auth.token);
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
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/cars/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(data)
            setCar(data.data)
        })
        .catch(err=> {
            console.log(err.message);
            // navigate("/login");
        })
    },[dispatch,id])


    useEffect(()=>{
        toast.onChange(v => {
            if(v.status === "removed"  && v.type === "success"){
                navigate("/");
            }
        })
        return()=>{
            toast.onChange(undefined)
        }
    },[navigate])
    return ( 
        <>
        <NavBar isLogged={isLogged} show={false}/>

        <div className="sm:px-[15%] px-[8%] py-[15vh]">
            {
                car && !deleted &&
                <>
                    <div className="absolute max-sm:hidden flex-col h-[99vh] w-[10vw] z-10  top-0 right-0 justify-center flex items-center gap-y-32">
                        <Link to={`/update-cars/${id}`} className="text-white text-[20px] bg-blue-500 py-2 px-4 rounded-lg">
                            Edit
                        </Link>
                        <button 
                            className="text-white text-[20px] bg-red-500 py-2 px-4 rounded-lg"
                            onClick={() => {
                                deleteHandler(id,setDeleted,token)
                                setDeleted(true);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </>
            }
            {
                !car && <div>Loading....</div>
            }
            {
                deleted && <div> Redirecting... </div>
            }
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
        </>
    );
}
 
export default SingleCar;