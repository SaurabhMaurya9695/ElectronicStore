import { Card, Container, Table } from "react-bootstrap";
import { BASE_URL } from "../../service/helper.service";

const UserProfileView = ({user = null}) => {

  const profileStyle = {
    maxHeight:"250px",
    maxWidth:"250px",
    borderRadius:"50px",
    border:"2px solid white"
  }

  
  const imageName = (user.userDto.image === undefined || user.userDto.image === null) ? ((user.userDto.gender === "Male") ? "/assest/MaleImage.png" : "/assest/FemaleImage.jpeg") : 
                  "/assest/Logo.jpeg"
  return (
    <>
      {/* <h1>This is User View </h1> */}
      {/* <h1>HI this side ..{user.userDto.name}</h1> */}
      <Card>
        <Card.Body className=" text-center fw-bold text-primary " >
          <Container className="mb-3">
            <img src={imageName} alt="Profile" style={profileStyle}></img>
          </Container>
          <h2 className="text-uppercase">{user.userDto.name}</h2>
          <div className="mt-3">
            <Table responsive striped bordered hover>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{user.userDto.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.userDto.email}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{user.userDto.gender}</td>
                </tr>
                <tr>
                  <td>About</td>
                  <td>{user.userDto.about}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{user.userDto.roles.map(role=> role.roleName)}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserProfileView;
