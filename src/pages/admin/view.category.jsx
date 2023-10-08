import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CategoryView from "../../components/user/CategoryView";
import {
  getAllCategory,
  updateCategories,
} from "../../service/category.service";
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategory = (props) => {
  const [categories, setCategories] = useState({
    content: [],
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => {
    setShowUpdate(true);
  };

  //load all pages initial time
  useEffect(() => {
    setLoading(true);
    getAllCategory()
      .then((cate) => {
        console.log(cate);
        setCategories(cate);
        toast.success("Category Loaded Successfully!!");
      })
      .catch((error) => {
        console.log(error);
        setCategories(null);
        toast.success("Error in Loading");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //load all pages when pages change
  useEffect(() => {
    if (currentPage > 0) {
      getAllCategory(currentPage)
        .then((cate) => {
          console.log(cate);
          setCategories({
            content: [...categories.content , ...cate.content], // first added categ then coming data we added after that 
            lastPage: cate.lastPage,
            pageNumber: cate.pageNumber,
            pageSize: cate.pageSize,
            totalElement: cate.totalElement,
            totalPages: cate.totalPages,
          });
        })
        .catch((error) => {
          console.log(error);
          setCategories(null);
          toast.success("Error in Loading");
        });
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    handleShow();
  };

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    handleShowUpdate();
  };

  const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "contain",
  };

  const handleChange = (event, property) => {
    setSelectedCategory({
      ...selectedCategory,
      [property]: event.target.value,
    });
  };

  const modelView = () => {
    return (
      <>
        {selectedCategory ? (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="me-3">
                {selectedCategory.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className="text-center ">
                <img
                  style={imageStyle}
                  src={selectedCategory.coverImage}
                  alt="coverImage"
                />
              </Container>
              <span className="mt-2 ">{selectedCategory.discription}</span>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  };

  const updateCategory = (event) => {
    event.preventDefault();
    if (
      selectedCategory.title === undefined ||
      selectedCategory.title.trim() === ""
    ) {
      toast.error("Can't leave Title Empty ");
      return;
    }
    console.log(selectedCategory);
    updateCategories(selectedCategory)
      .then((data) => {
        console.log("Successfully Updated");
        toast.success("SuccessFully Updated");
        const newCategory = categories.content.map((cat) => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = data.title;
            cat.discription = data.discription;
            cat.coverImage = data.coverImage;
          }
          return cat;
        });

        setCategories({
          ...categories, //fetch old category
          content: newCategory,
        });
        handleCloseUpdate();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.title);
      });
  };

  //loadNextPage
  const loadNextPage = () => {
    console.log("loading next page");
    setCurrentPage(currentPage + 1);
  };
  const modelUpdate = () => {
    return (
      <>
        {selectedCategory ? (
          <Modal show={showUpdate} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
              <Modal.Title className="me-3">
                {selectedCategory.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <Container>
                    <img
                      style={imageStyle}
                      className="img-fluid"
                      src={selectedCategory.coverImage}
                      alt="coverImage"
                    ></img>
                  </Container>
                  <FormLabel className="py-2">Category Image Url</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter You coverImage"
                    value={selectedCategory.coverImage}
                    onChange={(event) => handleChange(event, "coverImage")}
                  ></FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Category Title</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter You title"
                    value={selectedCategory.title}
                    onChange={(event) => handleChange(event, "title")}
                  ></FormControl>
                </FormGroup>
                <FormGroup className="mt-3">
                  <FormLabel>Category Description</FormLabel>
                  <FormControl
                    as={"textarea"}
                    rows={5}
                    placeholder="Enter You description"
                    value={selectedCategory.discription}
                    onChange={(event) => handleChange(event, "discription")}
                  ></FormControl>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Close
              </Button>
              <Button variant="primary" onClick={updateCategory}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  };
  return (
    <div>
      {categories?.content?.length > 0 ? (
        <>
          <div className="text-center">
            <Spinner
              animation="border"
              size="lg"
              variant="info"
              hidden={!loading}
            />
          </div>
          <InfiniteScroll
            dataLength={categories.content.length}
            next={loadNextPage}
            hasMore={!categories.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {categories.content.map((cat) => {
              return (
                <CategoryView
                  passCategories={cat}
                  key={cat.categoryId}
                  viewCategory={handleViewCategory}
                  updateCategory={handleUpdateCategory}
                />
              );
            })}
          </InfiniteScroll>
        </>
      ) : (
        <>
          <Container className="text-center border border-0 shadow">
            <Card>
              <Card.Body>
                <h5>There is no Category</h5>
              </Card.Body>
            </Card>
          </Container>
        </>
      )}
      {selectedCategory ? modelView() : null}
      {selectedCategory ? modelUpdate() : null}
    </div>
  );
};

export default ViewCategory;
