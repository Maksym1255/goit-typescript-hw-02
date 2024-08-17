import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handelChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const heandelSubmst = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("The search field cannot be empty!");
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header>
      <form className={css.form} onSubmit={heandelSubmst}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: css.toastTextCenter,
          }}
        />
        <input
          className={css.input}
          onChange={handelChange}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
