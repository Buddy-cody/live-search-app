import axios from "axios";

export class UserService{
    static getALLUSERS(){
        return axios.get('https://randomuser.me/api?results=50');
    }
}