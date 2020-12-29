// Reference messages collection
var messagesRef = firebase.database().ref('apollorecords');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
 e.preventDefault();
 


  // Get values
  var name = getInputVal('name');
  var pid = getInputVal('pid');
  var dob = getInputVal('dob');
  var vaccine = getInputVal('vaccine');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  

  // Save message
  saveMessage(name, pid, dob, vaccine, email, phone);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, pid, dob, vaccine, email, phone){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    pid: pid,
    dob: dob,
    vaccine: vaccine,
    email:email,
    phone:phone,
  });
}
