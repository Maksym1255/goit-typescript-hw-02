import css from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ onClick, disabled }) => {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
};
