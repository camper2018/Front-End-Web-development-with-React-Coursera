import React, { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

// CommentForm Component implementation
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleModalToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmitForm(values) {
    this.handleModalToggle();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }
  render() {
    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.handleModalToggle}>
          <ModalHeader toggle={this.handleModalToggle}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmitForm(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" sm={12}>
                  Rating
                </Label>

                <Col sm={12}>
                  {/* eslint-disable-next-line */}
                  <Control.select
                    model=".rating"
                    name="rating"
                    id="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" sm={12}>
                  Your Name
                </Label>
                <Col sm={12}>
                  {/* eslint-disable-next-line */}
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" sm={12}>
                  Comment
                </Label>
                <Col sm={12}>
                  {/* eslint-disable-next-line */}
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={12}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button
          className="btn btn-light btn-outline-secondary"
          onClick={this.handleModalToggle}
        >
          <span className="fa fa-pencil fa-lg"></span>Submit Comment
        </Button>
      </>
    );
  }
}

function RenderDish(props) {
  if (props.dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
          // When we apply FadeTransform to this card, this card will initially be out of the screen in a small random pop up on to the screen then the card is rendered in the view.
        >
          <Card key={props.dish.id}>
            <CardImg
              top
              src={baseUrl + props.dish.image}
              alt={props.dish.name}
            />
            <CardBody>
              <CardTitle>{props.dish.name}</CardTitle>
              <CardText>{props.dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  }
}
// function RenderComments({ comments, postComment, dishId }) {
//   let dishComments = comments.map((comment) => {
//     return (
//       <div key={comment.id}>
//         <br />
//         <li>{comment.comment}</li>
//         <br />
//         <li>
//           -- {comment.author},{" "}
//           {new Intl.DateTimeFormat("en-US", {
//             year: "numeric",
//             month: "short",
//             day: "2-digit",
//           }).format(new Date(Date.parse(comment.date)))}
//         </li>
//       </div>
//     );
//   });
//   return (
//     <div>
//       <h4>Comments</h4>
//       <ul className="list-unstyled">{dishComments}</ul>
//       <CommentForm dishId={dishId} postComment={postComment} />
//     </div>
//   );
// }
function RenderComments({ comments, postComment, dishId }) {
  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((comment) => {
              return (
                <Fade in>
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                      -- {comment.author} ,{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(comment.date)))}
                    </p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errorMsg) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errorMsg}</h4>
        </div>
      </div>
    );
  } else if (props.dish !== null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
