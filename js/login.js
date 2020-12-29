
/*function login()
{
  var userEmail = document.getElementById("userid").value;
  var userPass = document.getElementById("password").value;
  
  window.alert(userEmail);
  window.alert(userPass);
}*/
 firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        firebase.auth().signOut();
        window.location.replace("afterlogin.html");
  
    } 
  });
  
  function login(){
  
  
  
    var userEmail = document.getElementById("userid").value;
    var userPass = document.getElementById("password").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function logout(){

    firebase.auth().signOut();
    window.location.replace("login.html");
    
  }
  