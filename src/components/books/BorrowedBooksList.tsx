import { Table } from "flowbite-react";
import useBooks from "../../hooks/booksHook/BooksHook";
import { useEffect } from "react";
import { Book } from "../../services/BookService";
import { useToast } from "../common/toastAlert/ToastAlert";

function BorrowedBooksList() {
  const {
    booksBorrowedByCurrentUser,
    returnBook,
    loadBooksBorrowedByCurrentUser,
  } = useBooks();
  const { setToastMessage, setToastStyle, show } = useToast();

  useEffect(() => {
    if (booksBorrowedByCurrentUser === null) loadBooksBorrowedByCurrentUser();
  }, []);

  function handleReturnButtonClicked(bookId: string | undefined): void {
    if (bookId) {
      returnBook(bookId);
    } else {
      setToastMessage("Error returning the Book");
      setToastStyle("error");
      show();
    }
  }

  return (
    <div className="h-full w-full">
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Return</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {booksBorrowedByCurrentUser ? (
              booksBorrowedByCurrentUser.length > 0 ? (
                booksBorrowedByCurrentUser.map((book) => {
                  return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {book.title}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          onClick={() => handleReturnButtonClicked(book.id)}
                        >
                          Return
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    No Borrowed Books
                  </Table.Cell>
                  <Table.Cell>
                    <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"></a>
                  </Table.Cell>
                </Table.Row>
              )
            ) : null}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default BorrowedBooksList;
