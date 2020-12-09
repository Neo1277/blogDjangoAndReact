/**
 * Source: https://bezkoder.com/react-crud-web-api/
 */
import http from "../shared/http-common";

//Set end points for each request
class PostDataService {
  
  getAllGenres() {
    return http.get("/genres");
  }

  getAllPosts() {
    return http.get("/posts");
  }

  getFeaturedPosts() {
    return http.get("/featured_posts");
  }

  saveComment(data) {
    return http.post("/comments", data);
  }

}

export default new PostDataService();