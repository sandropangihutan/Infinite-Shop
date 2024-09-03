import React from "react";
import "../assets/css/footer.css";
// import '../assets/css/swipebutton.css'; // Import file CSS yang berisi animasi swipe

function Footer() {
  return (
    <div className="footer-container">
      <div className="flex justify-center items-center w-full">
        <div
          className="flex flex-col pt-9 bg-white rounded-3xl w-full box-with-shadow"
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        >
          <div className="self-center w-full max-w-[1305px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[17%] max-md:w-full max-md:items-center">
                <img
                  loading="lazy"
                  srcSet="Images/LogoFooter.png"
                  className="shrink-0 max-w-full aspect-[5] w-[207px] max-md:mt-10"
                />
              </div>
              <div className="flex gap-5 justify-between items-start self-center w-full rounded-3xl max-w-[980px] max-md:flex-wrap max-md:max-w-full mt-2.5">
                <div className="flex flex-col text-base text-slate-500 max-md:items-center">
                  <div className="text-2xl font-semibold text-violet-600">
                    Help
                  </div>
                  <div className="mt-8">Chat Admin</div>
                  <div className="mt-3">Order Status</div>
                  <div className="mt-3">Delivery</div>
                </div>
                <div className="flex flex-col text-base text-slate-500 max-md:items-center">
                  <div className="text-2xl font-semibold text-violet-600">
                    Company
                  </div>
                  <div className="mt-8">About Us</div>
                  <div className="mt-3">News</div>
                  <div className="mt-3">Career</div>
                </div>
                <div className="flex flex-col justify-center text-base font-medium text-gray-800 max-md:items-center">
                  <div className="text-2xl font-semibold text-violet-600">
                    Customer Care
                  </div>
                  <div className="mt-8">Phone Number</div>
                  <div className="mt-2 text-slate-500">
                    <a
                      href="https://wa.me/6282387597266"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-700"
                    >
                      082387597266
                    </a>
                  </div>
                  <div className="mt-8">Email</div>
                  <div className="mt-2 text-slate-500">
                    <a
                      href="mailto:csc@infinitelearning.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-700"
                    >
                      csc@infinitelearning.id
                    </a>
                  </div>
                </div>
                <div className="flex flex-col self-stretch max-md:items-center">
                  <div className="text-2xl font-semibold text-violet-600">
                    Our Social Media
                  </div>
                  <div className="flex gap-5 pr-20 mt-8 bg-white max-md:pr-5">
                    <a
                      href="https://www.instagram.com/infinitelearning_id/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9245957dc303c7724bda53b926bef0dba57cafb66aafe331a74b48516eef25e?"
                        className="shrink-0 w-6 aspect-square"
                        alt="Instagram"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/infinite-learning-indonesia/mycompany/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6143fb9e54334d677d10432cbc2fc34ae602cafa80d28d517c8f246449a7b3fe?"
                        className="shrink-0 w-6 aspect-square"
                        alt="LinkedIn"
                      />
                    </a>
                    <a
                      href="https://www.tiktok.com/@infinitelearning_id"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e336dd1e96057fb45e9e2b8be674c2a4b1b31356ef24e27b0d38dfea8c49cc7f?"
                        className="shrink-0 w-6 aspect-[1.04]"
                        alt="TikTok"
                      />
                    </a>
                  </div>

                  <div className="mt-8 text-2xl font-semibold text-violet-600">
                    Location
                  </div>
                  <div className="mt-4 text-base text-slate-500 max-md:text-center">
                    Nongsa Digital Park, Sambau, Kecamatan
                    <br />
                    Nongsa, Kota Batam, Kepulauan Riau
                    <br />
                    29466
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center px-16 py-4 mt-10 w-full text-lg font-medium text-violet-600 bg-purple-100 max-md:px-5 max-md:max-w-full text-center">
            Copyright © 2024 Infinite Shop. All right reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
