import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Favorites from "./FavoriteComponent";
import Header from "./HeaderComponent";
import Footer from "../components/FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
  loginUser,
  logoutUser,
  fetchFavorites,
  postFavorite,
  deleteFavorite,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  // maps redux store state to props and make it available for use.
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  // dispatch is a method available from store
  postComment: (dishId, rating, comment) =>
    dispatch(postComment(dishId, rating, comment)),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }
  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrorMsg={this.props.dishes.errorMsg}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrorMsg={this.props.promotions.errorMsg}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrorMsg={this.props.leaders.errorMsg}
        />
      );
    };

    const DishWithId = ({ match }) => {
      // console.log("favorites:", this.props);

      return this.props.auth.isAuthenticated ? (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              // (dish) => dish._id === parseInt(match.params.dishId, 10) )[0]
              (dish) => dish._id === match.params.dishId
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errorMsg={this.props.dishes.errorMsg}
          comments={this.props.comments.comments.filter(
            // (comment) => comment.dishId === parseInt(match.params.dishId, 10)
            (comment) => comment.dish === match.params.dishId
          )}
          commentsErrorMsg={this.props.comments.errorMsg}
          postComment={this.props.postComment}
          // favorite={this.props.favorites.favorites.dishes.some(
          //   (dish) => dish._id === match.params.dishId
          // )}
          favorite={
            this.props.favorites.favorites
              ? this.props.favorites.favorites.dishes.some(
                  (dish) => dish._id === match.params.dishId
                )
              : false
          }
          postFavorite={this.props.postFavorite}
        />
      ) : (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish._id === match.params.dishId
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errorMsg={this.props.dishes.errorMsg}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dish === match.params.dishId
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={false}
          postFavorite={this.props.postFavorite}
        />
      );
    };
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
    return (
      <React.Fragment>
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              <PrivateRoute
                exact
                path="/favorites"
                component={() => (
                  <Favorites
                    favorites={this.props.favorites}
                    deleteFavorite={this.props.deleteFavorite}
                  />
                )}
              />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </React.Fragment>
    );
  }
}
// if we are using the React Router, then in order to connect the component to the React Router, we need to surround it with the withRouter.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
