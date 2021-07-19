import React, { Component } from 'react';
import { 
	Navbar, 
	NavbarBrand, 
	Nav, 
	NavbarToggler, 
	Collapse, 
	NavItem, 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody,
	Form, 
	FormGroup, 
	Input, 
    Label, 
    TabContent, 
    TabPane, 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem 
} from 'reactstrap';

/**
 * Comments form
 */
class ProfileSettingsComponent extends Component {

    constructor(props){
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

    handleRegister(event) {
        this.toggleModal();
        this.props.registerUser({
            username: this.username.value, 
            email: this.email.value, 
            first_name: this.first_name.value, 
            last_name: this.last_name.value, 
            password: this.password.value, 
            profile_image: this.state.profile_image
        });
        /*
        this.props.registerUser(
            this.username.value, 
            this.email.value, 
            this.first_name.value, 
            this.last_name.value, 
            this.password.value, 
            this.state.profile_image
        );*/
        event.preventDefault();

    }    
    

    /**
     * Render form with their respective validations
     */
    render(){

        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h4>Profile settings</h4>
                    </div>
                    <div className="col-12 col-md-9">

                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="first_name">First name</Label>
                                <Input type="text" id="first_name" name="first_name"
                                    innerRef={(input) => this.first_name = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="last_name">Last name</Label>
                                <Input type="text" id="last_name" name="last_name"
                                    innerRef={(input) => this.last_name = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email address</Label>
                                <Input type="email" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="secondary">Sign up</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default ProfileSettingsComponent;