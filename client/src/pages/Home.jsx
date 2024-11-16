import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import CarCard from "../components/CarCard";

const Home = () => {
    const [text,setText] = useState("");
    const token = useSelector(state => state.auth.token);
    const [isLogged,setLogged] = useState(false);
    const [cars,setCarsIn] = useState(null);
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
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/get-cars`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                setCarsIn(data.data)
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
        const newData = cars;
        setCarsIn(newData)
    },[text,cars])
    console.log(cars)
    return ( 
        <div className="w-[99vw] overflow-x-hidden pb-10">
        <NavBar isLogged={isLogged} text={text} setText={setText} show={true}/>
        <div className="text-xl flex flex-col justify-center items-center px-[5%] sm:px-[7%] xl:px-[10%] pt-20 w-full">
            <h1 className="pb-10 font-semibold">All Cars from all users!</h1>
            <div className="grid justAbovexl:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-x-6 gap-y-8">
                {
                    cars && cars.map( (el,index) => {
                        return (
                            <Link to = {`/cars/${el._id}`} key={index}>
                                <CarCard title={el.title} desc={el.desc} tags={el.tags}/>
                            </Link>
                        )
                    })
                }
            </div>
            {!cars && 
                <div className="text-sm opacity-90 ">
                    <CarCard/>
                </div>
            }
        </div>
        </div>
    );
}
 
export default Home;