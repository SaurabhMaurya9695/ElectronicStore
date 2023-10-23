import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { getAllCategory } from "../../service/category.service";
import { getAllproduct } from "../../service/product.service";

const Store = () => {
  const [totalProduct, setTotalProduct] = useState(null);
  const [totalCategories, setTotalCategories] = useState(null);

  const getAllCategoryLocal = (pageNumber, pageSize) => {
    return getAllCategory(pageNumber, pageSize)
      .then((resp) => {
        // console.log(resp);
        setTotalCategories({ ...resp });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllProductLocal = () => {
    getAllproduct()
      .then((e) => {
        setTotalProduct({ ...e });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCategoryLocal(0, 100000);
    getAllProductLocal();
  }, []);

  const productView = () => {
    return (
      totalProduct && (
        <>
          <h4>productView</h4>
        </>
      )
    );
  };

  const categoryView = () => {
    return (
      totalCategories && (
        <>
          <ListGroup className="sticky-top hover" variant="flush">
            <ListGroupItem>
              <b>All Categories </b>
            </ListGroupItem>
            {totalCategories.content.map((c) => {
              return (
                <>
                  <ListGroupItem key={c.categoryId} defaultValue="">
                    <img
                      src={
                        c.coverImage
                          ? c.coverImage
                          : "/assest/noProductImage.png"
                      }
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                      alt="NoImageFound"
                    ></img>
                    <span className="ms-2">{c.title}</span>
                  </ListGroupItem>
                </>
              );
            })}
          </ListGroup>
        </>
      )
    );
  };

  return (
    <>
      <Container className="px-5 pt-5" fluid>
        <Row>
          <Col md={2}>{categoryView()}</Col>
          <Col md={10}>{productView()}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Store;
