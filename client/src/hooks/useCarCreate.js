import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useCarCreate = (formData,token) =>{
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/create-car`,{method:"POST",headers:{"Authorization":"Bearer "+token},body:formData})
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
            if(err.message == "t2 is not a function"){
                return;
            }
            toast.error('Some Error Occured!'+err.message, {
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

export default useCarCreate;