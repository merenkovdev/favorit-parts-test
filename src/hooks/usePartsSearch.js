import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  backToBrands,
  fetchBrands,
  fetchOffers,
  resetSearch,
} from "../features/search/searchSlice";

export const usePartsSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const requestRef = useRef(null);

  const run = (action) => {
    requestRef.current?.abort();
    requestRef.current = dispatch(action);
  };

  useEffect(() => {
    return () => requestRef.current?.abort();
  }, []);

  return {
    search,

    searchByNumber(number) {
      run(fetchBrands(number));
    },

    selectBrand(brand) {
      run(fetchOffers({ number: search.number, brand }));
    },

    clearSearch() {
      requestRef.current?.abort();
      dispatch(resetSearch());
    },

    showBrands() {
      requestRef.current?.abort();
      dispatch(backToBrands());
    },
  };
};
