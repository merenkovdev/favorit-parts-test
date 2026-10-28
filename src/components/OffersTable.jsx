import { useEffect, useState } from "react";
import { EmptyState } from "./Status";
import styles from "./OffersTable.module.css";

const formatPrice = (price) =>
  price === null ? "-" : `от ${new Intl.NumberFormat("ru-RU").format(price)} ₽`;

export default function OffersTable({ offers }) {
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => setVisibleCount(50), [offers]);

  if (!offers.length) {
    return <EmptyState>Предложения и аналоги не найдены.</EmptyState>;
  }

  return (
    <>
      <div className={`table-responsive border rounded bg-white ${styles.mobileTable}`}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="text-secondary small text-uppercase">Название / производитель</th>
              <th className="text-secondary small text-uppercase">Артикул</th>
              <th className="text-secondary small text-uppercase text-end">Всего на складах</th>
              <th className="text-secondary small text-uppercase text-end">Цена</th>
            </tr>
          </thead>
          <tbody>
            {offers.slice(0, visibleCount).map((offer) => (
              <tr key={offer.id}>
                <td data-label="Название / производитель" className={styles.mainCell}>
                  <span
                    className={`badge ${offer.type === "Аналог" ? "bg-info-subtle text-info-emphasis" : "bg-primary-subtle text-primary"}`}
                  >
                    {offer.type}
                  </span>
                  <strong className="d-block mt-2">{offer.name}</strong>
                  <small className="text-secondary">{offer.brand}</small>
                </td>
                <td data-label="Артикул">{offer.number}</td>
                <td data-label="Всего на складах" className="text-end">
                  <span className={`small fw-semibold ${offer.stock > 0 ? "text-success" : "text-secondary"}`}>
                    { offer.stock ? `${offer.stock} шт.` : "-" }
                  </span>
                </td>
                <td data-label="Цена" className="text-end fw-bold text-nowrap">
                  {formatPrice(offer.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-3 pt-3 small text-secondary">
        <span>Показано {Math.min(visibleCount, offers.length)} из {offers.length}</span>
        {visibleCount < offers.length && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setVisibleCount((count) => count + 50)}
          >
            Показать ещё
          </button>
        )}
      </div>
    </>
  );
}
