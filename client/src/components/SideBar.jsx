import { RxCross2 } from "react-icons/rx";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
// import { useSelector } from "react-redux";
import { setOne, setCars } from "../redux/slices/cars";

const Sidebar = ({vis,setVis}) => {
    const dispatch = useDispatch();
    const sideItem = {
        padding: "1rem",
        display: vis ? "flex" : "",
        justifyContent : "flex-end",
        fontSize :20,
        paddingRight : "25px" 
    }
    const sideBarStyle = {
        borderRadius: "10px",
        height: "100vh", 
        width: vis ? "100vw" : 0,
        position: "fixed", 
        zIndex: 2,
        top: 0,
        right: 0,
        backgroundColor: "white",
        overflowY: "hidden", 
        paddingTop: "20px",
        paddingLeft:"10px", 
        transition: "0.5s", 
        
        
    }
    const logoutHandler = () => {
        dispatch(setToken(""));
        dispatch(setCars(null))
        dispatch(setOne(null))
    }
    return ( 
        <div id="sideBar" style={sideBarStyle}>
            <div style = {sideItem}>
                <button onClick={() => {setVis(!vis)}}>
                    <RxCross2 style={{textDecoration:"none",color:"black",fontSize:25}}/>
                </button>
            </div>
            <div style = {sideItem}>
                <Link to ="/" style={{textDecoration:"none",color:"black"}}>Home</Link>
            </div>
            <hr style={{
                width:"100%"
            }}/>
            <div style = {sideItem}>
                <Link to ="/my-cars" style={{textDecoration:"none",color:"black"}}>My Cars</Link>
            </div>
            <hr style={{
                width:"100%"
            }}/>
            <div style = {sideItem}>
                <Link to="/add-car" className = "hover:opacity-60">
                    Add Car
                </Link>
            </div>
            <hr style={{
                width:"100%"
            }}/>
            <div style = {sideItem}>
                <Link to="/login" style={{textDecoration:"none",color:"black"}} onClick={logoutHandler}>Logout </Link>
            </div>
            <hr style={{
                width:"100%"
            }}/>
            
            
        </div>
     );
}
 
export default Sidebar
