import { contextType, SetContext } from "@/src/context";
import { useContext } from "react";

export const Complete = () => {
  const { setIsOpenPage } = useContext(SetContext);

  const handleCompleteBtn = () => {
    setIsOpenPage("");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center z-1 bg-[rgb(0,0,0,0.2)] absolute">
      <div className="fixed rounded-[30px] bg-white mx-[16px] p-[40px]">
        <h1 className="text-[32px] text-center pb-[34px]">
          Ваш прогресс засчитан!
        </h1>
        <svg
          onClick={handleCompleteBtn}
          className="hover:cursor-pointer hover:scale-[1.05] place-self-center flex"
          width="57"
          height="57"
          viewBox="0 0 57 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.3333 56.6667C43.9814 56.6667 56.6667 43.9814 56.6667 28.3333C56.6667 12.6853 43.9814 0 28.3333 0C12.6853 0 0 12.6853 0 28.3333C0 43.9814 12.6853 56.6667 28.3333 56.6667ZM28.0879 40.0802L43.6713 21.6635L39.3454 18.0032L25.889 33.9062L18.1406 25.0509L13.876 28.7824L23.7927 40.1158C24.3361 40.7368 25.1233 41.0901 25.9485 41.0832C26.7737 41.0764 27.5549 40.7101 28.0879 40.0802Z"
            fill="#BCEC30"
          />
        </svg>
      </div>
    </div>
  );
};
