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

/*** Sight Navigation ***/

const newPatientSect = document.getElementById('newPatientSect');
const preIndexSect = document.getElementById('preIndexSect');
const indexSect = document.getElementById('indexSect');
const sevenDaySect = document.getElementById('sevenDaySect');
const thirtyDaySect = document.getElementById('thirtyDaySect');
const oneYearSect = document.getElementById('oneYearSect');
const searchDBSect = document.getElementById('searchDBSect');
const updatePatientSect = document.getElementById('updatePatientSect');
const deletePatientSect = document.getElementById('deletePatientSect');

// Site navigation funcs //

// enter new patient section function
function enterNewPatientSect() {
    whenSignedIn.hidden = true;
    newPatientSect.hidden = false;
};

// got back to landing page from new patient
function backFromNewPatientSect() {
    whenSignedIn.hidden = false;
    newPatientSect.hidden = true;

};

// enter pre-index sect
function enterPreIndexSect() {
    newPatientSect.hidden = true;
    preIndexSect.hidden = false;
};

// back to new patient section from pre index section
function backFromPreIndex() {
    newPatientSect.hidden = false;
    preIndexSect.hidden = true;
}

// enter index sect
function enterIndexSect() {
    newPatientSect.hidden = true;
    indexSect.hidden = false;
};

// back from index sect
function backFromIndex() {
    newPatientSect.hidden = false;
    indexSect.hidden = true;
}

// enter 7 day sect
function enterSevenDaySect() {
    newPatientSect.hidden = true;
    sevenDaySect.hidden = false;
};

// back from 7 day sect
function backFromSevenDaySect() {
    newPatientSect.hidden = false;
    sevenDaySect.hidden = true;
}

// enter 30 day sect
function enterThirtyDaySect() {
    newPatientSect.hidden = true;
    thirtyDaySect.hidden = false;
};

// back from 30 day sect
function backFromThirtyDaySect() {
    newPatientSect.hidden = false;
    thirtyDaySect.hidden = true;
}

// enter 1 year sect
function enterOneYearSect() {
    newPatientSect.hidden = true;
    oneYearSect.hidden = false;
};

// back from 1 year sect
function backFromOneYearSect() {
    newPatientSect.hidden = false;
    oneYearSect.hidden = true;
}

// enter search DB sect
function enterSearchDBSect() {
    whenSignedIn.hidden = true;
    searchDBSect.hidden = false;
};

// back from DB sect
function backFromSearchDBSect() {
    whenSignedIn.hidden = false;
    searchDBSect.hidden = true;
};

// enter update patient sect
function enterUpdatePatientSect() {
    whenSignedIn.hidden = true;
    updatePatientSect.hidden = false;
};

// back from update patient sect
function backFromUpdatePatientSect() {
    whenSignedIn.hidden = false;
    updatePatientSect.hidden = true;
};

// enter delete patient sect
function enterDeletePatientSect() {
    whenSignedIn.hidden = true;
    deletePatientSect.hidden = false;
};

// back from update patient sect
function backFromDeletePatientSect() {
    whenSignedIn.hidden = false;
    deletePatientSect.hidden = true;
};

/*** Database **/

const addPreIndexDataForm = document.querySelector('#addPreIndexForm');
const patientList = document.querySelector('#patientList');
const patientSearchList = document.querySelector('#patientSearchList');
const searchForm = document.querySelector('#searchForm');

/** 
 * @brief - creates element and renders patient to DOM
 * @params - doc
 * @ret - none
*/
function renderPatient(doc) {
    // create variables from tags
    let li = document.createElement('li');
    let name = document.createElement('span');
    let dob = document.createElement('span');
    let cross = document.createElement('div');

    // identify document by id tage in db
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().firstName + ' ' + doc.data().middleNames + ' ' + doc.data().lastName;
    dob.textContent = doc.data().dob;
    cross.textContent = 'delete patient';

    // create list of from doc data
    li.appendChild(name);
    li.appendChild(dob);
    li.appendChild(cross);
    patientList.appendChild(li);

    // deleting patient
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        const del = confirm('Confirm delete patient');
        if (del) {
            db.collection('Patients').doc(id).delete();
        } else {
            // Do not delete
        }
    })
}

/** 
 * @brief - creates element and renders patient to DOM
 * @params - doc
 * @ret - none
*/
function renderSearchedPatient(doc) {
    // create variables from tags
    let li = document.createElement('li');
    let name = document.createElement('span');
    let dob = document.createElement('span');

    // identify document by id tage in db
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().firstName + ' ' + doc.data().middleNames + ' ' + doc.data().lastName;
    dob.textContent = doc.data().dob;

    // create list of from doc data
    li.appendChild(name);
    li.appendChild(dob);
    patientSearchList.appendChild(li);
}

// realtime listener 
db.collection('Patients').onSnapshot(snapshot => {
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

// notifies user patient has been added
function addPatientAlert() {
    const ad = confirm("Confirm add patient");
    if (ad) {
       return true;
    } else {
        return false;
    }
}

// confirm delete patient
function deletePatientAlert() {
    confirm("alert");
}

// enter patient into database
addPreIndexDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const conf = addPatientAlert();
    if (conf) {
    db.collection('Patients').add({ 
        firstName: addPreIndexDataForm.firstName.value,
        middleNames: addPreIndexDataForm.middleNames.value,
        lastName: addPreIndexDataForm.lastName.value,
        dob: addPreIndexDataForm.dob.value,
        bloodPressure: addPreIndexDataForm.bloodPressure.value,
        lvedp: addPreIndexDataForm.lvedp.value,
        hxStroke: addPreIndexDataForm.hxStroke.value,
        hf: addPreIndexDataForm.hf.value,
        mitralReg: addPreIndexDataForm.mitralReg.value,
     });
     // reset form fields
     addPreIndexDataForm.firstName.value = '';
     addPreIndexDataForm.middleNames.value = '';
     addPreIndexDataForm.lastName.value = '';
     addPreIndexDataForm.dob.value = '';
     addPreIndexDataForm.bloodPressure.value = '';
     addPreIndexDataForm.lvedp.value = '';
     addPreIndexDataForm.hxStroke.value = '';
     addPreIndexDataForm.hf.value = '';
     addPreIndexDataForm.mitralReg.value = '';
     backFromNewPatientSect();
     } else {
         // Keep fields with active data. Add no data to patient DB.
     }
});

// Seach database for id of document with names first last
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const patientName = searchForm.searchName.value
    console.log(patientName);

    db.collection('Patients').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const fName = doc.data().firstName;
            const lName = doc.data().lastName;
            const fullName = fName + ' ' + lName;

            if(patientName == fullName) {
                console.log(fullName);
                // create variables from tags
                let li = document.createElement('li');
                let name = document.createElement('span');
                let dob = document.createElement('span');
                let select = document.createElement('div');

                // identify document by id tage in db
                li.setAttribute('data-id', doc.id);
                name.textContent = doc.data().firstName + ' ' + doc.data().middleNames + ' ' + doc.data().lastName;
                dob.textContent = doc.data().dob;
                select.textContent = 'Select';

                // create list of from doc data
                li.appendChild(name);
                li.appendChild(dob);
                li.appendChild(select);
                patientSearchList.appendChild(li);

                select.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('Select');
                    console.log(doc);
                });
            } else {
                // Don't print to terminal
            }
        });
    });
});

function clearPatientSearch() {
    patientSearchList.innerHTML = '';
};