import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { baseUrlApiRest } from '../shared/baseUrl';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
function PostContent(props){
	
	
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
		return(
			<div class="container">
				<h4>Posts</h4>
				
				<div className="row">

					{props.genres.postsgen.map((field, i) => { 
						
						return(
						<div className="col-12 col-md-4 m-20">
							<Card>
									<CardImg top width="100%" src={baseUrlApiRest + field.post_genre} alt={field.name} />
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



export default PostContent;