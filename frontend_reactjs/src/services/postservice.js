/**
 * Source: https://bezkoder.com/react-crud-web-api/
 */
import http from "../shared/http-common";

//Set end points for each request
class PostDataService {
  getAll() {
    return http.get("/posts");
  }

}

export default new PostDataService();