import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Example from './SliderComponent';

class Header extends Component{
	constructor(props) {
	    super(props);

	    this.toggleNav = this.toggleNav.bind(this);
	    this.state = {
		  isNavOpen: false
	    };
	}

	toggleNav() {
	    this.setState({
	      isNavOpen: !this.state.isNavOpen
	    });
	}
	render(){
		return(
			<>
				<Navbar dark expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<NavbarBrand className="mr-auto" href="/">
							<img src="assets/images/violetskull.jpg" height="30" width="41" alt="My blog" />
						</NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg"></span> Home  
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/aboutus"> 
										<span className="fa fa-info fa-lg"></span> About Us    
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
				<Example />
			</>
		);
	}
}

export default Header;