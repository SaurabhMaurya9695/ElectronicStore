import { useEffect, useState } from 'react'
import { privateAxios, publicAxios } from '../service/axios.service';
import { toast } from 'react-toastify';

const useLoader = () => {
  const [showLoader , setShowLoader] = useState(false);

  useEffect(()=>{
    // we have to show before every request and disable after every request end
    // for request
    privateAxios.interceptors.request.use(
      (config)=>{
        setShowLoader(true);
        return config;
      },
      (error)=>{
        return Promise.reject(error);
      }
    );

    // for response
    privateAxios.interceptors.response.use(
      (config)=>{
        setShowLoader(false);
        return config;
      },
      (error)=>{
        if(error.code === 'ERR_NETWORK'){
          setShowLoader(false);
          toast.error("Backend Server is down ..Try Again!!" ,{position:"bottom-center" ,closeOnClick:true});
        }
        return Promise.reject(error);
      }
    );


    // ````````````````````````````````````````````````````````````````
    publicAxios.interceptors.request.use(
      (config)=>{
        setShowLoader(true);
        return config;
      },
      (error)=>{
        return Promise.reject(error);
      }
    );

    // for response
    publicAxios.interceptors.response.use(
      (config)=>{
        setShowLoader(false);
        return config;
      },
      (error)=>{
        if(error.code === 'ERR_NETWORK'){
          setShowLoader(false);
          toast.error("Backend Server is down ..Try Again!!",{position:"bottom-center" ,closeOnClick:true});
        }
        return Promise.reject(error);
      }
    );
  },[]) ;


  return showLoader ;
}

export default useLoader
