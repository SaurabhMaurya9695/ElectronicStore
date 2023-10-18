import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import SingleProductView from "../../components/admin/SingleProductView";
import {
  getProductImage,
  PRODUCT_PAGE_SIZE,
} from "../../service/helper.service";
import { AddProductImage, getAllproduct, searchProducts, updateCategoryOfProduct, updateProduct } from "../../service/product.service";
import ShowHtmlParse from "../../components/ShowHtmlParse";
import { Editor } from "@tinymce/tinymce-react";
import { getAllCategory } from "../../service/category.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const ViewProduct = () => {
  const [products, setProducts] = useState(undefined);
  const [currentModelProduct, setCurrentModelProduct] = useState(undefined);
  const [searchText , setSearchText] = useState();
  const [prevProductState , setPrevProductState] = useState(undefined);
  //for richTextEditior
  const editorRef = useRef(null);

  //imageUpdate fields start
  const [imageUpdate , setImageUpdate] = useState({
    imagePreview : undefined ,
    image : undefined
  })

  const [categoryUpdatedId , setCategoryUpdatedId] = useState(undefined);
  //imageUpdate fields end

  const [loadedCategories, setLoadedCategories] = useState(undefined);
  useEffect(() => {
    getAllCategory(0, 10000)
      .then((data) => {
        setLoadedCategories(data);
      })
      .catch((error) => {
        console.log("categories Not loaded");
      });
  }, []);

  //modal states start
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const modalShow = (event, product) => {
    // pass this as reference to other component to open the view
    console.log("this is product", product);
    setCurrentModelProduct(product);
    setShow(true);
  };
  //modal states ends

  //UpdateModal states start
  const [showUpdateProductModel, setShowUpdateProductModel] = useState(false);
  const UpdateProductModelClose = () => {
    setShowUpdateProductModel(false);
  };

  const UpdateProductModelOpen = (event, product) => {
    // pass this as reference to other component to open the view
    console.log("open model");
    console.log(product)
    setCurrentModelProduct(product);
    setShowUpdateProductModel(true);
  };
  //UpdateModal states ends

  //imgae condition
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = (
    pageNumber = 0,
    pageSize = PRODUCT_PAGE_SIZE,
    sortBy = "addedDate",
    sortDir = "asc"
  ) => {
    getAllproduct(pageNumber, pageSize, sortBy, sortDir)
      .then((resp) => {
        console.log("product loaded successfully");
        console.log(resp);
        setProducts({
          ...resp,
        });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  const updateProductList = (productId) => {
    const newArray = products.content.filter((p) => p.pId !== productId);
    setProducts({
      ...products,
      content: newArray,
    });
  };

  // modelView

  const openModelView = () => {
    return (
      currentModelProduct && (
        <>
          <Modal size="xl" centered show={show} onHide={handleClose}>
            {/* {JSON.stringify(currentModelProduct.pId)} */}
            {/* {currentModelProduct.pId} */}
            <Modal.Header closeButton>
              <Modal.Title>{currentModelProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="shadow">
                <Card.Body>
                  {/* product profile */}
                  <Container className="text-center">
                    <img
                      style={{
                        height: "300px",
                      }}
                      src={
                        currentModelProduct.productImageName != null
                          ? getProductImage(currentModelProduct.pId)
                          : "/assest/noProductImage.png"
                      }
                      alt="No_Image_Found"
                    />
                  </Container>
                  {/* Information table  */}
                  <Table
                    striped
                    bordered
                    responsive
                    className="text-center mt-2"
                  >
                    <thead>
                      <tr>
                        <th>Info</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Quantity</td>
                        <td>{currentModelProduct.quantity}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>₹{currentModelProduct.price}</td>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <td>₹{currentModelProduct.discounted_price}</td>
                      </tr>
                      <tr>
                        <td>Live</td>
                        <td>{currentModelProduct.live ? "True" : "False"}</td>
                      </tr>
                      <tr className={!currentModelProduct.stock ?  'table-danger px-3 small' :'table-success px-3 small'}>
                        <td>Stock</td>
                        <td>
                          {currentModelProduct.stock
                            ? "InStock"
                            : "Out Of Stock"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Category </strong>
                        </td>
                        <td>
                          <strong>{currentModelProduct.category?.title}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* description */}
                  <div className="p-3 border border-1">
                    <ShowHtmlParse htmltext={currentModelProduct.discription} />
                  </div>
                </Card.Body>
              </Card>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };


  const UpdateDetails=(event)=>{
    event.preventDefault();
    console.log("currentModelProduct");
    if(currentModelProduct.title === '' || currentModelProduct.title.trim() === undefined){
      toast.error('Title Required');
      return ;
    }
    if(currentModelProduct.discription === '' || currentModelProduct.discription.trim() === undefined){
      toast.error('Discription Required');
      return ;
    }
    if(currentModelProduct.quantity === '' || currentModelProduct.discription.trim() === undefined){
      toast.error('Quantity Required');
      return ;
    }
    Swal.fire({
      title: 'Do you want to Update the Product?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(currentModelProduct );
        updateProduct(currentModelProduct , currentModelProduct.pId).then(data=>{
          console.log(data);

          // before updating newArray update Image Also 
          
          if(imageUpdate.imagePreview && imageUpdate.image){
            AddProductImage(data.pId , imageUpdate.image).then((resp)=>{
              console.log(resp);
              setCurrentModelProduct({
                ...currentModelProduct,
                productImageName:resp.imageName 
              })

              setImageUpdate({
                imagePreview:undefined,
                image:undefined
              })
              toast.success('Image Updated');
              return ;
            }).catch((error)=>{
              console.log(error);
              toast.error('Some error Occured While Uploading Image');
              return ;
            })
          }

          // if we select the same id again or we select none
          if(categoryUpdatedId === 'none' || categoryUpdatedId ===currentModelProduct.category?.categoryId ){
            
          }
          else{
            updateCategoryOfProduct(categoryUpdatedId , currentModelProduct.pId)
            .then((catData)=>{
              console.log('catageory Updated');
              toast.success('Category Updated Successfully');
              setCurrentModelProduct({
                ...currentModelProduct,
                category:catData.category
              })
              const newArray = products.content.map(p=>{
                if(p.pId === currentModelProduct.pId){
                  return catData;
                }
                return p;
              })
    
              setProducts({
                ...products, // we want all things
                content:newArray //only to change its content
              })
            })
            .catch((error)=>{
              console.log(error);
              toast.error('some error occured while updating the category');
            })
          }
          const newArray = products.content.map(p=>{
            if(p.pId === currentModelProduct.pId){
              return data;
            }
            return p;
          })

          setProducts({
            ...products, // we want all things
            content:newArray //only to change its content
          })
          Swal.fire('Updated SuccessFully!', '', 'success');
          setShowUpdateProductModel(false);
          return;
        }).catch((error)=>{
          console.log(error);
          toast.error("Some Error Occurred");
          return ;
        })
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    

  }


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
        setCurrentModelProduct({
          ...currentModelProduct,
        });

        setImageUpdate({
          imagePreview: e.target.result,
          image: event.target.files[0],
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("File Type Is Invalid ");
      setCurrentModelProduct({
        ...currentModelProduct,
      });
      setImageUpdate({
        imagePreview: undefined,
        image: undefined,
      })
    }
  };
  // UpdateProduct
  const OpenUpdateProductModelView = () => {
    return (
      currentModelProduct && (
        <>
          <Modal
            size="xl"
            centered
            show={showUpdateProductModel}
            onHide={UpdateProductModelClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>{currentModelProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* {JSON.stringify(currentModelProduct)} */}
              <Card className="border border-0 shadow-sm">
                <Card.Body>
                  <h5 className="text-center">Add Product Here</h5>
                  <Form onSubmit={UpdateDetails}>
                    {/* title filed */}
                    <Form.Group>
                      <FormLabel>Enter Your Title</FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Enter here"
                        value={currentModelProduct.title}
                        onChange={(event)=> setCurrentModelProduct({
                          ...currentModelProduct,
                          title:event.target.value
                        })}
                      ></FormControl>
                    </Form.Group>
                    {/* discription Filed */}
                    <Form.Group className="mt-3">
                      <Form.Label>Enter Your Description</Form.Label>
                      <Editor
                        apiKey=""
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                          height: 500,
                          menubar: true,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={() =>
                          setCurrentModelProduct({
                            ...currentModelProduct,
                            discription: editorRef.current.getContent(),
                          })
                        }
                        value={currentModelProduct.discription}
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
                            value={currentModelProduct.price}
                            onChange={(event)=> setCurrentModelProduct({
                              ...currentModelProduct,
                              price:event.target.value
                            })}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        {/* discounted price */}
                        <Form.Group className="mt-3">
                          <Form.Label>
                            Enter Your Discounted Price Here
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter here"
                            value={currentModelProduct.discounted_price}
                            onChange={(event)=> setCurrentModelProduct({
                              ...currentModelProduct,
                              discounted_price:event.target.value
                            })}
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
                        value={currentModelProduct.quantity}
                        onChange={(event)=> setCurrentModelProduct({
                          ...currentModelProduct,
                          quantity:event.target.value
                        })}
                      />
                    </Form.Group>
                    <Row className="mt-3 px-1">
                      <Col>
                        {/* Live */}
                        <Form.Check
                          type="switch"
                          label={"Live"}
                          checked={currentModelProduct.live ? true : false}
                          onChange={(event)=> setCurrentModelProduct({
                            ...currentModelProduct,
                            live:!currentModelProduct.live
                          })}
                        />
                      </Col>
                      <Col>
                        {/* stock */}
                        <Form.Check
                          type="switch"
                          label={"InStock"}
                          checked={currentModelProduct.stock ? true : false}
                          onChange={(event)=> setCurrentModelProduct({
                            ...currentModelProduct,
                            stock:!currentModelProduct.stock
                          })}
                        />
                      </Col>
                    </Row>

                    {/* ProductImage */}
                    <Form.Group className="my-5">
                      <Container className="text-center py-4 border border-3">
                        <p className="text-muted">Image Preview</p>
                        <img
                          src={imageUpdate.imagePreview ? imageUpdate.imagePreview :  getProductImage(currentModelProduct.pId)}
                          alt="No_Image_Found"
                          className="img-fluid"
                          style={{
                            maxHeight: "250px",
                          }}
                        ></img>
                      </Container>
                      <Form.Label className="mt-2">
                        Enter Your Product Image{" "}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control type="file" placeholder="Enter here" onChange={(event) => handleFileChange(event)}/>
                        <Button variant="outline-secondary" onClick={(event)=>{
                          setImageUpdate({
                            imagePreview:undefined,
                            image:undefined
                          })
                        }}> Clear</Button>
                      </InputGroup>
                    </Form.Group>

                    {/* Add In category */}
                    {/* {JSON.stringify(categoryUpdatedId)} */}
                    <Form.Group className="mt-3">
                      <Form.Label>Select Category</Form.Label>
                      <Form.Select  onChange={(event)=>{
                        setCategoryUpdatedId(event.target.value)
                      }}>
                        <option value="none">None</option>
                        {loadedCategories &&
                          loadedCategories.content.map((e) => {
                            return (
                              <option
                                selected={
                                  e.categoryId ===
                                  currentModelProduct.category?.categoryId
                                }
                                key={e.categoryId}
                                value={e.categoryId}
                                
                              >
                                {e.title}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                    <Container className="text-center mt-3">
                      <Button variant="danger" type="submit" size="sm">
                        Add Product
                      </Button>
                    </Container>
                  </Form>
                </Card.Body>
              </Card>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={UpdateProductModelClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  const searchProduct =()=>{
    console.log("searchProduct")
    if(searchText?.trim() === '' || searchText===undefined){
      return;
    }
    searchProducts(searchText).then((data)=>{
      console.log(data);
      setPrevProductState(data);
      if(data.content.length <= 0){
        toast.info("No Result Found");
        return;
      }
      setProducts(data);
      setSearchText('');
    }).catch((error)=>{
      console.log(error);
      toast.error('Error In Searching Product ')
    })
  }

  const productView = () => {
    return (
      <>
      {/* {JSON.stringify(searchText)} */}
        <Card className="shadow-sm">
          <Card.Body>
            <h5 className="mb-3">View Products</h5>
            <Form.Group className="mb-3">
              <Form.Label>Search Product </Form.Label>
              <InputGroup>
              <Form.Control 
                onChange={(event) => {
                  if(event.target.value === ''){
                    if(prevProductState){
                      setProducts(prevProductState)
                    }
                  }else{
                    setSearchText(event.target.value)
                  }
                }}
                type="text"
                placeholder="Write Title Keywords to Search the text"
              ></Form.Control>
              <Button onClick={searchProduct} variant="outline-secondary">Search</Button>
              </InputGroup>
            </Form.Group>
            <Table
              className="text-center"
              striped
              responsive
              bordered
              hover
              size="sm"
            >
              <thead>
                <tr>
                  <th>#SN</th>
                  <th>Title</th>
                  <th>Quanitity</th>
                  <th>Price</th>
                  <th>Discounted</th>
                  <th>Live</th>
                  <th>InStock</th>
                  <th>Category</th>
                  <th>AddedDate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.content.map((e, index) => (
                  <SingleProductView
                    key={index}
                    index={index}
                    UpdateProduct={UpdateProductModelOpen}
                    updateProductList={updateProductList}
                    product={e}
                    openModelView={modalShow}
                  />
                ))}
              </tbody>
            </Table>
            {/* Implement Pagination here */}
            <Container className="d-flex justify-content-center">
              <Pagination>
                {/* <Pagination.Prev></Pagination.Prev>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Next/> */}

                {/* implement pagination with the help of for loop */}
                <Pagination.First
                  onClick={(event) => {
                    if (products.pageNumber - 1 < 0) return;
                    getAllProducts(0, PRODUCT_PAGE_SIZE, "addedDate", "asc");
                  }}
                />
                <Pagination.Prev
                  onClick={(event) => {
                    if (products.pageNumber - 1 < 0) return;
                    getAllProducts(
                      products.pageNumber - 1,
                      PRODUCT_PAGE_SIZE,
                      "addedDate",
                      "asc"
                    );
                  }}
                />
                {[...Array(products.totalPages)]
                  .map((obj, i) => i)
                  .map((item) => {
                    return products.pageNumber === item ? (
                      <Pagination.Item active key={item}>
                        {item + 1}
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item
                        onClick={(event) => {
                          getAllProducts(
                            item,
                            PRODUCT_PAGE_SIZE,
                            "addedDate",
                            "asc"
                          );
                        }}
                        key={item}
                      >
                        {item + 1}
                      </Pagination.Item>
                    );
                  })}
                <Pagination.Next
                  onClick={(event) => {
                    if (products.lastPage) return;
                    getAllProducts(
                      products.pageNumber + 1,
                      PRODUCT_PAGE_SIZE,
                      "addedDate",
                      "asc"
                    );
                  }}
                />
                <Pagination.Last
                  onClick={(event) => {
                    getAllProducts(
                      products.totalPages - 1,
                      PRODUCT_PAGE_SIZE,
                      "addedDate",
                      "asc"
                    );
                  }}
                />
              </Pagination>
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {" "}
            {/* add responsive for make table resposnive */}
            {/* {JSON.stringify(product)} */}
            {products ? productView() : ""}
          </Col>
        </Row>
      </Container>
      {openModelView()}

      {OpenUpdateProductModelView()}
    </>
  );
};

export default ViewProduct;
