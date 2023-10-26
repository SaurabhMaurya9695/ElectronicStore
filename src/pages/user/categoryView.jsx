import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsOfCategory } from "../../service/category.service";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "../../components/user/SingleProductCard";


function CategoryViewUser() {
  const paramObj = useParams(); // capture whatever you pass im parameter
  const cId = paramObj.categoryId;
  const [totalProduct, setTotalProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const getProductsOfCategoryLocally = (currentPage, cId) => {
    getProductsOfCategory(cId, 0, 10, "addedDate", "desc")
      .then((e) => {
        console.log(e);
        if (currentPage === 0) {
          setTotalProduct({ ...e });
        } else {
          setTotalProduct({
            content: [...totalProduct.content, ...e.content], // first added categ then coming data we added after that
            lastPage: e.lastPage,
            pageNumber: e.pageNumber,
            pageSize: e.pageSize,
            totalElement: e.totalElement,
            totalPages: e.totalPages,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductsOfCategoryLocally(currentPage, cId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > 0) {
      getProductsOfCategoryLocally(currentPage, cId);
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadNextPage = () => {
    console.log("loading next page");
    setCurrentPage(currentPage + 1);
  };

  const productView = () => {
    return (
      totalProduct && (
        <>
          {/* using pagination */}
          <InfiniteScroll
            dataLength={totalProduct.content?.length}
            next={loadNextPage}
            hasMore={!totalProduct.lastPage}
            loader={<h4>Loading More Products For You ..Please Wait!!...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Container fluid className="mt-2">
              <Row>
                {totalProduct.content.map((p) => {
                  return (
                    <Col md={4} key={p.pId}>
                      <SingleProductCard product={p} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </InfiniteScroll>
        </>
      )
    );
  };

  const noProductView = () => {
    return (
      <>
        <Container className="text-center mt-3 " style={{ width: " 50%" }}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Oops .. No Product Found In this Category !! </h5>
              <Button variant="info" size="sm" as={Link} to={`/users/store`}>
                Go Back To Store
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  };

  return (
    <div>
      {totalProduct?.content?.length > 0 ? productView() : noProductView()}
    </div>
  );
}

export default CategoryViewUser;
