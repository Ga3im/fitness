
type BackBtnType = {
  onClick: () => void;
};

export const BackBtn = ({ onClick }: BackBtnType) => {
  return (
    <div
      onClick={onClick}
      className={
        "bg-transparent text-[16px] pb-[5px] hover:underline cursor-pointer"
      }
    >
      &laquo; Назад
    </div>
  );
};
