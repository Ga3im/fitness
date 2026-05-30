import { useNavigate } from "react-router-dom";
import { router } from "../pages/router";

export const Logo = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(router.main);
  };

  return (
    <>
      <div onClick={handleLogoClick} className="flex gap-[10px] items-center">
        <img className="w-[100px]" src="/logo.png" alt="" />
      </div>
    </>
  );
};
