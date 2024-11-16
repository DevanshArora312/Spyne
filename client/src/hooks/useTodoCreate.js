import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useTodoCreate = (formData,token) =>{
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/create-todo`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({formData,token})})
        .then(res =>{
            return res.json();
        }).then(data=>{
            if (data.success){
                toast.success('Created Successfully !', {
                    position: "top-right",
                    autoClose: 1000,
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
        })
}

export default useTodoCreate;