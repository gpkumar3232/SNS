import axios from "axios";
import { config } from "../env";
import HttpRoutingService from "./httpRoutingService";

class authService {
    login(data) {
        let url = 'login'?.replace(/#/g, '%23');
        return axios.post(config.apiUrldb + url, data);
    }
    signUpUser(data) {
            return HttpRoutingService.postMethod('signup', data);
    }
    getAllUser(data) {
        return HttpRoutingService.getMethod('users', data);
    }
}
const AuthService = new authService();

export default AuthService;