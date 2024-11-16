import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setMyCars } from "../redux/slices/cars";
import { setToken } from "../redux/slices/auth";

const MyCars = () => {
    const carsData = useSelector(state => state.cars.mycars);
    const [text,setText] = useState("");
    const token = useSelector(state => state.auth.token);
    const [isLogged,setLogged] = useState(false);
    const [cars,setCarsIn] = useState(carsData);
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
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/my-cars`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                dispatch(setMyCars(data.data));
            } else{
                // navigate('/login')
            }
        })
        .catch(err=> {
            console.log("here",err.message);
        })
    },[dispatch])
    useEffect(()=>{
        if(!cars) return;
        const newData = cars.filter(one => one.contains(text));
        setCarsIn(newData)
    },[text,cars])
    return ( 
        <div className="w-screen overflow-x-hidden">
        <NavBar isLogged={isLogged} text={text} setText={setText}/>
        <div className="text-3xl flex flex-col justify-center items-start px-[15%] pt-20 w-full">
            <h1 className="pb-10 font-semibold">My Cars!</h1>
            {
                cars && cars.map( (el,index) => {
                    return (
                        <Link to = {`/todos/${el._id}`} key={index}>
                        <div className={`${el.liked ? 'border-r-red-500 border-solid border-r-8' : ""} w-[55vw] flex flex-col rounded-lg hover:shadow-xl shadow-black gap-4 p-5`} >
                            <h2 className="text-red-500">{el.title}</h2>
                            <h6 className="text-[20px] opacity-80">Written By: {el.writtenBy} </h6>
                        </div>
                        </Link>
                    )
                })
            }
            {!cars && <div className="text-sm opacity-90 ">Loading....</div>}
        </div>
        </div>
    );
}
 
export default MyCars;