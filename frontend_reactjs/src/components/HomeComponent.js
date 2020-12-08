import React from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { baseUrlApiRest } from '../shared/baseUrl';
import Slider from './SliderComponent';

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
			
				<div class="container">
					<h2 align="center">Categories</h2>
						
					<div class="row row-content">

						{props.genres.genres.map((field, i) => { 
							
							return(
							<div className="col-12 col-md-4 m-20">
								<Card>
									<Link to={`/genre/${field.slug}`} >
										<CardImg top width="100%" src={baseUrlApiRest + field.image_genre} alt={field.name} />
									</Link>
									<CardBody>
										<CardTitle>{field.name} </CardTitle>
										<CardText>{field.description}</CardText>
									</CardBody>
								</Card>
							</div>				
					
							);
							
						}) }


					</div>

								
				</div>
			</>
        );
	}
}



export default Home;