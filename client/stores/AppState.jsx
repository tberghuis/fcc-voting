import { observable, computed } from 'mobx';
import axios from 'axios';

class AppState {

  @observable loggedIn = false;
  @observable name = "";

  // got to get this from localstorage
  token = null;
  user_id = "";

  constructor() {
    // check if token and user_id in localstorage
    this.token = localStorage.getItem("token");
    this.user_id = localStorage.getItem("user_id");
    this.name = localStorage.getItem("name");

    if (this.token) {
      axios.get('/auth/login?token=' + this.token)
        .then((response) => {

          this.loggedIn = true;
          console.log(this);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.name = "";
    this.token = null;
    this.user_id = "";
  }

}

export default AppState;
