import { useEffect } from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  Card, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import CategoryView from "../../components/user/CategoryView";
import { getAllCategory } from "../../service/category.service";

const ViewCategory = (props)=>{

    const [categories , setCategories] = useState({
        content :[]
    });

    const [selectedCategory , setSelectedCategory] = useState(null);

    const [loading , setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }


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

    const handleViewCategory = (category) =>{
        setSelectedCategory(category);
        handleShow()
        
    }


    const handleUpdateCategory = (category) =>{
        alert("update btn clicked")
    }

    const imageStyle = {
        width: "100%",
        height: "250px",
        objectFit : "contain"
      };

    const modelView = ()=>{
        return (
        <>
            {console.log(selectedCategory)}
            {
                selectedCategory ? (<Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title className="me-3">{selectedCategory.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Container className="text-center " >
                            <img style={imageStyle} src={selectedCategory.coverImage } alt="coverImage"  />
                        </Container>
                        <span className="mt-2 " >{selectedCategory.discription}</span>
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Update
                    </Button>
                    </Modal.Footer>
                </Modal>) : ''
            }
        </>
        );
    }
    return (
        <div>
            {
                categories?.content?.length > 0 ? ((<>
                    <div className="text-center">
                    <Spinner animation="border" size="lg" variant="info" hidden={!loading}/>
                    </div>
                        {
                            categories.content.map((cat) =>{
                                return (<CategoryView 
                                    passCategories = {cat} 
                                    key={cat.categoryId}
                                    viewCategory = {handleViewCategory}
                                    updateCategory = {handleUpdateCategory}
                                />)
                            })
                        }
                    </>)) : (<>
                        <Container className="text-center border border-0 shadow">
                            <Card>
                                <Card.Body>
                                    <h5>There is no Category</h5>
                                </Card.Body>
                            </Card>
                        </Container>
                    </>)
            }
            {
                modelView()
            }
        </div>
            
            
    )
        
}

export default ViewCategory;