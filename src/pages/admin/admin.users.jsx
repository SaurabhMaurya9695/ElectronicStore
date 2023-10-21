import { useState } from "react";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ADMIN_USER_PAGE_SIZE } from "../../service/helper.service";
import { getAllUser } from "../../service/user.service";
import SingleUserView from "../../components/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

const Users = () => {
  const [userData, setUserData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getAllUserLocal(currentPage, ADMIN_USER_PAGE_SIZE, "name", "asc");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > 0) {
      getAllUserLocal(currentPage, ADMIN_USER_PAGE_SIZE, "name", "asc");
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllUserLocal = async (pageNumber, pageSize, sortBy, sortDir) => {
    try {
      const data = await getAllUser(pageNumber, pageSize, sortBy, sortDir);
      console.log(data);
      //   if we call it first time  then no need of append
      if (currentPage > 0) {
        setUserData({
          content: [...userData.content, ...data.content], // first added categ then coming data we added after that
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElement: data.totalElement,
          totalPages: data.totalPages,
        });
      } else {
        setUserData({
          ...data,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Error in Loading ");
    }
  };

  const loadNextPage = () => {
    console.log("loading next page");
    setCurrentPage(currentPage + 1);
  };

  const userView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="text-center">
                <b>User's List</b>
              </Card.Header>
              <Card.Body>
                <InfiniteScroll
                  dataLength={userData.content.length}
                  next={loadNextPage}
                  hasMore={!userData.lastPage}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {userData.content.map((user) => {
                    return <SingleUserView key={user.userId} user={user} />;
                  })}
                </InfiniteScroll>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <>{userData && userView()}</>;
};

export default Users;
