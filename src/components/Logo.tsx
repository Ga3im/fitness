import { useNavigate } from "react-router-dom";
import { router } from "../pages/router";
import { useContext } from "react";
import { SetContext } from "../context/context";

export const Logo = () => {
  const { setIsOpenProfile } = useContext(SetContext);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(router.main);
    setIsOpenProfile(false);
  };

  return (
    <>
      <div onClick={handleLogoClick} className="flex gap-[10px] items-center">
        <img className="w-[150px]" src="logo.png" alt="" />
      </div>
    </>
  );
};
