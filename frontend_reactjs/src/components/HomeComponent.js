import React from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardText, CardBody, CardTitle, CardGroup  } from 'reactstrap';
import { baseUrlApiRest } from '../shared/baseUrl';
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
					<h2 align="center">Categories</h2>
						
					<div className="row row-content">
						{/*props.genres.genres.map((field, i) => { 
							return(
							<div key={field._id} className="col-12 col-md-4 m-100">

								<FadeTransform in 
									transformProps={{
										exitTransform: 'scale(0.5) translateY(-50%)'
									}}>
									<Card inverse style={{ backgroundColor: '#333' }}>
										<Link to={`/genre/${field.slug}`} >
											<CardImg className="genreImage" src={baseUrlApiRest + field.image_genre} alt={field.name} />
										</Link>
										<CardBody>
											<CardTitle tag="h5">{field.name} </CardTitle>
											<CardText>{field.description}</CardText>
										</CardBody>
									</Card>
								
								</FadeTransform>
							</div>				
					
							);
							
						}) */}

					

						{
							 
								<CardGroup className="cardGroup">
									{props.genres.genres.map((field, i) => { 
										return(
										
											<FadeTransform in 
												transformProps={{
													exitTransform: 'scale(0.5) translateY(-50%)'
												}}>
												<Card inverse style={{ backgroundColor: '#333' }}>
													<Link to={`/genre/${field.slug}`} >
														<CardImg className="genreImage" src={baseUrlApiRest + field.image_genre} alt={field.name} />
													</Link>
													<CardBody>
														<CardTitle tag="h5">{field.name} </CardTitle>
													</CardBody>
												</Card>
											
											</FadeTransform>	
								
										);
										
									}) }
								</CardGroup>
							
						}
					</div>			
				</div>
			</>
        );
	}
}



export default Home;