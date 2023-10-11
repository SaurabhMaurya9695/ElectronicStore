import { Button } from "react-bootstrap";
import {RiDeleteBin2Fill} from "react-icons/ri"
import {GrFormView} from "react-icons/gr"
import {PiPencilSimpleFill} from "react-icons/pi"

const SingleProductView = ({
    product , index
}) => {

    const formatDate = (time) =>{
        return new Date(time).toLocaleDateString();
    }


    const getColorForTable = () =>{
        // live + Instock => green
        // notLive  => red
        // notStock => yellow 

        if(product.live && product.stock){
            return "table-success";
        }
        else if(!product.live){
            return "table-danger";
        }
        else if(!product.stock){
            return "table-warning";
        }
        else{
            
        }
    }
  return (
    <>
    {
        console.log("product in singklevuew" + product)
        
    }
      <tr className={getColorForTable()}>
        <td className="px-3 small">{index + 1}</td>
        <td className="px-3 small">{product.title}</td>
        <td className="px-3 small">{product.quantity}</td>
        <td className="px-3 small">{product.price}</td>
        <td className="px-3 small">{product.discounted_price}</td>
        <td className="px-3 small">{product.live ? 'True' :'False'}</td>
        <td className="px-3 small">{product.stock ? 'True' :'False'}</td>
        <td className="px-3 small">{product.category ? product.category.title : "NULL"}</td>
        <td className="px-3 small">{formatDate(product.addedDate)}</td>
        <td className="d-flex small table-light">
          <Button variant="danger" size="sm">
            {" "}
            <RiDeleteBin2Fill/>
          </Button>
          <Button className="ms-2" variant="dark" size="sm">
            {" "}
            <PiPencilSimpleFill/>
          </Button>
          <Button className="ms-2" variant="info" size="sm">
            {" "}
            <GrFormView/>
          </Button>
        </td>
      </tr>
    </>
  );
};


export default SingleProductView;