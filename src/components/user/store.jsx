import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory } from "../../service/category.service";
import { getAllLive } from "../../service/product.service";
import SingleProductCard from "./SingleProductCard";

const Store = () => {
  const [totalProduct, setTotalProduct] = useState(null);
  const [totalCategories, setTotalCategories] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

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

  const getAllProductLocal = (pageNumber , pageSize , sortBy , sortDir) => {
    getAllLive(pageNumber , pageSize , sortBy , sortDir)
      .then((e) => {
        console.log(e);
        if(currentPage === 0){
          setTotalProduct({ ...e });
        }else{
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
        toast.error("Error in Loading Products");
      });
  };

  useEffect(() => {
    getAllCategoryLocal(0, 100000);
    getAllProductLocal(currentPage ,9,'addedDate' , 'desc');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(currentPage > 0 ){
      getAllProductLocal(currentPage ,9,'addedDate' , 'desc');
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
            <Container fluid>
              <Row>
                {
                  totalProduct.content.map(p=>{
                    return (<Col md={4} key={p.pId}>
                            <SingleProductCard product ={p} />
                            </Col>)
                  })
                }
              </Row>
            </Container>
          </InfiniteScroll>
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
                  <ListGroupItem as={Link} to={`/store/${c.categoryId}/${c.title}`} key={c.categoryId} defaultValue="">
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
