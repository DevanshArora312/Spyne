import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard"
import { setCars } from "../redux/slices/cars";
const MyCars = () => {
    const [text,setText] = useState("");
    const token = useSelector(state => state.auth.token);
    const [isLogged,setLogged] = useState(false);
    const carsData = useSelector(state => state.cars.cars);
    const [cars,setCarsIn] = useState(carsData);
    const navigate = useNavigate();
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
                toast.info('Login to access your saved cars!', {
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
            if(v.status == "removed" & v.type == 'info'){
                navigate("/login");
            }
        })
        return()=>{
            toast.onChange(undefined)
        }
    },[navigate])
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/my-cars`,{method:"GET",headers:{"Authorization" : "Bearer " + token}})
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            if(data.success){
                // setCarsIn(data.data)
                dispatch(setCars(data.data))
            } else{
                // navigate('/login')
            }
        })
        .catch(err=> {
            console.log("here",err.message);
        })
    },[dispatch,token])
    useEffect(()=>{
        if(!carsData) return;
        console.log(carsData[0].tags)
        const newData = carsData.filter(one => one.title.includes(text) || one.desc.includes(text) || one.tags.includes(text) );
        setCarsIn(newData);
    },[text])
    return ( 
        <div className="w-screen overflow-x-hidden">
        <NavBar isLogged={isLogged} text={text} setText={setText} show={true}/>
        <div className="text-2xl flex flex-col justify-center items-start px-[15%] pt-20 w-full">
            <h1 className="pb-10 font-semibold">My Cars!</h1>
            <div className="grid justAbovexl:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-x-6 gap-y-8">
                {
                    cars && cars.map( (el,index) => {
                        return (
                            <Link to = {`/cars/${el._id}`} key={index}>
                                <CarCard title={el.title} desc={el.desc} tags={el.tags} img={el.thumb} />
                            </Link>
                        )
                    })
                }
            </div>
            {!cars && <div className="text-sm opacity-90 ">Loading....</div>}
        </div>
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
 
export default MyCars;