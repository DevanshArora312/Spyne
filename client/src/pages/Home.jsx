import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import CarCard from "../components/CarCard";
import { setCars } from "../redux/slices/cars";
const Home = () => {
    const [text,setText] = useState("");
    const token = useSelector(state => state.auth.token);
    const [isLogged,setLogged] = useState(false);
    const carsData = useSelector(state => state.cars.cars);
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
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/get-cars`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
                dispatch(setCars(data.data));
            } else{
                // navigate('/login')
            }
        })
        
        .catch(err=> {
            console.log("here",err.message);
        })
    },[dispatch])
    useEffect(()=>{
        if(!carsData) return;
        console.log(carsData[0].tags)
        const newData = carsData.filter(one => one.title.includes(text) || one.desc.includes(text) || one.tags.includes(text) );
        setCarsIn(newData);
    },[text])
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
                                <CarCard title={el.title} desc={el.desc} img={el.thumb} tags={el.tags}/>
                            </Link>
                        )
                    })
                }
            </div>
            {!cars && 
                <div className="text-[30px] opacity-90 flex justify-center items-center">
                    Cars will appear here.........
                    Add some cars now!
                </div>
            }
        </div>
        </div>
    );
}
 
export default Home;