///
///-----------CLASSES USER--------------
///
import React from "react";

export default class User extends React.Component {
  ///CONSTRUCTEUR
  constructor(props) {
    super(props);
    this.isOnline = null
    this.email = undefined
    this.password = undefined
    this.lastName = undefined
    this.firtsName = undefined
    this.age = undefined
    this.sex = undefined
  }

  //-------FONCTIONS DE CONNECTION----------
  login(email,password) { 
    this.isOnline = true 
    this.email = email
    this.password = password
  }

  logout() { this.isOnline = false }

  register(email,password){
    this.setEmail(email)
    this.setPassword(password)
  }

  render() {
    if (this.isOnline === null) {
      return 'Chargement...';
    }
    return this.isOnline ? 'En ligne' : 'Hors-ligne';
  }
  

  //-------FONCTIONS D'UTILISATEUR---------
  setEmail(email){this.email = email}
  setPassword(password){this.password = password}
  setLasName(lastName){this.lastName = lastName }
  setFirstName(firtsName){this.firtsName = firtsName }
  setAge(age){this.age = age }
  setLasName(sex){this.sex = sex }

}