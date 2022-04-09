const firebaseConfig = {
  apiKey: 'AIzaSyB3_NZD4Ea-o2x6LvGWMHhQiCAOSZt3KIM',
  authDomain: 'contactform-portfolio-b1ecb.firebaseapp.com',
  databaseURL:
    'https://contactform-portfolio-b1ecb-default-rtdb.firebaseio.com',
  projectId: 'contactform-portfolio-b1ecb',
  storageBucket: 'contactform-portfolio-b1ecb.appspot.com',
  messagingSenderId: '22745779708',
  appId: '1:22745779708:web:9889277fd520941d2f3679',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference for your database
var contactFormDB = firebase.database().ref('contactForm');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal('name');
  var emailid = getElementVal('emailid');
  var phone = getElementVal('phone');
  var message = getElementVal('message');

  saveMessages(name, emailid, phone, message);

  //enable alert
  const alert = document.querySelector('.alert');
  alert.style.display = 'block';

  //remove alert
  setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);

  //reset the form
  document.getElementById('contactForm').reset();
}

const saveMessages = (name, emailid, phone, message) => {
  var newContactForm = contactFormDB.push();
  newContactForm.set({
    name: name,
    emailid: emailid,
    phone: phone,
    message: message,
  });
};

const getElementVal = id => {
  return document.getElementById(id).value;
};
