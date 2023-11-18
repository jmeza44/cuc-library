import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { storeService } from './FirebaseService';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  borrowedBooks: string[];
}

export const findUserByEmail = async (email: string) => {
  const usersCollection = collection(storeService, "users");
  const findByEmailQuery = query(
    usersCollection,
    where("email", "==", email)
  );

  try {
    const querySnapshot = await getDocs(findByEmailQuery);

    if (querySnapshot.empty) {
      return null;
    }

    // Assuming there's only one user with the given email
    const user = querySnapshot.docs[0].data();
    return user;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

export const createUser = async (userData: UserData) => {
  const usersCollection = collection(storeService, "users");

  try {
    // Check if the user with the given email already exists
    const foundUser = await findUserByEmail(userData.email);
    if (foundUser) {
      return null;
    }

    // Add the new user to the "users" collection
    const newUserRef = await addDoc(usersCollection, userData);

    return newUserRef.id; // Return the ID of the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUserByEmail = async (email: string, updatedUserData: UserData) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return false;
  }

  const userDocRef = doc(storeService, "users", user.id);

  try {
    await updateDoc(userDocRef, { ...updatedUserData });
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteUserByEmail = async (email: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return false;
  }

  const userDocRef = doc(storeService, "users", user.id);

  try {
    await deleteDoc(userDocRef);
    return true;
  } catch (error) {
    return false;
  }
};