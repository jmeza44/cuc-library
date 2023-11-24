import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc, orderBy, startAfter } from 'firebase/firestore';
import { storeService } from './FirebaseService';
import { FirebaseError } from '@firebase/util';

export interface Book {
  id?: string;
  title: string;
  author: string;
  description: string;
  available: boolean;
  year: string;
}

export interface PaginationOptions {
  pageSize: number;
  page: number;
}

export interface SortingOptions {
  field: 'title' | 'author' | 'description' | 'year';
  direction: 'asc' | 'desc';
}

export interface FilteringOptions {
  field: string;
  value: any;
}

export interface BooksResult {
  books: Book[];
  totalBooks: number;
  totalPages: number;
}

export const getAllBooks = async (
  paginationOptions: PaginationOptions,
  sortingOptions: SortingOptions,
  filteringOptions?: FilteringOptions
): Promise<BooksResult | null> => {
  const booksCollection = collection(storeService, 'books');
  let booksQuery = query(booksCollection);

  // Apply filtering if provided
  if (filteringOptions && filteringOptions.value && filteringOptions.value !== "" && filteringOptions.field && filteringOptions.field !== "") {
    booksQuery = query(booksQuery, where(filteringOptions.field, '==', filteringOptions.value));
  }

  // Apply sorting
  booksQuery = query(booksQuery, orderBy(sortingOptions.field, sortingOptions.direction));

  // Apply pagination
  const skip = (paginationOptions.page) * paginationOptions.pageSize;
  booksQuery = query(booksQuery, startAfter(skip));

  try {
    const querySnapshot = await getDocs(booksQuery);

    const totalBooks = querySnapshot.size;

    let books = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Book));

    const totalPages = Math.ceil(totalBooks / paginationOptions.pageSize);

    books = books.slice(0, paginationOptions.pageSize);

    return {
      books,
      totalBooks,
      totalPages,
    };
  } catch (error) {
    console.error('Error getting books:', error);
    return null;
  }
};

export const findBookByTitle = async (title: string) => {
  const booksCollection = collection(storeService, 'books');
  const findByTitleQuery = query(
    booksCollection,
    where('title', '==', title)
  );

  try {
    const querySnapshot = await getDocs(findByTitleQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const book = querySnapshot.docs[0].data() as Book;
    return { id: querySnapshot.docs[0].id, ...book };
  } catch (error) {
    console.error('Error getting book by title:', error);
    return null;
  }
};

export const findBookByAuthor = async (author: string) => {
  const booksCollection = collection(storeService, 'books');
  const findByAuthorQuery = query(
    booksCollection,
    where('author', '==', author)
  );

  try {
    const querySnapshot = await getDocs(findByAuthorQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const book = querySnapshot.docs[0].data() as Book;
    return { id: querySnapshot.docs[0].id, ...book };
  } catch (error) {
    console.error('Error getting book by author:', error);
    return null;
  }
};

export const createBook = async (bookData: Book): Promise<string | FirebaseError> => {
  const booksCollection = collection(storeService, 'books');

  try {
    const newBookRef = await addDoc(booksCollection, bookData);
    return newBookRef.id; // Return the ID of the newly created book
  } catch (error) {
    const errorResponse = error as FirebaseError;
    console.error('Error creating book:', error);
    return errorResponse;
  }
};

export const updateBookById = async (updatedBookData: Book) => {
  if (!updatedBookData.id) return false;
  const bookDocRef = doc(storeService, 'books', updatedBookData.id);

  try {
    await updateDoc(bookDocRef, { ...updatedBookData });
    return true;
  } catch (error) {
    console.error('Error updating book:', error);
    return false;
  }
};

export const deleteBookById = async (id: string) => {
  const bookDocRef = doc(storeService, 'books', id);

  try {
    await deleteDoc(bookDocRef);
    return true;
  } catch (error) {
    console.error('Error deleting book:', error);
    return false;
  }
};
