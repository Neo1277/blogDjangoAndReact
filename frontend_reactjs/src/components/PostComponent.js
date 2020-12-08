import React from 'react';
import { Media } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrlApiRest } from '../shared/baseUrl';
import Slider from './SliderComponent';

/**
 * Render comments
 */
function RenderComments({comments}){

    return (
        <div className="container">
          <div className="row">
            <Media list>
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id} className="col-12 mt-5">
                                <Media tag="li">
                                <Media left middle>
                                    <Media object src="assets/images/blank-profile-picture.png" alt={comment.nickname} />
                                </Media>
                                <Media body className="ml-5">
                                    <Media heading>{comment.nickname}</Media>
                                    <p>{comment.datetime}</p>
                                    <p>{comment.content}</p>
                                </Media>
                                </Media>
                            </div>
                        );
                    })}
            </Media>
          </div>
        </div>
    );            
}

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
						
						<h4>Genre:</h4>
						{/**
						 * Source: https://stackoverflow.com/a/50287386/9655579
						 */}
						<p>{props.post.genres.map(e => e.name).join(' | ')}</p>
						
						<h4>Sinopsis:</h4>
						<p>{props.post.description}</p>
						
						<h4>Description:</h4>
						<p>{props.post.content}</p>
					</div>
				</div>
				<div class="row row-content">
					<div class="col">
						<Slider dataposts={props.post.imageps} />
					</div>
				</div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Comments</h2>
                    </div>
                    <div className="col-12">
                        <RenderComments comments={props.post.commentps} />
                    </div>
                </div>				
			</div>

        );
	}
}



export default PostContent;