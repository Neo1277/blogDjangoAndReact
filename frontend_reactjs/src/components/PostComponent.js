import React, {Component} from 'react';
import { 
    Media, 
    Button, 
    Label, 
    Col, 
    Row 
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrlApiRest } from '../shared/baseUrl';
import Slider from './SliderComponent';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

/**
 * Comments form
 */
class Comment extends Component {

    constructor(props){
        super(props);


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */
    handleSubmit(values){
        console.log("Current State is: "+ JSON.stringify(this.props.postId + ", " +values))
        //alert("Current State is: "+ JSON.stringify(this.props.postId + ", " +values));
        this.props.postComment(this.props.postId, values.nickname, values.comment)
        this.props.resetCommentForm();
    }

    /**
     * Render form with their respective validations
     */
    render(){

        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h4>Make a comment about this post</h4>
                    </div>
                    <div className="col-12 col-md-9">
                    <Form model="comment" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="nickname" md={2}>Nickname</Label>
                                <Col md={10}>
                                    <Control.text model=".nickname" id="nickname" name="nickname"
                                        placeholder="Nickname"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors 
                                            className="text-danger"
                                            model=".nickname" 
                                            show="touched" 
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                          />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3)
                                        }} 
                                    />
                                    
                                    <Errors 
                                        className="text-danger"
                                        model=".comment" 
                                        show="touched" 
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send comment
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}


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
		console.log(JSON.stringify(props  ) +   ' postcontent');
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
				<div className="row row-content">
					<div className="col">
						<Slider dataposts={props.post.imageps} />
					</div>
				</div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Comments</h2>
                    </div>
                    <div className="col-12">
                        <Comment postId={props.post.id} resetCommentForm={props.resetCommentForm} postComment={props.postComment} />
                    </div>
                    <div className="col-12">
                        <RenderComments comments={props.comments.filter((comment) => comment.post === props.post.id)} />
                    </div>
                </div>				
			</div>

        );
	}
}



export default PostContent;