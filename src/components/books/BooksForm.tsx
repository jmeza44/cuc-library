import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import useBooks from "../../hooks/booksHook/BooksHook";
import { Book } from "../../services/BookService";

function BooksForm() {
  const { addBook, bookToEdit, editingBook, editBook, setEditingBook } =
    useBooks();

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [available, setAvailable] = useState<string>("false");
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    setId(bookToEdit?.id ?? "");
    setTitle(bookToEdit?.title ?? "");
    setAuthor(bookToEdit?.author ?? "");
    setDescription(bookToEdit?.title ?? "");
    setAvailable(
      bookToEdit === null
        ? "false"
        : bookToEdit.available === true
        ? "true"
        : "false"
    );
    setYear(bookToEdit?.year ?? "");
  }, [bookToEdit]);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (editingBook) {
      triggerEditBookAction();
    } else {
      triggerAddBookAction();
    }
    clearFields();
  }

  const triggerEditBookAction = () => {
    const book: Book = {
      id,
      title,
      author,
      description,
      available: available === "true",
      year,
    };
    editBook(book);
  };

  const triggerAddBookAction = () => {
    const book: Book = {
      title,
      author,
      description,
      available: available === "true",
      year,
    };
    addBook(book);
  };

  const clearFields = () => {
    setId("");
    setTitle("");
    setAuthor("");
    setDescription("");
    setAvailable("false");
    setYear("");
  };

  return (
    <form
      className="rounded-md border border-gray-200 bg-gray-50 px-6 py-5 dark:border-gray-800 dark:bg-gray-900"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="title" value="Book title" />
        </div>
        <TextInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="author" value="Author" />
        </div>
        <TextInput
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <TextInput
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="available"
            value={available}
            onClick={(e) =>
              setAvailable(available === "true" ? "false" : "true")
            }
          />
          <Label htmlFor="available">Available</Label>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="year" value="Publication year" />
        </div>
        <TextInput
          id="year"
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      {editingBook ? (
        <div className="mt-2">
          <Button type="submit" className="mr-2 inline-block">
            Edit
          </Button>
          <Button
            type="button"
            className="inline-block"
            onClick={() => {
              clearFields();
              setEditingBook(false);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : true ? (
        <Button className="mt-2" type="submit">
          Add
        </Button>
      ) : (
        <Button className="mt-2" type="button">
          <Spinner aria-label="Spinner button example" size="sm" />
          <span className="pl-3">Adding...</span>
        </Button>
      )}
    </form>
  );
}

export default BooksForm;
