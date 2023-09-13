import { Button, Card, Container, Table } from "react-bootstrap";
import { BASE_URL } from "../../service/helper.service";
import { serveImage}  from "../../service/user.service";
import {  useState } from "react";
const UserProfileView = ({user = null}) => {

  const profileStyle = {
    height:"170px",
    width:"140px",
    borderRadius:"50%",
    border:"2px solid white",
    objectFit:"cover"
  }

  let [IMAGE , setIMAGE] = useState(null);

  serveImage(user.userId).then((data)=>{
    setIMAGE(BASE_URL+'/users/image/' + user.userId);
  }).catch((error)=>{
    console.log(error.response.data.message)
    setIMAGE(null);
  })

  const imageName = (user.image === undefined || user.image === null || IMAGE == null) ? ((user.gender === "Male") ? "/assest/MaleImage.png" : "/assest/FemaleImage.jpeg") : 
                      IMAGE ; 
  return (
    <>
      <Card>
        <Card.Body className=" text-center fw-bold text-primary " >
          <Container className="mb-3">
            <img src={imageName} alt="Profile" style={profileStyle}></img>
          </Container>
          <h2 className="text-uppercase">{user.name}</h2>
          <div className="mt-3">
            <Table responsive striped bordered hover>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{user.gender}</td>
                </tr>
                <tr>
                  <td>About</td>
                  <td>{user.about}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td >{user.roles.map(role=> role.roleName + "  ")}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Container className="text-center">
            <Button variant="success" className="mx-3"> Update</Button>
            <Button variant="danger" > Orders</Button>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserProfileView;
