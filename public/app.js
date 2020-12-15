console.log(firebase)

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

// NOTE - db variable defined in index file
const patients = document.querySelector('#patientList');

/** 
 * @brief - creates element and render patient
 * @params - doc
 * @ret - 
*/
function renderPatient(doc) {
    // create variables from tags
    let li = document.createElement('li');
    let firstName = document.createElement('span');
    let middleNames = document.createElement('span');
    let lastName = document.createElement('span');
    let age = document.createElement('span');

    // identify document by id tage in db
    li.setAttribute('data-id', doc.id);
    firstName.textContent = doc.data().firstName;
    middleNames.textContent = doc.data().middleNames;
    lastName.textContent = doc.data().lastName;
    age.textContent = doc.data().age

    // create list of from doc data
    li.appendChild(firstName);
    li.appendChild(middleNames);
    li.appendChild(lastName);
    li.appendChild(age);
    patients.appendChild(li);
}



// display patients in console
db.collection('Patients').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderPatient(doc);
    })
})
