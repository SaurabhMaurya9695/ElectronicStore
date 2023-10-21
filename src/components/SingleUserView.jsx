import { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../service/helper.service";
import { serveImage } from "../service/user.service";

const SingleUserView = ({ user }) => {
  const [IMAGE, setIMAGE] = useState(null);

  const profileStyle = {
    height: "80px",
    width: "70px",
    objectFit: "cover",
  };

  useEffect(() => {
    const imageServe = () => {
      serveImage(user.userId)
        .then((data) => {
          setIMAGE(BASE_URL + "/users/image/" + user.userId);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setIMAGE(null);
        });
    };
    imageServe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const imageName =
    user.image === undefined || user.image === null || IMAGE == null
      ? user.gender === "Male"
        ? "/assest/MaleImage.png"
        : "/assest/FemaleImage.jpeg"
      : IMAGE;

  return (
    <>
      <Card className="mt-3 border border-0 shadow responsive">
        <Card.Body>
          {/* divison here */}
          <Row>
            <Col md={1} className="rounded-circle">
              <img src={imageName} alt="Profile" style={profileStyle}></img>
            </Col>
            <Col md={11}>
              <Link
                to={`/users/profile/${user.userId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h5>{user.name}</h5>
              </Link>
              <p className="text-muted">
                <b>UserId</b> : {user.userId}
              </p>
              <p className="text-muted">
                <b>Email</b> : {user.email}
              </p>
              <p className="text-muted">
                <b>About</b> : {user.about}
              </p>
              {user.roles.map((role) => {
                return (
                  <Badge
                    bg={role.roleName === "ROLE_ADMIN" ? "danger" : "warning"}
                    pill
                    className="ms-2"
                  >
                    {role.roleName}
                  </Badge>
                );
              })}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleUserView;
