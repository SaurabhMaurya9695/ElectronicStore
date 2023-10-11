import { useEffect, useRef } from "react";
import { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getAllCategory } from "../../service/category.service";
import { AddProductImage, createProductWithCategory, createProductWithoutCategory } from "../../service/product.service";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    discription: "",
    price: 0,
    discounted_price: 0,
    quantity: 1,
    stock: false,
    live: false,
    image: undefined, // to upload the image
    imagePreview: "/assest/noProductImage.png", // to show the priview
  });


  //for richTextEditior
  const editorRef = useRef(null);

  const [categories , setCategories] = useState(undefined);
  const [selectedCategorieId , setSelectedCategorieId] = useState("none");

  useEffect(()=>{
    getAllCategory().then((data)=>{
      console.log(data);
      setCategories(data);
    }).catch((error)=>{
      console.log("error in fetching categories");
      toast.error("error in fetching categories");
    })
  } , [])

  //DataBinding
  const handleChange = (event, property) => {
    event.preventDefault();
    setProduct({
      ...product,
      [property]: event.target.value,
    });
  };

  //for Handling Image
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpg" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProduct({
          ...product,
          imagePreview: e.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("File Type Is Invalid ");
      setProduct({
        ...product,
        imagePreview: "/assest/noProductImage.png",
        // imagePreview: undefined,
        image: undefined,
      });
    }
  };

  const submitAddProductForm = (event)=>{
    event.preventDefault();
    if(product.title === undefined || product.title.trim() === '' ){
      toast.error("Title is required");
      return ;
    }
    if(product.discription === undefined || product.discription.trim() === '' ){
      toast.error("Description is required");
      return ;
    }
    if(product.price <=0  ){
      toast.error("Invalid Price");
      return ;
    }
    if(product.discounted_price <=0 || product.discounted_price >= product.price  ){
      toast.error("Invalid Discounted price");
      return ;
    }

    // now perform more validation 

    Swal.fire({
      title: 'Do you want to Add the Product?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        if(selectedCategorieId === "none"){
          createProductWithoutCategory(product).then((data)=>{
            console.log(data);
            Swal.fire('Product Added SuccessFully!', '', 'success');
            // before empty upload image also

            if(!product.image){
              ClearForm();
              return ;
            }
            AddProductImage(data.pId , product.image).then((resp)=>{
              console.log("image Uploaded Successfully");
              ClearForm();
              return ;
            }).catch((error)=>{
              toast.error("some Error Occured im Uploading Image ");
              return ;
            })
            return ;
          }).catch((error)=>{
            console.log(error);
            toast.error("Some Error Occurred");
            return ;
          })
        }
        else{
          createProductWithCategory(product , selectedCategorieId).then((data)=>{
            Swal.fire('Product Added SuccessFully!', '', 'success');
            if(!product.image){
              ClearForm();
              return ;
            }
            AddProductImage(data.pId , product.image).then((resp)=>{
              console.log("image Uploaded Successfully");
              ClearForm();
              setSelectedCategorieId("none");
          }).catch((error)=>{
            toast.error("some Error Occured im Uploading Image ");
            return ;
          })
          }).catch((error)=>{
            console.log(error);
            toast.error("Some Error Occurred");
            return ;
          })
      }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  const ClearForm =()=>{
    setProduct({
      title: "",
      discription: "",
      price: 0,
      discounted_price: 0,
      quantity: 1,
      stock: false,
      live: false,
      image: undefined, // to upload the image
      imagePreview: undefined, // to show the priview
    })
    editorRef.current.setContent('');

  }

  const formView = () => {
    return (
      <div>
        {/* {JSON.stringify(product)} */}
        <Card className="border border-0 shadow-sm">
          <Card.Body>
            <h5 className="text-center">Add Product Here</h5>
            <Form onSubmit={submitAddProductForm}>
              {/* title Filed */}
              <Form.Group className="mt-3">
                <Form.Label>Enter Your Title</Form.Label>
                <Form.Control
                  type="text"
                  rows={10}
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "title")}
                  value={product.title}
                />
              </Form.Group>
              {/* discription Filed */}
              <Form.Group className="mt-3">
                <Form.Label>Enter Your Description</Form.Label>
                {/* <Form.Control
                  as={"textarea"}
                  rows={5}
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "discription")}
                  value={product.discription}
                /> */}
                {/* read the docs and follow how to write  */}
                <Editor 
                apiKey=""
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Enter your Description here</p>"
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={()=> setProduct({
                  ...product,
                  discription:editorRef.current.getContent()
                })}
                 />
              </Form.Group>

              {/* price and discountedPrice */}
              <Row>
                <Col>
                  {/* actual price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Enter Your Actual Price Here</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "price")}
                      value={product.price}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* discounted price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Enter Your Discounted Price Here</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      onChange={(event) => {
                        if (event.target.value > product.price) {
                          toast.error("Invalid Discount Price");
                          return;
                        }
                        setProduct({
                          ...product,
                          discounted_price: event.target.value,
                        });
                      }}
                      value={product.discounted_price}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* product quantity */}
              <Form.Group className="mt-3">
                <Form.Label>Enter Your Product Quantity Here</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "quantity")}
                  value={product.quantity}
                />
              </Form.Group>
              <Row className="mt-3 px-1">
                <Col>
                  {/* Live */}
                  <Form.Check
                    type="switch"
                    label={"Live"}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        live: !product.live,
                      })
                    }
                    value={product.live}
                  />
                </Col>
                <Col>
                  {/* stock */}
                  <Form.Check
                    type="switch"
                    label={"InStock"}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      })
                    }
                    value={product.stock}
                  />
                </Col>
              </Row>

              {/* ProductImage */}
              <Form.Group className="mt-3">
                <Container hidden={!product.image}>
                  <p className="text-muted">Image Preview</p>
                  <img
                    src={product.imagePreview}
                    alt=""
                    className="img-fluid"
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                  ></img>
                </Container>
                <Form.Label className="mt-2">
                  Enter Your Product Image{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="file"
                    placeholder="Enter here"
                    onChange={(event) => handleFileChange(event)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={(event) =>
                      setProduct({
                        ...product,
                        imagePreview: undefined,
                        image: undefined,
                      })
                    }
                  >
                    {" "}
                    Clear
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* Add In category */}
              {/* {JSON.stringify(selectedCategorieId)} */}
              <Form.Group className="mt-3">
                <Form.Label>Select Category</Form.Label>
              <Form.Select value={selectedCategorieId} onChange={(event)=> setSelectedCategorieId(event.target.value)}>
                <option value="none">None</option>
                  {
                    (categories) ? <>
                      {
                        categories.content.map(e =>
                          <option key={e.categoryId} value={e.categoryId}>{e.title}</option>
                        )
                      }
                    </> : ''
                  }
                </Form.Select>
              </Form.Group>
              <Container className="text-center mt-3">
                <Button variant="danger" type="submit" size="sm">
                  Add Product
                </Button>
                <Button variant="info" size="sm" onClick={ClearForm} className="ms-2">
                  Reset
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return <>{formView()}</>;
};

export default AddProduct;
