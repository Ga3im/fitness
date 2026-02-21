import type {
  exercisesType,
  FilterExerciseProp,
} from "../types/types";

export const FilterExercise = ({
  search,
  setSearch,
  array,
  setFilteredArray,
}: FilterExerciseProp) => {
  const handleSearchBtn = () => {
    const arr: exercisesType[] = [];
    array.map((i: any) => {
      if (i.name.toLowerCase().includes(search.toLowerCase())) {
        arr.push(i);
      }
    });
    setFilteredArray(arr);
  };

  return (
    <>
      <div className="flex justify-center">
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
