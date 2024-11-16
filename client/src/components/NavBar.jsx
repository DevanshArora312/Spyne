import {Link, useNavigate} from "react-router-dom"
import { setToken } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
import Sidebar from "./SideBar";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { setOne, setCars } from "../redux/slices/cars";
// import { setCars } from "../redux/slices/cars";

const NavBar = ({isLogged,text,setText,show}) => {
    // const cars = useSelector(state => state.cars.cars);
    const dispatch = useDispatch();
    const [vis,setVis] = useState(false);
    const navigate = useNavigate();
    const logoutHandler = () => {
        if(isLogged){
            dispatch(setToken(""));
            dispatch(setCars(null))
            dispatch(setOne(null))
        } else{
            navigate("/");
        }
    }
    return ( 
        <div className="w-screen h-auto flex sm:justify-around justify-between items-center pt-10 px-8 sm:px-4">
            <Link to="/" className="text-red-500 font-semibold text-[30px] max-sm:hidden">
                The Cars List
            </Link>
            <form className={`${show ? "w-[50%]" : ""} flex justify-center items-center gap-5`} onSubmit={e => e.preventDefault()}>
                {
                    show ? 
                    <input 
                        className="rounded-xl px-3 py-2 text-[20px] text-black border-[1px] w-[70%] border-black"
                        placeholder="Search a car...."
                        name='search' type='text' 
                        value={text} 
                        onChange={e => setText(e.target.value)}
                    /> : 
                    null
                }
            </form>
            <div className="flex justify-between gap-x-5 text-2xl max-sm:hidden">
                <Link to="/add-car" className = "hover:opacity-60">
                    Add-Car
                </Link>
                <Link className = "hover:opacity-60" to="/my-cars">
                    My Cars
                </Link>
                <Link to="/login" className = "hover:opacity-60" onClick={logoutHandler}>
                    {isLogged ? "Logout" : "Login"}
                </Link>
            </div>
            <div className="sm:hidden flex justify-center items-center ">
                <button className="hover:opacity-75 text-[30px]" onClick={()=>setVis(!vis)}>
                    <GiHamburgerMenu />
                </button>
                <Sidebar setVis={setVis} vis={vis}/>
            </div>
        </div>
    );
}
 
export default NavBar;