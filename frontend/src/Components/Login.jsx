import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import logologin from "../assets/YEY.png";
import '../assets/css/swipebutton.css'
import LOH from "../assets/LOH.png";
  
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && isSuccess) {
      // Cek role pengguna setelah login
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "pengunjung" || user.role === "pembeli") {
        navigate("/homepage");
      }
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      const modal = document.getElementById('my_modal_4');
      modal.showModal();
      return;
    }
  }, [isError]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden flex justify-center items-center bg-gray-100">
      <div className="w-[1440px] h-[1024px] pl-[105px] pr-40 pt-[193px] pb-48 bg-gray-100 justify-start items-center inline-flex">
        <div className="self-stretch bg-violet-600 rounded-[20px] justify-start items-center gap-7 inline-flex">
          <img src={logologin} alt="Logo" className="w-[639px] h-[639px]" />
          <form onSubmit={Auth}
            className="w-[508px] h-[640px] bg-white rounded-tr-[20px] rounded-br-[20px] border border-violet-600 flex flex-col gap-[30px]"
            style={{ padding: "50px" }}
          >
            <dialog id="my_modal_4" class="modal modal-bottom sm:modal-middle">
              <div class="modal-box" className="w-[551px] h-[360px] absolute bg-white rounded-2xl">
                <div className="left-[61.50px] top-[101px] absolute flex-col justify-start items-center gap-5 inline-flex">
                  <div className="flex-col justify-start items-center gap-2 flex">
                    <div className="text-center text-amber-500 text-2xl font-bold font-['Poppins']">UH-OH !!!</div>
                    <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">{isError && <p className="has-text-centered">{message}</p>}</div>
                  </div>
                  <div className="self-stretch h-px border border-neutral-300"></div>
                  <form method="dialog" class="modal-backdrop" className="w-36 px-10 py-1 bg-amber-500 rounded-full justify-center items-center gap-2.5 inline-flex">
                    <a href="/login" className="text-center text-white text-base font-normal font-['Poppins']">Continue</a>
                  </form>
                </div>
                <img className="w-80 h-80 left-[211px] top-[10px] absolute" src={LOH} />
              </div>
            </dialog>

            <div className="text-violet-600 text-xl font-semibold font-['Poppins']">
              Login
            </div>
            <div className="flex flex-col gap-[35px]">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary w-[409px] h-[41px] px-[15px] py-2.5 bg-white rounded-[10px] border border-slate-500"
                placeholder="Email Address"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered input-primary w-[409px] h-[41px] px-[15px] py-2.5 bg-white rounded-[10px] border border-slate-500"
                placeholder="Password"
              />
              <button
                type="submit"
                className="swipe1 up" 
              ><span className="text">
                  {isLoading ? "Loading..." : "Sign in"}</span>
              </button>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-gray-700 text-xs font-normal font-['Poppins']">
                    Don't have an account?
                  </span>
                  <a
                    href="/Register"
                    style={{
                      color: "blue",
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Create here
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
