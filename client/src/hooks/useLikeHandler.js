import { setOne } from "../redux/slices/cars";

const likeHandler = (todo,token,id,dispatch) => {
    let {title,liked,writtenBy,body} = todo;
    liked = !liked;
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/update-like/${id}`,{method:"PUT",headers:{"Content-Type" : "application/json"},body:JSON.stringify({title,liked,writtenBy,body,token})})
    .then(res => {
        return res.json();
    })
    .then(data => {
        if(data.success){
            dispatch(setOne({title,liked,writtenBy,body}));
        }
        
    }).catch (err => {
        console.log("some error occuured")
    })
}

export default likeHandler;