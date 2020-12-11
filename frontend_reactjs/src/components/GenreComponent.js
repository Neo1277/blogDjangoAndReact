import React from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { baseUrlApiRest } from '../shared/baseUrl';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
const GenreContent = (props) => {
	
	
	if (props.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <h4>{props.errMess}</h4>
        );
    }
	else{ 
		/**
		 * Iterate over object that is in the store
		 */
		return(
			<div className="container">
				<h2 align="center">Posts</h2>
					
				<div className="row row-content">
						
					{props.genre.postsgen.map((field, i) => { 
						
						return(
						<div key={field._id} className="col-12 col-md-4 m-20">
							<Card>
								<Link to={`/genres/${props.genre.slug}/${field.slug}`} >
									<CardImg top width="100%" src={baseUrlApiRest + field.image_post} alt={field.title} />
								</Link>
								<CardBody>
									<CardTitle>{field.title} </CardTitle>
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



export default GenreContent;