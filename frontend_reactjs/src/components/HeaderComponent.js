import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

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
						<NavbarBrand className="mr-auto">
							<img src="/assets/images/logo1.jpg" height="30" width="41" alt="My blog" />
						</NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg"></span> Home  
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</>
		);
	}
}

export default Header;