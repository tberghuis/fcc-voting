import { observable, computed } from 'mobx';

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
      this.loggedIn = true;
    }

    // call authservice login
    // no just assume logged in because only way would be set is by
    // hacker, plus no risk of getting access to protected data


  }

  //set token



  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.name = "";
    this.token = null;
    this.user_id = "";
  }

}

export default AppState;
