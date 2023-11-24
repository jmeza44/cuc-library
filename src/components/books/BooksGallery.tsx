import { Badge, Button, Card } from "flowbite-react";
import useBooks from "../../hooks/booksHook/BooksHook";
import { useEffect } from "react";
import { useToast } from "../common/toastAlert/ToastAlert";

function BooksGallery() {
  const { booksPaginated, borrowBookByCurrentUser, loadBooks } = useBooks();
  const { setToastMessage, setToastStyle, show } = useToast();

  useEffect(() => {
    if (booksPaginated?.books === undefined) loadBooks();
  }, []);

  function handleBorrowButtonClicked(bookId: string | undefined): void {
    if (bookId) {
      borrowBookByCurrentUser(bookId);
    } else {
      setToastMessage("Error borrowing the Book");
      setToastStyle("error");
      show();
    }
  }

  return (
    <div className="h-full w-full p-6">
      <div className="mx-auto grid w-full grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-3">
        {booksPaginated
          ? booksPaginated.books.map((book) => {
              return (
                <Card key={book.id}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {book.title}
                  </h5>

                  <div>
                    <span className="w-mi mr-2 inline-block">Available: </span>
                    {book.available ? (
                      <Badge color="success" className="inline-block w-min">
                        YES
                      </Badge>
                    ) : (
                      <Badge color="failure" className="inline-block w-min">
                        NO
                      </Badge>
                    )}
                  </div>

                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {book.description}
                  </p>

                  <Button
                    type="button"
                    onClick={() => handleBorrowButtonClicked(book.id)}
                  >
                    Borrow
                    <svg
                      className="-mr-1 ml-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </Card>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default BooksGallery;
