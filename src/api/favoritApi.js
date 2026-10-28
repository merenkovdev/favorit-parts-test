const API_URL = "https://api.favorit-parts.ru/hs/hsprice/";
const TEST_KEY = "00000000-0000-0000-0000-000000000001";

const requestGoods = async (params, signal) => {
  const url = new URL(API_URL);
  url.search = new URLSearchParams({ key: TEST_KEY, ...params });

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Сервис вернул ошибку ${response.status}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(Array.isArray(data.error) ? data.error.join(". ") : data.error);
  }

  return Array.isArray(data.goods) ? data.goods : [];
};

export const searchBrands = async (number, { signal } = {}) => {
  const goods = await requestGoods({ number }, signal);
  return goods.map((item) => item?.brand).filter(Boolean);
};

export const searchOffers = async ({ number, brand }, { signal } = {}) => {
  const goods = await requestGoods({ number, brand, analogues: "on" }, signal);
  const products = goods
    .flatMap((item) => [
      { ...item, type: "Искомая деталь" },
      ...(Array.isArray(item.analogues)
        ? item.analogues.map((analogue) => ({ ...analogue, type: "Аналог" }))
        : []),
    ]);

  return products.map((item, index) => {
    const warehouses = item.warehouses ?? [];
    const prices = warehouses
      .map((warehouse) => warehouse.price)
      .filter((price) => price > 0);

    return {
      type: item.type,
      name: item.name,
      stock: item.count,
      id: `${item.goodsID}-${index}`,
      brand: item.brand || "-",
      number: item.number || "-",
      price: prices.length ? Math.min(...prices) : null,
    };
  });
};
