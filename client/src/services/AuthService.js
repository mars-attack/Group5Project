import jwt_decode from "jwt-decode";

const AuthService = {
  loggedIn: () => {
    const token = localStorage.getItem("id_token");
    if (token) {
      let decodedJwt = jwt_decode(token);;
      if (decodedJwt.exp * 1000 > Date.now()) {
        return true;
      }
    }
    return false;
  }
};
export default AuthService;