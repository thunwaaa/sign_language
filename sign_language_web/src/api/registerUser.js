import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const registerUser = async (email, password, username) => {
  // Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save additional user data in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    username,
    email,
  });

  // Send email verification
  await sendEmailVerification(user);

  return user;
};
