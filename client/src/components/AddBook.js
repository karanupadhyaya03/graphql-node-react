import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/Queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { loading: addBookLoading, error: addBookError }] =
    useMutation(addBookMutation);
  // console.log(data);
  // console.log(data);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  if (loading || addBookLoading) return <p>Loading....</p>;
  if (error || addBookError) return <p>Something went wrong</p>;

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(addBookData);
    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: author,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  //).then((data) => console.log(data));

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthor(e.target.value)}>
          <option value={null}>Select author</option>
          {data.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
