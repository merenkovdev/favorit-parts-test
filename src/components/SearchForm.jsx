import { useState } from "react";

export default function SearchForm({ loading, onSearch, onReset }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const number = value.trim();
    if (number) {
      onSearch(number);
    }
  };

  const handleClear = () => {
    setValue("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="part-number" className="form-label">Артикул детали</label>
      <div className="input-group input-group-lg">
        <input
          id="part-number"
          className="form-control"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Например, 7160500039S"
          autoComplete="off"
        />
        {value && (
          <button className="btn btn-outline-secondary" type="button" onClick={handleClear} aria-label="Очистить">
            ×
          </button>
        )}
        <button className="btn btn-primary px-4" type="submit" disabled={!value.trim() || loading}>
          {loading ? "Ищем…" : "Найти"}
        </button>
      </div>
    </form>
  );
}
