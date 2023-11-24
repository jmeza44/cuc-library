import React, { ReactNode, useState } from "react";
import {
  Book,
  BooksResult,
  FilteringOptions,
  PaginationOptions,
  SortingOptions,
  createBook,
  deleteBookById,
  getAllBooks,
  updateBookById,
} from "../../services/BookService";
import { useToast } from "../../components/common/toastAlert/ToastAlert";

interface BooksContext {
  booksPaginated: BooksResult | null;
  bookToEdit: Book | null;
  editingBook: boolean;
  loadingBooks: boolean;
  addingBook: boolean;
  paginationOptions: PaginationOptions;
  sortingOptions: SortingOptions;
  filteringOptions?: FilteringOptions;
  loadBooks: () => void;
  addBook: (book: Book) => void;
  editBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  setBookToEdit: (book: Book) => void;
  setEditingBook: (editing: boolean) => void;
  updatePaginationOptions: (paginationOptions: PaginationOptions) => void;
  updateSortingOptions: (sortingOptions: SortingOptions) => void;
  updateFilteringOptions: (filteringOptions?: FilteringOptions) => void;
}

export const BooksContext = React.createContext<BooksContext | undefined>(
  undefined
);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [booksPaginated, setBooksPaginated] = useState<BooksResult | null>(
    null
  );
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<boolean>(false);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(false);
  const [addingBook, setAddingBook] = useState<boolean>(false);
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>(
    { page: 1, pageSize: 10 }
  );
  const [sortingOptions, setSortingOptions] = useState<SortingOptions>({
    direction: "asc",
    field: "title",
  });
  const [filteringOptions, setFilteringOptions] = useState<
    FilteringOptions | undefined
  >(undefined);

  const { setToastMessage, setToastStyle, show } = useToast();

  const loadBooks = async () => {
    setLoadingBooks(true);
    const getAllBooksResult = await getAllBooks(
      paginationOptions,
      sortingOptions,
      filteringOptions
    );
    if (!getAllBooksResult) {
      setToastMessage("Error Loading Books!");
      setToastStyle("error");
      show();
    }
    setLoadingBooks(false);
    setBooksPaginated(getAllBooksResult);
  };

  const addBook = async (book: Book) => {
    setAddingBook(true);
    const bookReference = await createBook(book);
    if (typeof bookReference === "string") {
      setToastMessage("Book Added!");
      setToastStyle("success");
      show();
    } else {
      setToastMessage("Error Adding the Book!");
      setToastStyle("error");
      show();
    }
    setAddingBook(false);
    loadBooks();
  };

  const editBook = async (book: Book) => {
    const isSuccessResult = await updateBookById(book);
    if (isSuccessResult) {
      setToastMessage("Book Edited!");
      setToastStyle("success");
      show();
      setBookToEdit(null);
      setEditingBook(false);
      loadBooks();
    } else {
      setToastMessage("Error Editing the Book!");
      setToastStyle("error");
      show();
    }
    setBookToEdit(null);
    setEditingBook(false);
    loadBooks();
  };

  const deleteBook = async (id: string) => {
    const deleted = await deleteBookById(id);
    if (deleted) {
      setToastMessage("Book Deleted!");
      setToastStyle("success");
      show();
      loadBooks();
    } else {
      setToastMessage("Error Deleting the Book!");
      setToastStyle("error");
      show();
    }
  };

  const updatePaginationOptions = (paginationOptions: PaginationOptions) => {
    setPaginationOptions(paginationOptions);
    loadBooks();
  };

  const updateSortingOptions = (sortingOptions: SortingOptions) => {
    setSortingOptions(sortingOptions);
    loadBooks();
  };

  const updateFilteringOptions = (filteringOptions?: FilteringOptions) => {
    setFilteringOptions(filteringOptions);
    loadBooks();
  };

  return (
    <BooksContext.Provider
      value={{
        booksPaginated,
        loadingBooks,
        addingBook,
        bookToEdit,
        editingBook,
        deleteBook,
        paginationOptions,
        sortingOptions,
        filteringOptions,
        loadBooks,
        addBook,
        editBook,
        setBookToEdit,
        setEditingBook,
        updatePaginationOptions,
        updateSortingOptions,
        updateFilteringOptions,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = React.useContext(BooksContext);
  if (!context) {
    throw new Error("useBook must be used within a UserProvider");
  }
  return context;
};

export default useBooks;
