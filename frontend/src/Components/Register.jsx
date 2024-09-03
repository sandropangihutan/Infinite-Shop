import React, { useState } from "react";
import logologin from "../assets/YEY.png";
import SwipeButton from "./SwipeButton";
import Swal from "sweetalert2";
import '../assets/css/swipebutton.css';
import JEMPOL from "../assets/JEMPOL.png"
import LOH from "../assets/LOH.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confPassword: "",
  });

  const [errorData, setErrorData] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const { name, email, phone, password, confPassword } = formData;
    if (!name || !email || !phone || !password || !confPassword) {
      const modal = document.getElementById('my_modal_2');
      modal.showModal();
      return;
    }


    if (password !== confPassword) {
      const modal = document.getElementById('my_modal_3');
      modal.showModal();
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const modal = document.getElementById('my_modal_8');
        modal.showModal();
        return;
      } else {
        const errorData = await response.json();
        setErrorData(errorData);
        // Tampilkan modal dengan ID my_modal_4
        const modal = document.getElementById("my_modal_4");
        modal.showModal();
      }
    } catch (error) {
      Swal.fire("Error", "Error registering user", "error");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden flex justify-center items-center bg-gray-100">
      <div className="w-[1440px] h-[1024px] pl-[105px] pr-40 pt-[193px] pb-48 bg-gray-100 justify-start items-center inline-flex">
        <div className="self-stretch bg-violet-600 rounded-[20px] justify-start items-center gap-7 inline-flex">
          <img src={logologin} alt="Logo" className="w-[639px] h-[639px]" />
          <form
            onSubmit={handleSubmit}
            className="w-[508px] p-[50px] bg-white rounded-tr-[20px] rounded-br-[20px] border border-violet-600 flex flex-col gap-[30px]"
          >
            <div className="text-violet-600 text-xl font-semibold font-['Poppins']">
              Sign Up
            </div>
            <div className="flex flex-col gap-[35px]">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered input-primary w-full  w-[409px] h-[41px] px-[15px] py-2.5 bg-white rounded-[10px] border border-slate-500"
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered input-primary w-full w-[409px] h-[41px] px-[15px] py-2.5 bg-white rounded-[10px] border border-slate-500"
                placeholder="Email"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered input-primary w-full w-[409px] h-[41px] px-[15px] py-2.5 bg-white rounded-[10px] border border-slate-500"
                placeholder="Phone Number"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered input-primary w-full w-[409px] h-[41px] px-[15px] py-2.5 bg-white rounded-[10px] border border-slate-500"
                placeholder="Password"
              />
              <input
                type="password"
                name="confPassword"
                value={formData.confPassword}
                onChange={handleChange}
                className="input input-bordered input-primary w-full w-[409px] h-[41px] px-[15px] py-2.5 bg-white rounded-[10px] border border-slate-500"
                placeholder="Confirm Password"
              />



              <button className="swipe1 up" type="submit">
                <span className="text" >Sign Up</span>
              </button>


              <dialog id="my_modal_8" class="modal modal-bottom sm:modal-middle">
                <div className="w-[551px] h-[360px] relative bg-white rounded-2xl">
                  <div className="left-[61.50px] top-[101px] absolute flex-col justify-start items-center gap-5 inline-flex">
                    <div className="flex-col justify-start items-center gap-2 flex">
                      <div className="text-center text-green-600 text-2xl font-bold font-['Poppins']">OH YEAH !!!</div>
                      <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">Your account has been created</div>
                    </div>
                    <div className="self-stretch h-px border border-neutral-300"></div>
                    <form method="dialog" className="w-36 px-10 py-1 bg-green-600 rounded-full justify-center items-center gap-2.5 inline-flex">
                      <a href="/Login" className="text-center text-white text-base font-normal font-['Poppins']">Continue</a>
                    </form>
                  </div>
                  <img className="w-80 h-80 left-[211px] top-[10px] absolute" src={JEMPOL} />
                </div>
              </dialog>


              <dialog id="my_modal_2" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box" className="w-[551px] h-[360px] absolute bg-white rounded-2xl">
                  <div className="left-[61.50px] top-[101px] absolute flex-col justify-start items-center gap-5 inline-flex">
                    <div className="flex-col justify-start items-center gap-2 flex">
                      <div className="text-center text-amber-500 text-2xl font-bold font-['Poppins']">UH-OH !!!</div>
                      <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">All fields must be filled !! Please fill the fields</div>
                    </div>
                    <div className="self-stretch h-px border border-neutral-300"></div>
                    <form method="dialog" class="modal-backdrop" className="w-36 px-10 py-1 bg-amber-500 rounded-full justify-center items-center gap-2.5 inline-flex">
                      <button className="text-center text-white text-base font-normal font-['Poppins']">Close</button>
                    </form>
                  </div>
                  <img className="w-80 h-80 left-[211px] top-[10px] absolute" src={LOH} />
                </div>


                <form method="dialog" class="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <dialog id="my_modal_3" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box" className="w-[551px] h-[360px] absolute bg-white rounded-2xl">
                  <div className="left-[61.50px] top-[101px] absolute flex-col justify-start items-center gap-5 inline-flex">
                    <div className="flex-col justify-start items-center gap-2 flex">
                      <div className="text-center text-amber-500 text-2xl font-bold font-['Poppins']">UH-OH !!!</div>
                      <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">Password and Confirmation Password Must Same !!</div>
                    </div>
                    <div className="self-stretch h-px border border-neutral-300"></div>
                    <form method="dialog" class="modal-backdrop" className="w-36 px-10 py-1 bg-amber-500 rounded-full justify-center items-center gap-2.5 inline-flex">
                      <button className="text-center text-white text-base font-normal font-['Poppins']">Close</button>
                    </form>
                  </div>
                  <img className="w-80 h-80 left-[211px] top-[10px] absolute" src={LOH} />
                </div>


                <form method="dialog" class="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <dialog id="my_modal_4" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box" className="w-[551px] h-[360px] absolute bg-white rounded-2xl">
                  <div className="left-[61.50px] top-[101px] absolute flex-col justify-start items-center gap-5 inline-flex">
                    <div className="flex-col justify-start items-center gap-2 flex">
                      <div className="text-center text-amber-500 text-2xl font-bold font-['Poppins']">UH-OH !!!</div>
                      <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">{errorData ? errorData.msg : null}</div>
                    </div>
                    <div className="self-stretch h-px border border-neutral-300"></div>
                    <form method="dialog" class="modal-backdrop" className="w-36 px-10 py-1 bg-amber-500 rounded-full justify-center items-center gap-2.5 inline-flex">
                      <button className="text-center text-white text-base font-normal font-['Poppins']">Close</button>
                    </form>
                  </div>
                  <img className="w-80 h-80 left-[211px] top-[10px] absolute" src="https://i.postimg.cc/fyNGt84r/LOH.png" />
                </div>
                <form method="dialog" class="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>


              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-gray-700 text-xs font-normal font-['Poppins']">
                    Already have an account?
                  </span>
                  <a
                    href="/Login"
                    style={{
                      color: "blue",
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Click here
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

export default Register;