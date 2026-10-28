export function Loader({ text }) {
  return (
    <div className="card text-center text-secondary py-5" role="status">
      <div className="card-body d-flex flex-column align-items-center gap-3">
        <div className="spinner-border text-primary" aria-hidden="true" />
        <span>{text}</span>
      </div>
    </div>
  );
}

export function EmptyState({ children }) {
  return <div className="card text-center text-secondary py-5"><div className="card-body">{children}</div></div>;
}

export function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Не удалось выполнить запрос.</strong> {message}
    </div>
  );
}
