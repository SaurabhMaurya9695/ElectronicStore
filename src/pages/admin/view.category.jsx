import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import CategoryView from "../../components/user/CategoryView";
import { getAllCategory } from "../../service/category.service";

const ViewCategory = ()=>{

    let [categories , setCategories] = useState({
        content :[]
    });
    const [loading , setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true);
        getAllCategory().then((cate) =>{
            console.log(cate);
            setCategories(cate);
            toast.success("Category Loaded Successfully!!");
        }).catch((error)=>{
            console.log(error);
            setCategories(null);
            toast.success("Error in Loading");
        }).finally(()=>{
            setLoading(false);
        })
    },[])

    return (<>
    <div className="text-center">
    <Spinner animation="border" size="lg" variant="info" hidden={!loading}/>
    </div>
        {
            categories.content.map((cat) =>{
                return (<CategoryView passCategories = {cat} key={cat.categoryId}/>)
            })
        }
    </>);
}

export default ViewCategory;