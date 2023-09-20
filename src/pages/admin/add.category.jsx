import { useState } from "react";
import { Button, Card, Container, Form, FormControl, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../service/category.service";

const AddCategory = () => {

  const [loading , setLoading] = useState(false);

  let [data, setdata] = useState({
    title: "",
    discription: "",
    coverImage: "",
  });

  const handleChange = (event, property) => {
    event.preventDefault();
    setdata({
      ...data,
      [property]: event.target.value,
    });
  };

  const SubmitForm = (event )=>{
    event.preventDefault();
    console.log(data);
    // check conditions 
    if(data.title === undefined || data.title.trim() === ''){
        toast.error("Title can't be empty");
        return ;
    }
    if(data.discription === undefined || data.discription.trim() === ''){
        toast.error("discription can't be empty");
        return ;
    }
    // if(data.url === undefined || data.url.trim() === ''){
    //     toast.error("Image Url can't be empty");
    //     return ;
    // }
    setLoading(true);
    addCategory(data).then((response)=>{
        console.log(response);
        toast.success("Category Addedd Successfully.");
        setdata({
          title: "",
          discription: "",
          coverImage: "",
        })
    }).catch((error)=>{
      console.log(error);
        toast.error(error.response.data.title);
    }).finally(()=>{
      setLoading(false);
    })


  }

  const reset = ()=>{
    setdata({
        title: "",
        discription: "",
        coverImage: "",
    })
  }

  return (
    <>
      <Container fluid>
        <Card className="border border-0 shadow">
            {/* {JSON.stringify(data)} */}
          <Card.Body>
            <h5>Add Your Category Here !! </h5>
            <Form onSubmit={SubmitForm}>
              <Form.Group className="mt-3">
                <Form.Label>Enter your Category title</Form.Label>
                <FormControl type="text" placeholder="Enter Here" value={data.title} onChange={(event) => handleChange(event, "title")}></FormControl>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Enter your Category Discription Here..</Form.Label>
                <FormControl
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter Discription here"
                  onChange={(event) => handleChange(event, "discription")}
                  value={data.discription}
                ></FormControl>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Enter your Category Image Url..</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Enter url here"
                  onChange={(event) => handleChange(event, "coverImage")}
                  value={data.coverImage}
                ></FormControl>
              </Form.Group>
              <Container className="mt-4 text-center">
              <Button variant="success" size="sm" type="submit">
                <Spinner animation="border" size="sm" className="me-2" hidden={!loading}/>
                <span hidden={loading}>Add Category</span>
                <span hidden={!loading}>Please Wait</span>
              </Button>
              <Button onClick={reset} variant="danger" size="sm" className="ms-2">
                Reset
              </Button>
            </Container>
            </Form>
            
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;
