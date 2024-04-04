import { isNumeric } from '../utilities/tools'

export class Protect {

  static logIn() {
    console.log("Logged in")
    localStorage.setItem('Auth', 'true');
  }

  static logOut() {
    localStorage.setItem('Auth', 'false');
    console.log("Logged out")
    window.location.reload()
  }

  static isLoggedIn() {
    const isLogged = localStorage.getItem('Auth')
    const isNum = isNumeric(JSON.parse(localStorage.getItem('Token'))["id"])

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve( isLogged === 'true' && !isNaN(isNum) );
      }, 500);
    });
  }
}
