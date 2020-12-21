import React from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Card, 
	CardImg, 
	CardText, 
	CardBody, 
	CardTitle, 
	Nav, 
	NavItem, 
	NavLink, 
	Breadcrumb, 
	BreadcrumbItem
} from 'reactstrap';
import Slider from './SliderComponent';
import { FadeTransform } from 'react-animation-components';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
const Home = (props) => {
	
	
	if (props.genres.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.genres.errMess) {
        return(
            <h4>{props.genres.errMess}</h4>
        );
    }
	else{ 
		/**
		 * Iterate over object that is in the store
		 */
		//console.log(JSON.stringify(props.featured_posts  ) +   ' postcontent');
		return(
			<>
			
				<Slider dataposts={props.featuredposts.featuredposts} />
				<br />
				<div className="container">

					{/*<h2 align="center">Categories</h2>*/}
					<div className="row">
						<div className="col">
							<Breadcrumb>
								<BreadcrumbItem active>Home</BreadcrumbItem>
							</Breadcrumb>
						</div>
					</div>
					<div className="row row-content">
						
						<div className="col-2">
							<h4>Categories</h4>
									{props.genres.genres.map((field, i) => { 
										return(
											<Nav vertical>
												<NavItem>
													{/*<NavLink href={`/genre/${field.slug}`}>{field.name}</NavLink>*/}
													<NavLink tag={Link} to={`/genre/${field.slug}`}>{field.name}</NavLink>
												</NavItem>
											</Nav>
										);
										
									}) }
						</div>
						<div className="col-10">
							<h4 align="center">Latest post</h4>
							
							<div className="row row-content">
						{
								props.posts.posts.map((field, i) => { 
									return(
									
										<div key={field._id} className="col-12 col-md-6 m-100">
											<FadeTransform in 
												transformProps={{
													exitTransform: 'scale(0.5) translateY(-50%)'
												}}>
													<Card>
														<Link to={`/post/${field.slug}`} >
															<CardImg className="postImage" src={field.image_post} alt={field.title} />
														</Link>
														<CardBody>
															<CardTitle>{field.title} </CardTitle>
															<CardText>{field.description}</CardText>
														</CardBody>
														
													</Card>		
										
											</FadeTransform>
										</div>		
																		
									);
									
								}) 
						}</div>
						</div>
					</div>			
				</div>
			</>
        );
	}
}



export default Home;