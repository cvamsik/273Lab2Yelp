import React, { Component } from 'react';

// import { withStyles } from "@material-ui/core/styles";

import './RestaurantMenuCard.styles.css'

import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../../../reduxConfig/Cart/CartActions';
import Axios from 'axios';
import routeConstants from '../../../../Config/routeConstants';
// import {CART_ADD_ITEM,CART_REMOVE_ITEM} from '../../../reduxConfig/actionTypes'

// const [expanded, setExpanded] = React.useState(false);

class RestaurantMenuCard extends Component {
    state = {
        description: "",
        dish_name: "",
        image_url: "",
        ingredients: "",
        menu_id: 0,
        price: 0,
        catMapping: [
            "Nothing",
            "Desserts",
            "Salads",
            "Beverages",
            "Appetizers",
            "MainCourse"
        ]
    }

    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value }, () => {
            console.log(this.state)
        });
    }

    componentDidMount() {
        console.log(this.props)
        const stateData = {
            ...this.props.menuItem
        }
        this.setState({ ...stateData })
    }
    handleSubmit = (e) => {
        // e.preventDefault();

        let { catMapping, ...temp } = this.state;
        const postData = {
            ...temp
        }
        // console.log(postData)
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        Axios.put(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.UPDATE_MENU_ITEM}`, temp).then((res) => {
            console.log(res);
            window.alert("Updated Successfully");
        }).catch((err) => {
            console.log(err)
            window.alert("Unable to update");
        })
    }
    render() {
        let image
        if (this.state.image_url) {
            image = this.state.image_url.split('?')[0]
        }

        return (
            <div className="menuItemRes">
                <form className="formDataRes">
                    {/* <div className="profile"> */}
                    <div className="restImage2">
                        <img src={image} alt="Dish Image" className="img-thumbnail" width='100px' height='100px' />
                    </div>
                    <div class="form-group ">
                        <label >Name</label>
                        <input type="text" onChange={this.inputChangeHandler} className="form-control" name="dish_name" value={this.state.dish_name} />
                    </div>
                    <div class="form-group ">
                        <label >Description</label>
                        <input onChange={this.inputChangeHandler} type="text" className="form-control" name="description" value={this.state.description} />
                    </div>
                    <div class="form-group ">
                        <label >Ingredients</label>
                        <input type="text" onChange={this.inputChangeHandler} className="form-control" name="ingredients" value={this.state.ingredients} />
                    </div>

                    <div class="form-group ">
                        <label>Price</label>
                        <input type="text" onChange={this.inputChangeHandler} className="form-control" name="price" value={this.state.price} />
                    </div>
                    <div class="form-group ">
                        <label >Category</label>
                        <select value={this.state.category_id} onChange={this.inputChangeHandler} selected={this.state.category_id} name="category_id" class="form-control" >
                            <option value="Desserts">Desserts</option>
                            <option value="Salads">Salads</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Appetizers">Appetizers</option>
                            <option value="Main Course">Main Course</option>

                        </select>
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                    {/* <div class="form-row"> */}
                    <div >
                        <button type="submit" onClick={this.handleSubmit} class="btn btn-danger">Update Details</button>
                    </div>
                    {/* <div class="form-group col-md-2">
                            <button type="reset" class="btn btn-danger">Cancel Edit</button>
                        </div> */}
                    {/* </div> */}

                </form>
            </div >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        // emailHandler: (email_id) => dispatch(emailHandler(email_id)),
        // passwordHandler: (password) => dispatch(passwordHandler(password)),
        // authFlagHandler: (authFlag) => dispatch(authFlagHandler(authFlag)),
        // login: (loggedIn) => dispatch(login(loggedIn))
        addToCart: (dish) => dispatch(addToCart(dish)),
        removeFromCart: (dish) => dispatch(removeFromCart(dish))

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenuCard);