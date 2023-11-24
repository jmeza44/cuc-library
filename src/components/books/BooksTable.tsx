import {
  Badge,
  Label,
  Pagination,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import { FunctionComponent, useEffect, useState } from "react";
import useBooks from "../../hooks/booksHook/BooksHook";
import { Book } from "../../services/BookService";

const BooksTable: FunctionComponent = () => {
  const {
    booksPaginated,
    loadBooks,
    setBookToEdit,
    setEditingBook,
    deleteBook,
  } = useBooks();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteringBy, setFilteringBy] = useState<string>("title");
  const [filteringValue, setFilteringValue] = useState<string>("");

  useEffect(() => {
    if (booksPaginated?.books === undefined) loadBooks();
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onEditClick = (book: Book) => {
    setBookToEdit(book);
    setEditingBook(true);
  };

  return (
    <>
      <div className="mb-4 grid max-w-lg grid-cols-2 gap-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="filteringBy" value="Filter by" />
          </div>
          <Select
            id="filteringBy"
            value={filteringBy}
            onChange={(e) => setFilteringBy(e.target.value)}
          >
            <option value={"title"}>Title</option>
            <option value={"author"}>Author</option>
            <option value={"year"}>Year</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="filtering" value="Search" />
          </div>
          <TextInput
            id="filtering"
            type="text"
            value={filteringValue}
            onChange={(e) => setFilteringValue(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Available</Table.HeadCell>
            <Table.HeadCell>Year</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {booksPaginated?.books && booksPaginated.books.length > 0 ? (
              booksPaginated.books?.map((book) => {
                return (
                  <Table.Row
                    key={book.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {book.title}
                    </Table.Cell>
                    <Table.Cell>{book.author}</Table.Cell>
                    <Table.Cell>{book.description}</Table.Cell>
                    <Table.Cell>
                      {book.available ? (
                        <Badge color="success" className="w-min">
                          YES
                        </Badge>
                      ) : (
                        <Badge color="failure" className="w-min">
                          NO
                        </Badge>
                      )}
                    </Table.Cell>
                    <Table.Cell>{book.year}</Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => onEditClick(book)}
                      >
                        Edit
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => deleteBook(book.id ?? "")}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  N/A
                </Table.Cell>
                <Table.Cell>N/A</Table.Cell>
                <Table.Cell>N/A</Table.Cell>
                <Table.Cell>
                  <Badge color="gray" className="w-min">
                    N/A
                  </Badge>
                </Table.Cell>
                <Table.Cell>N/A</Table.Cell>
                <Table.Cell>
                  <span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    N/A
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    N/A
                  </span>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={booksPaginated?.totalPages ?? 1}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </>
  );
};

export default BooksTable;
