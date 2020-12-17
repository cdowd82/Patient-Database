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
    searchDBSect.hidden = false;
};

// back from update patient sect
function backFromUpdatePatientSect() {
    whenSignedIn.hidden = false;
    searchDBSect.hidden = true;
};