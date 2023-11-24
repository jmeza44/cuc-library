import { Card } from "flowbite-react";
import useBooks from "../../hooks/booksHook/BooksHook";
import { useEffect } from "react";

function BooksGallery() {
  const { booksPaginated, loadBooks } = useBooks();

  useEffect(() => {
    if (booksPaginated?.books === undefined) loadBooks();
  }, []);

  return (
    <div className="h-full w-full bg-gray-50 p-12 shadow-md dark:bg-gray-900">
      <div className="mx-auto grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        {booksPaginated
          ? booksPaginated.books.map((book) => {
              return (
                <Card key={book.id}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {book.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {book.description}
                  </p>
                </Card>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default BooksGallery;
