import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const deleteHandler = (id,setDeleted,token) =>{
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/delete-car/${id}`,{method: "DELETE",headers:{"Authorization": "Bearer "+token} })
    .then(res => {
        return res.json();
    })
    .then( data => {
        if (data.success){
            setDeleted(true);
            toast.success('Deleted Successfully !', {
                position: "top-right",
                autoClose: 500,
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
        toast.error(`Some Error Occured! ${err.message}`, {
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

export default deleteHandler;