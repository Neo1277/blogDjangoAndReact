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

}

export default new PostDataService();