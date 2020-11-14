import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { baseUrlApiRest } from '../shared/baseUrl';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
function Home(props){
	
	
	if (props.genres.isLoading) {
		
        return(
            <p>Loading</p>
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
		return(
			<div class="container">
				<h4>Posts</h4>
				
				<div className="row">

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
        );
	}
}



export default Home;