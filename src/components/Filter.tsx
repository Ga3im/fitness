import type { Dispatch, SetStateAction } from "react";
import type { coursesType } from "../pages/Main";

type filterProp = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  array: coursesType[];
  setFilteredArray: (arr: coursesType[]) => void;
};

export const Filter = ({
  search,
  setSearch,
  array,
  setFilteredArray,
}: filterProp) => {
  const handleSearchBtn = () => {
    const arr: coursesType[] = [];
    array.map((i: coursesType) => {
      if (i.nameRU.toLowerCase().includes(search.toLowerCase())) {
        arr.push(i);
      }
    });
    setFilteredArray(arr);
  };

  return (
    <>
      <div className="py-[30px] flex justify-center">
        <div className="border-2 border-[#9c9c9c] rounded-[10px] px-[10px] py-[5px] group focus-within:border-[#000000]">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="focus:outline-none focus:group-focus:border-2 focus:group-focus:border-[red]"
            type="text"
            placeholder="Искать"
            name=""
            id=""
          />
          <button
            className="opacity-50 group-focus-within:opacity-100"
            onClick={handleSearchBtn}
          >
            🔍
          </button>
        </div>
      </div>
    </>
  );
};
