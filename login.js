// handles Firebase-related login logic
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function Login(){
    // The web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional. measurementID is used when Google Analytics is enabled.
	const firebaseConfig = {
		apiKey: process.env.REACT_APP_API_KEY,
		authDomain: process.env.REACT_APP_AUTH_DOMAIN,
		projectId: process.env.REACT_APP_PROJECT_ID,
		storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_APP_ID,
	};

	// Initialize Firebase
    const app = initializeApp(firebaseConfig);
	// firebase.initializeApp(firebaseConfig);  // code from mod 26

    // get elements
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');
    const logout = document.getElementById('logout');

    // login
	login.addEventListener('click', e => {
		const auth  = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(email.value, password.value);
		promise.catch(e => console.log(e.message));
	});

	// signup
	signup.addEventListener('click', e => {
		// check for real email
		const auth  = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
		promise.catch(e => console.log(e.message));
	});

    // logout
	logout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

    // login state
	// hide and show buttons depending on state
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			logout.style.display = 'inline';
			login.style.display  = 'none';
			signup.style.display = 'none';
		} else{
			console.log('User is not logged in');
			logout.style.display = 'none';
			login.style.display  = 'inline';
			signup.style.display = 'inline';
		}
	});
}

export default firebaseConfig;
