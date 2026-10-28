import styles from "./App.module.css";
import BrandList from "./components/BrandList";
import OffersTable from "./components/OffersTable";
import SearchForm from "./components/SearchForm";
import { ErrorMessage, Loader } from "./components/Status";
import { usePartsSearch } from "./hooks/usePartsSearch";

export default function App() {
  const {
    search,
    searchByNumber,
    selectBrand,
    clearSearch,
    showBrands,
  } = usePartsSearch();

  const hasSelectedBrand = Boolean(search.selectedBrand);

  return (
    <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
      <header className="bg-primary py-2">
        <div className="container d-flex align-items-center">
          <span className={styles.logo} aria-label="Гипермаркет автозапчастей">
            Гипермаркет автозапчастей
          </span>
        </div>
      </header>

      <main className="container flex-grow-1 py-4 py-md-5">
        <section className="text-center">
          <h1 className="h2 mb-0">Найдите деталь и её аналоги</h1>
        </section>

        <section className={`${styles.contentWidth} card shadow-sm mx-auto mt-4`}>
          <div className="card-body p-3 p-md-4">
            <SearchForm
              loading={search.brandsStatus === "loading"}
              onSearch={searchByNumber}
              onReset={clearSearch}
            />
          </div>
        </section>

        <section className={`${styles.results} mx-auto mt-4 mt-md-5`} aria-live="polite">
          {search.error && <ErrorMessage message={search.error} />}
          {search.brandsStatus === "loading" && <Loader text="Ищем производителей…" />}
          {search.brandsStatus === "succeeded" && !hasSelectedBrand && (
            <>
              <h2 className="h4 mb-3">Выберите производителя</h2>
              <BrandList brands={search.brands} onSelect={selectBrand} />
            </>
          )}

          {hasSelectedBrand && (
            <>
              <button className="btn btn-link px-0 text-decoration-none" onClick={showBrands}>
                ← К производителям
              </button>
              <h2 className="h4 mb-3">Аналоги и предложения</h2>
              { search.offersStatus === "loading" &&
                <Loader text="Загружаем предложения…" />
              }
              {search.offersStatus === "succeeded" &&
                <OffersTable offers={search.offers} />
              }
            </>
          )}
        </section>
      </main>

      <footer className="bg-primary text-white-50 mt-auto py-3 small">
        <div className="container d-flex justify-content-between flex-wrap gap-2">
          <span>Тестовое задание · React + Redux</span>
        </div>
      </footer>
    </div>
  );
}
