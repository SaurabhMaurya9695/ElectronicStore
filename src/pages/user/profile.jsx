import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserProfileView from "../../components/user/UserProfileView";
import { getSingleUserData, updateImage, updateUser } from "../../service/user.service";
const Profile = () => {
  // const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  const { userId } = useParams(); // whatever you are passing in url as a param it will catch that params
  // write same as that you passed in url

  const [loading, setLoading] = useState(false);
  const [imageName , setImageName] = useState("/assest/defaultProfile.avif");
  const [filePath , setFilePath] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    // console.log("handlwwhow")
    setShow(true);
  };

  useEffect(() => {
    // this function is same as onInit in angular
    // console.log("userIfFromUrl " + userId)

    const getDataFromServer = () => {
      // const userId = userContext?.userData?.userDto?.userId;
      getSingleUserData(userId)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          toast.error("error in loading user Information");
        });
    };
    getDataFromServer();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateFiledHandler = (event, property) => {
    setUser({
      ...user, //load the full data
      [property]: event.target.value, // update this filed of property
    });
  };

  const updateUserData = (event) => {
    event.cancelable && event.preventDefault();
    console.log("inside updateUser");
    console.log(user);
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("Name field can't be empty");
      return;
    }

    if (user.about === undefined || user.about.trim() === "") {
      toast.error("about field can't be empty");
      return;
    }
    setLoading(true);
    updateUser(user)
      .then((data) => {
        // console.log("userUpdated");
        //before showing success message update image as well 
        updateImage(filePath , user.userId).then((data)=>{
          console.log("File Uploaded");
          toast.success("Image Uploaded Successfully");
          handleClose();
        }).catch((error)=>{
          console.log("file not Updated")
          toast.error("Image Not Uploaded !!")
        });
        toast.success("user updated successfully");
        return;
      })
      .catch((error) => {
        console.log(error);
        toast.error("user not updated successfully");
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleImageChange = (event)=>{
    console.log(event.target.files[0])
    if(event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg" || 
    event.target.files[0].type === "image/jpeg"){
      const reader = new FileReader();
      reader.onload=(e)=>{
        setImageName(e.target.result)
        setFilePath(event.target.files[0]);
        // console.log(event.target.files[0]);
      }
      reader.readAsDataURL(event.target.files[0])
      
    }
    else{
      toast.error("File Type Is Invalid ")
    }
  }
  const profileStyle = {
    height: "170px",
    width: "140px",
    borderRadius: "50%",
    border: "2px solid white",
    objectFit: "cover",
  };

  const clearImage = (event)=>{
    setImageName("/assest/defaultProfile.avif");
    setFilePath(null);
  }

  const updateModel = () => {
    return (
      <div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Information!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body className=" text-center fw-bold text-primary ">
                <div className="mt-3">
                  <Table responsive striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Profile</td>
                        <td>
                          <Container className="text-center">
                            <img
                              src={imageName}
                              alt="Profile"
                              style={profileStyle}
                            />
                          </Container>
                          <InputGroup>
                          <Form.Control type="file" onChange={handleImageChange} />
                          <Button onClick={clearImage} variant="outline-secondary">Clear</Button>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>
                          <Form.Control
                            type="text"
                            value={user.name}
                            onChange={(event) =>
                              updateFiledHandler(event, "name")
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>New Password</td>
                        <td>
                          <Form.Control
                            placeholder="Enter New Password"
                            type="text"
                            value={user.password}
                            onChange={(event) =>
                              updateFiledHandler(event, "password")
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{user.gender}</td>
                      </tr>
                      <tr>
                        <td>About</td>
                        <td>
                          <Form.Control
                            type="text-area"
                            value={user.about}
                            onChange={(event) =>
                              updateFiledHandler(event, "about")
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Role</td>
                        <td>
                          {user.roles.map((role) => role.roleName + "  ")}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserData}>
              <Spinner
                animation="border"
                size="sm"
                className="mr-2"
                hidden={!loading}
              />
              <span hidden={loading}>Update Details</span>
              <span hidden={!loading}>Please Wait </span>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <Container className="rounded mt-3">
      {user ? (
        <>
          <UserProfileView user={user} handleShowModel={handleShow} />
          {updateModel()}
        </>
      ) : (
        <h1 className="text-center"> User Not Loaded from server !! </h1>
      )}
    </Container>
  );
};

export default Profile;
