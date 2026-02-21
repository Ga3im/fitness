import { useNavigate } from "react-router-dom";
import { router } from "../pages/router";
import { setIsOpenProfile } from "../store/features/authSlice";
import { useAppDispatch } from "../store/features/store";

export const Logo = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(router.main);
    dispatch(setIsOpenProfile(false));
  };

  return (
    <>
      <div onClick={handleLogoClick} className="flex gap-[10px] items-center">
        <img className="w-[150px]" src="/logo.png" alt="" />
      </div>
    </>
  );
};
