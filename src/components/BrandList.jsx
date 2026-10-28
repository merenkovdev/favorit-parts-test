import { EmptyState } from "./Status";

export default function BrandList({ brands, onSelect }) {
  if (!brands.length) {
    return <EmptyState>Производители для этого артикула не найдены.</EmptyState>;
  }

  return (
    <div className="row g-3">
      {brands.map((brand) => (
        <div className="col-md-6" key={brand}>
          <button
            type="button"
            className="btn btn-light border w-100 d-flex align-items-center gap-3 p-3 text-start"
            onClick={() => onSelect(brand)}
          >
            <span className="monogram d-inline-flex align-items-center justify-content-center rounded bg-primary-subtle text-primary fw-bold flex-shrink-0">
              {brand.slice(0, 2)}
            </span>
            <strong className="text-truncate">{brand}</strong>
            <span className="ms-auto text-secondary fs-4 lh-1">›</span>
          </button>
        </div>
      ))}
    </div>
  );
}
