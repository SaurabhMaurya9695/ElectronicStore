import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { deleteCategory } from "../../service/category.service";

const CategoryView = (props) => {
  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit : "cover"
  };

  const deleteCat =()=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            let id = props.passCategories.categoryId;
            deleteCategory(id).then((response)=>{
                Swal.fire(
                    'Deleted!',
                    'Your category has been deleted.',
                    'success'
                  )
            window.location.reload(); 
            }).catch((error)=>{
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            })
          
        }
      })
    
  }

  return (
    <div className="mb-3">
      <Card className="border border-0 shadow">
        <Card.Body>
          <Row>
            <Col md={2}>
              <img
                src={(props.passCategories.coverImage) ? ((props.passCategories.coverImage.startsWith("http") ? props.passCategories.coverImage :
                "/assest/categoryImg.jpeg")): "/assest/categoryImg.jpeg"}
                alt="cat"
                style={imageStyle}
              />
            </Col>
            <Col md={7} className="mt-2">
              <h5>{props.passCategories.title}</h5>
              <p>{props.passCategories.discription}</p>
            </Col>
            <Col>
              <Container className="d-grid">
                <Button className="mt-2" size="sm" variant="danger" onClick={deleteCat}>
                  Delete
                </Button>
                <Button className="mt-2" size="sm" variant="warning" onClick={(event)=> props.updateCategory(props.passCategories)}>
                  update
                </Button>
                <Button className="mt-2" size="sm" variant="info" onClick={(event)=> props.viewCategory(props.passCategories)}>
                  view
                </Button>
                
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryView;
