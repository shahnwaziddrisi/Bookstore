import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {books.map((items) => (
        <BookSingleCard className="bg-red-500" key={items._id} book={items} />
      ))}
    </div>
  );
};

export default BooksCard;
