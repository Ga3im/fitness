export const Confirm = ({ text }) => {
  const yesBtn = () => {};
  const noBtn = () => {};
  return (
    <>
      <div className="absolute w-full h-full">
        <div className="">{text}</div>
        <button onClick={yesBtn}>Да</button>
        <button onClick={noBtn}>Нет</button>
      </div>
    </>
  );
};
