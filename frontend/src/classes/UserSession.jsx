export default class UserSession {
    constructor(userData) {
      this.username = userData.username;
      this.group = userData.usergroup;
      this.sessionId = userData.sessionId;
    }
  
    isAdmin() {
      return this.group === "USER ADMIN";
    }
  
    isHomeowner() {
      return this.group === "HOMEOWNER";
    }
  
   
  }
  