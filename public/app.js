console.log(firebase);

/**** Login in / out functionality ***/

const auth = firebase.auth();
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

/** 
 * @brief - on auth change user view
 * @params - none
 * @ret - none
*/
auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<p>User Name: ${user.displayName} </p><p>
            User ID: ${user.uid}</p>`;
    } else {
        // signed out
        whenSignedIn.hidden =  true;
        whenSignedOut.hidden= false;
        userDetails.innerHTML = '';
    }
});

/**** Database functionality ***/

// NOTE - db variable defined in public/index.html file
const patients = document.querySelector('#patientList');
const form = document.querySelector('#addPatientForm');

/** 
 * @brief - creates element and renders patient to DOM
 * @params - doc
 * @ret - none
*/
function renderPatient(doc) {
    // create variables from tags
    let li = document.createElement('li');
    let name = document.createElement('span');
    let age = document.createElement('span');
    let cross = document.createElement('div');

    // identify document by id tage in db
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    age.textContent = doc.data().age;
    cross.textContent = 'delete patient';

    // create list of from doc data
    li.appendChild(name);
    li.appendChild(age);
    li.appendChild(cross);
    patients.appendChild(li);

    // deleting patient
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Patients').doc(id).delete();
    })
}

// realtime listener 
db.collection('Patients').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderPatient(change.doc);
        } else if (change.type == 'removed') {
            let li = patientList.querySelector('[data-id=' + change.doc.id + ']');
            patientList.removeChild(li);
        }
    })
});

// save patient
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Patients').add({ 
        name: form.name.value,
        age: form.age.value
     });
     // reset form fields
     form.name.value = '';
     form.age.value = '';
});