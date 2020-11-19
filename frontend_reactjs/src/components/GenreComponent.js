import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { baseUrlApiRest } from '../shared/baseUrl';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
function GenreContent(props){
	
	
	if (props.isLoading) {
		
        return(
            <p>Loading</p>
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
			<div class="container">
				<h2 align="center">Posts</h2>
					
				<div class="row row-content">
						
					{props.genre.postsgen.map((field, i) => { 
						
						return(
						<div className="col-12 col-md-4 m-20">
							<Card>
								<Link to={`/post/${field.slug}`} >
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