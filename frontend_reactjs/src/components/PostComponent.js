import React from 'react';
//import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { baseUrlApiRest } from '../shared/baseUrl';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
function PostContent(props){
	
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
		//console.log(JSON.stringify(props.post  ) +   ' postcontent');
		return(
			<div class="container">
					<h2 align="center">Posts</h2>
					
					<div className="row row-content">

						
								<div className="col-12 col-md-4 m-20">
									<Card>
										<CardImg top width="100%" src={baseUrlApiRest + props.post.image_post} alt={props.post.title} />
										<CardBody>
											<CardTitle>{props.post.title} </CardTitle>
											<CardText>{props.post.description}</CardText>
										</CardBody>
									</Card>
								</div>				
					


					</div>

							
			</div>
        );
	}
}



export default PostContent;