/**
 * Source: https://bezkoder.com/react-crud-web-api/
 */
import axios from "axios";
import { baseUrlApiRest } from './baseUrl';

//Set url and headers for the end point
export default axios.create({
  baseURL: baseUrlApiRest + "/api",
  headers: {
    "Content-type": "application/json"
  }
});