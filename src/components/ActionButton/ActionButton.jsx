import "./ActionButton.css";

export const ActionButton = ({ children, actionHandler }) => {
  return (
    <>
      {actionHandler ? (
        <button onClick={actionHandler} className="action-button">
          {children}
        </button>
      ) : null}
    </>
  );
};
