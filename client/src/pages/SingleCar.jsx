import { useEffect, useState } from "react";
import { useParams,useNavigate, Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import deleteHandler from "../hooks/useCarDelete"
import { useDispatch, useSelector } from "react-redux";
// import {setOne} from "../redux/slices/cars"
import { setToken } from "../redux/slices/auth";
import ImageSlider from "../components/ImageSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleCar = () => {
    const {id} = useParams();
    const navigate  = useNavigate();
    const [deleted,setDeleted] = useState(false); 
    const [car,setCar] = useState("null")
    const token = useSelector(state => state.auth.token);
    const [user,setUser] = useState(null)
    const dispatch = useDispatch();
    useEffect(()=>{

        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/isLoggedIn`,{method:"GET",headers:{"Authorization" : "Bearer " + token}})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                setUser(data.reqUserId);
            } else{
                setUser(null);
                dispatch(setToken(null));
            }
        })
        .catch(err=> {
            console.log("here",err.message);
        })
    },[token,dispatch])
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/get-car/${id}`)
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
            if(v.status == "removed"  && v.type == "success"){
                navigate("/");
            }
        })
        return()=>{
            toast.onChange(undefined)
        }
    },[navigate])
    return ( 
        <>
        <NavBar isLogged={user} show={false}/>

        <div className="w-[99vw] sm:px-[15%] px-[8%] py-[15vh]">
            {
                car && !deleted &&
                <>  
                    <div className="w-full">
                        <ImageSlider imgs={car.images} />
                    </div>
                    <div className="w-full">
                        <h1 className="text-[30px] font-bold">{car ? car.title : "Car title"}</h1>
                        <h3 className="text-[25px] font-semibold mt-5 text-slate-400">Description: </h3>
                        <p className="text-[20px]">
                            {
                                car ? car.desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, quidem."
                            }
                        </p>
                        <h3 className="text-[20px] font-semibold mt-5 text-slate-400">Tags: </h3>
                        <p className="text-[17px]">
                            {
                                car ? car.tags : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, quidem."
                            }
                        </p>
                    </div>

                    {
                        user == car.byUser ?
                        <div className="fixed max-sm:hidden flex-col h-[99vh] w-[10vw] z-10  top-0 right-0 justify-center flex items-center gap-y-32">
                            <Link to={`/update-car/${id}`} className="text-white text-[20px] bg-blue-500 py-2 px-4 rounded-lg">
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
                        : null
                    }
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