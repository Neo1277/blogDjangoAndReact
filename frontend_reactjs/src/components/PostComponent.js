import React from 'react';
import { Loading } from './LoadingComponent';
import { baseUrlApiRest } from '../shared/baseUrl';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
const PostContent = (props) => {
	
	if (props.postisLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.posterrMess) {
        return(
            <h4>{props.posterrMess}</h4>
        );
    }
	else{ 
		//console.log(JSON.stringify(props.post  ) +   ' postcontent');
		return(


			<div className="container">
				<div className="row">
					<div className="col-12">
						<h3>{props.post.title}</h3>
						<hr />
						<img top width="100%" src={baseUrlApiRest + props.post.image_post} alt={props.post.title} />
					</div>                
				</div>
				<div className="row row-content">
					<div className="col-12 col-md-6">
						<p>{props.post.description}</p>
						<p>{props.post.content}</p>
					</div>
				</div>
	
			</div>

        );
	}
}



export default PostContent;