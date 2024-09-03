import React, { useEffect } from "react";
import "../../assets/css/dashboard.css";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOrderdetailsNavigation = () => {
    navigate("/Orders");
  };

  const handleUsersNavigation = () => {
    navigate("/Users");
  };
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const { user } = useSelector((state) => state.auth);
  const handleOrderClick = (orderId) => {
    navigate(`/admin/order-detail/${orderId}`);
  };
  return (
    <div className="dashboard-content">
      <div className="pr-14 bg-gray-200 max-md:pr-5 w-full">
        <div className="flex gap-6 max-md:flex-col max-md:gap-0">
          <div class="flex flex-col mx-auto max-w-full max-md:ml-0 max-md:mr-0">
            <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow ml-12 mt-6 max-md:mt-6 max-md:max-w-full">
                    <div className="text-3xl font-bold text-violet-600 max-w-[210px]">
                      Hello , {user && user.name}
                    </div>
                    <div className="text-xl text-black max-w-[285px]">
                      Admin Infinite Learning Shop
                    </div>
                    <div className="mt-6 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex gap-2.5 py-5 pr-12 pl-5 bg-white rounded-2xl shadow-sm ">
                          <div className="flex flex-col text-indigo-950">
                            <div className="text-xs font-light">
                              Total Sales Today
                            </div>
                            <div className="mt-1 text-2xl font-semibold">
                              Rp70,900
                            </div>
                            <div className="flex gap-1 px-1.5 py-px mt-2 text-xs text-center whitespace-nowrap bg-purple-300 rounded text-indigo-950 max-w-[45px]">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6050b50251c73f21849491e3a6a88f4bd5a98e7697b2a0f350735dbfb80cdaf0?"
                                className="shrink-0 gap-0 my-auto aspect-[1.49] fill-indigo-950 w-[10px]"
                              />
                              <div className="gap-0">15%</div>
                            </div>
                          </div>
                          <div className="">
                            <div className="flex gap-0 justify-center items-center px-2.5 w-full h-5 rounded-full bg-indigo-950">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e796a471e5c25b58b724b991325be2611b22233a7ab0afd96370916bb938bb5b?"
                                className="gap-0 w-full aspect-[0.91]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2.5 py-5 pr-12 pl-5 bg-white rounded-2xl shadow-sm ml-2">
                          <div className="flex flex-col text-indigo-950">
                            <div className="text-xs font-light max-w-[112px] text-indigo-950">
                              Total Orders Today
                            </div>
                            <div className="mt-1 text-2xl font-semibold">
                              50
                            </div>
                            <div className="flex gap-1 text-xs text-center whitespace-nowrap bg-purple-300 rounded text-indigo-950 max-w-[40px]">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6050b50251c73f21849491e3a6a88f4bd5a98e7697b2a0f350735dbfb80cdaf0?"
                                className="shrink-0 gap-0 my-auto aspect-[1.49] fill-indigo-950 w-[10px]"
                              />
                              <div className="gap-0">15%</div>
                            </div>
                          </div>
                          <div className="">
                            <div className="flex gap-0 justify-center items-center px-1.5 w-full h-5 rounded-full bg-indigo-950">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/50c7f50cdf516c8da9e6333a7ee7cd7c3a5affc34f88dc85f64850dddd4ae1ac?"
                                className="gap-0 w-full aspect-[0.91]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2.5 py-5 pr-6 pl-5 bg-white rounded-2xl shadow-sm ml-2">
                          <div className="flex flex-col text-indigo-950">
                            <div className="text-xs font-light">
                              Total Revenue Today
                            </div>
                            <div className="mt-1 text-2xl font-semibold">
                              Rp40,100
                            </div>
                            <div className="flex gap-1 text-xs text-center whitespace-nowrap bg-purple-300 rounded text-indigo-950 max-w-[40px]">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d98575cdaa8283fec5067337df3474f17dafa835178f28004cbebb4aa9071c39?"
                                className="shrink-0 gap-0 my-auto aspect-[1.49] fill-indigo-950 w-[10px]"
                              />
                              <div className="gap-0">15%</div>
                            </div>
                          </div>
                          <div className="">
                            <div className="flex gap-0 justify-center items-center px-1.5 w-full h-5 rounded-full bg-indigo-950">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/50c7f50cdf516c8da9e6333a7ee7cd7c3a5affc34f88dc85f64850dddd4ae1ac?"
                                className="gap-0 w-full aspect-[0.91]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-7 px-7 py-7 bg-white rounded-2xl shadow-sm max-md:flex-wrap max-md:px-9 mt-6 max-md:max-w-full">
                      <div className="text-xl font-semibold text-violet-600 max-md:flex-wrap max-md:max-w-full">
                        Sales Overview
                      </div>
                      <div className="flex gap-2 mt-6 max-md:flex-wrap">
                        <div className="flex flex-col gap-0 text-xs text-right whitespace-nowrap text-indigo-950 max-md:hidden">
                          <div className="gap-0">600</div>
                          <div className="gap-0 mt-10 max-md:mt-10">450</div>
                          <div className="gap-0 mt-12 max-md:mt-10">300</div>
                          <div className="gap-0 mt-12 max-md:mt-10">150</div>
                          <div className="gap-0 self-start mt-12 ml-4 max-md:mt-10 max-md:ml-2.5">
                            0
                          </div>
                        </div>
                        <div
                          className="flex flex-col grow shrink-0 gap-0 basis-0 max-w-[900px] max-md:flex-wrap max-md:max-w-full"
                          style={{ paddingTop: "110px" }}
                        >
                          <div className="chart-container relative">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/54c5722eade2d31a97334264a1d81787686a1cb219c5efb2d06607cb379b2689?"
                              className="w-full aspect-[3.45] fill-amber-400 fill-opacity-60 max-w-[580px]"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f8278068f429e328d5e87f6050784c6b3e9ddd8f52a1b44fa482ab680b10519?"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fd828cc5760cdc572a27e6219d41bb45e01b6deda752e472872b6eb880c970e?"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5 justify-between self-center w-full text-xs text-center whitespace-nowrap max-w-[555px] text-indigo-950 max-md:flex-wrap max-md:max-w-full">
                        <div className="gap-0">Jan</div>
                        <div className="gap-0">Feb</div>
                        <div className="gap-0">Mar</div>
                        <div className="gap-0">Apr</div>
                        <div className="gap-0">May</div>
                        <div className="gap-0">June</div>
                        <div className="gap-0">July</div>
                      </div>
                    </div>
                    <div className="pt-5 pr-11 pb-2 pl-4 bg-white rounded-2xl shadow-sm max-w-[655px] mt-6 max-md:pr-5">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow mt-4 max-md:mt-10">
                            <div className="flex flex-col px-4">
                              <div className="text-xl font-semibold text-violet-600">
                                Top Product
                              </div>
                              <div className="flex gap-4 self-end mt-10">
                                <div className="justify-center items-center px-2 text-xs font-semibold text-black whitespace-nowrap bg-purple-300 rounded-3xl h-[19px] w-[19px]">
                                  1
                                </div>
                                <div className="flex flex-col text-indigo-950 text-opacity-40">
                                  <div className="gap-0 text-base font-semibold max-w-[150px] text-indigo-950">
                                    T-shirt Ver.3
                                  </div>
                                  <div className="gap-0 text-xs max-w-[90px] text-indigo-950 text-opacity-40">
                                    200+ Sold Out
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="shrink-0 mt-6 h-px border border-solid bg-black bg-opacity-20 border-black border-opacity-10" />
                            <div className="flex gap-3.5 justify-between mt-3.5">
                              <div className="justify-center items-center px-2 text-xs font-semibold text-black whitespace-nowrap bg-purple-300 rounded-3xl h-[19px] w-[19px]">
                                2
                              </div>
                              <img
                                loading="lazy"
                                srcSet="Images/Design11.png"
                                className="shrink-0 aspect-[0.83] w-[43px]"
                              />
                              <div className="flex flex-col self-start mt-1.5 text-indigo-950 text-opacity-40">
                                <div className="gap-0 text-base font-semibold max-w-[150px] text-indigo-950 text-opacity-70">
                                  T-shirt Ver.1
                                </div>
                                <div className="gap-0 text-xs max-w-[90px] text-indigo-950 text-opacity-40">
                                  120+ Sold Out
                                </div>
                              </div>
                            </div>
                            <div className="shrink-0 mt-2.5 h-px border border-solid bg-black bg-opacity-20 border-black border-opacity-10" />
                            <div className="flex gap-3.5 justify-between items-center mt-1.5">
                              <div className="justify-center items-center px-2 text-xs font-semibold text-black whitespace-nowrap bg-purple-300 rounded-3xl h-[19px] w-[19px]">
                                3
                              </div>
                              <img
                                loading="lazy"
                                srcSet="Images/Design13.png"
                                className="shrink-0 self-stretch aspect-[0.78] w-[42px]"
                              />
                              <div className="flex flex-col self-stretch my-auto text-indigo-950 text-opacity-40">
                                <div className="gap-0 text-base font-semibold max-w-[150px] text-indigo-950 text-opacity-70">
                                  T-shirt Ver.2
                                </div>
                                <div className="gap-0 text-xs max-w-[90px] text-indigo-950 text-opacity-40">
                                  100+ Sold Out
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
                          <img
                            loading="lazy"
                            srcSet="Images/Design5.png"
                            className="w-full shadow-sm aspect-[0.91] max-md:mt-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-6 w-[34%] mt-9 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow mt-20 text-black max-md:mt-12">
                    <div
                      className="flex gap-5 justify-between px-7 py-4 text-white whitespace-nowrap rounded-2xl shadow-sm max-w-[353px]"
                      style={{ backgroundColor: "#2C1C46" }}
                    >
                      <div className="gap-0 my-auto text-base">Thursday</div>
                      <div className="gap-0 text-2xl font-semibold">
                        04/04/2024
                      </div>
                    </div>
                    <div className="flex flex-col pt-3 pb-12 bg-white rounded-2xl shadow-sm mt-9 max-w-[353px]">
                      <div className="self-start ml-6 text-xl font-semibold text-violet-600">
                        Order Status
                      </div>
                      <div
                        onClick={handleOrderdetailsNavigation}
                        className="flex gap-5 justify-between px-6 py-2 bg-white transition duration-300 hover:bg-purple-300 cursor-pointer"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/256a9869650c976d1761ad3a091c32db758d781cc281285f5b8162dd27a97657?"
                          className="shrink-0 my-auto w-3.5 aspect-[0.83]"
                        />
                        <div className="flex flex-col justify-between flex-grow">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <div className="text-base font-bold text-indigo-950">
                                Jake Shim
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Status: Payed
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="self-end text-xs text-black text-opacity-50">
                                Qty: 3
                              </div>
                              <div className="text-sm text-right text-black">
                                Total: IDR 250.000
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={handleOrderdetailsNavigation}
                        className="flex gap-5 justify-between px-6 py-2 bg-white transition duration-300 hover:bg-purple-300 cursor-pointer"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/256a9869650c976d1761ad3a091c32db758d781cc281285f5b8162dd27a97657?"
                          className="shrink-0 my-auto w-3.5 aspect-[0.83]"
                        />
                        <div className="flex flex-col justify-between flex-grow">
                          <div className="flex gap-5 justify-between">
                            <div className="flex flex-col">
                              <div className="text-base font-bold text-indigo-950">
                                Jay
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Status: Ordered
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="self-end text-xs text-black text-opacity-50">
                                Qty: 1
                              </div>
                              <div className="text-sm text-right text-black">
                                Total: IDR 150.000
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={handleOrderdetailsNavigation}
                        className="flex gap-5 justify-between px-6 py-2 bg-white transition duration-300 hover:bg-purple-300 cursor-pointer"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/256a9869650c976d1761ad3a091c32db758d781cc281285f5b8162dd27a97657?"
                          className="shrink-0 my-auto w-3.5 aspect-[0.83]"
                        />
                        <div className="flex flex-col justify-between flex-grow">
                          <div className="flex gap-5 justify-between">
                            <div className="flex flex-col">
                              <div className="text-base font-bold text-indigo-950">
                                Reynold
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Status: Payed
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="self-end text-xs text-black text-opacity-50">
                                Qty: 2
                              </div>
                              <div className="text-sm text-right text-black">
                                Total: IDR 200.000
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={handleOrderdetailsNavigation}
                        className="flex gap-5 justify-between px-6 py-2 bg-white transition duration-300 hover:bg-purple-300 cursor-pointer"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/256a9869650c976d1761ad3a091c32db758d781cc281285f5b8162dd27a97657?"
                          className="shrink-0 my-auto w-3.5 aspect-[0.83]"
                        />
                        <div className="flex flex-col justify-between flex-grow">
                          <div className="flex gap-5 justify-between">
                            <div className="flex flex-col">
                              <div className="text-base font-bold text-indigo-950">
                                Dena
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Status: Payed
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="self-end text-xs text-black text-opacity-50">
                                Qty: 3
                              </div>
                              <div className="text-sm text-right text-black">
                                Total: IDR 250.000
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col pt-3 pb-12 bg-white rounded-2xl shadow-sm mt-12 max-w-[353px]">
                      <div className="self-start ml-6 text-xl font-semibold text-violet-600">
                        Activities
                      </div>
                      <div className="flex flex-col gap-3 mt-3">
                        <div
                          onClick={handleUsersNavigation}
                          className="flex flex-col justify-center px-6 py-2 mt-3 w-full bg-white cursor-pointer transition duration-300 hover:bg-purple-300"
                        >
                          <div className="flex gap-4 pr-3">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8975398cb7a1aeef48bd89b2236c93e2e7b62add5960b7bc1e6b09b2f77d2f8a?"
                              className="shrink-0 my-auto aspect-[0.94] fill-indigo-950 w-[18px]"
                            />
                            <div className="flex flex-col flex-grow">
                              <div className="text-base font-bold text-indigo-950">
                                Finno Adhipramana
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                You need to confirm Finno’s account
                              </div>
                            </div>
                            <div className="justify-center self-stretch px-1.5 py-0.5 my-auto text-xs text-center whitespace-nowrap rounded-md border border-solid border-indigo-950 text-indigo-950 hover:bg-indigo-950 hover:text-white cursor-pointer transition duration-300 hover:bg-purple-900 hover:text-white">
                              Done
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={handleUsersNavigation}
                          className="flex flex-col justify-center px-6 py-2 w-full bg-white cursor-pointer transition duration-300 hover:bg-purple-300"
                        >
                          <div className="flex gap-4 pr-3.5">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7b4da979b0f8772d29f92e60040477da8d71cbe49936b0317361b60fe1195a1?"
                              className="shrink-0 self-stretch my-auto w-5 aspect-square fill-indigo-950"
                            />
                            <div className="flex flex-col flex-grow">
                              <div className="text-base font-bold text-indigo-950">
                                Dena Apriliaw
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Package has been received
                              </div>
                            </div>
                            <div className="justify-center self-stretch px-1.5 py-0.5 my-auto text-xs text-center whitespace-nowrap rounded-md border border-solid border-indigo-950 text-indigo-950 hover:bg-indigo-950 hover:text-white cursor-pointer transition duration-300 hover:bg-purple-900 hover:text-white">
                              Done
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={handleUsersNavigation}
                          className="flex flex-col justify-center px-6 py-2 w-full bg-white cursor-pointer transition duration-300 hover:bg-purple-300"
                        >
                          <div className="flex gap-4 pr-3.5">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/af5486a8056e705586a0b98b9077a22b441da7c99cbe1d1343737e7c590c4a81?"
                              className="shrink-0 my-auto aspect-square fill-indigo-950 w-[17px]"
                            />
                            <div className="flex flex-col flex-grow">
                              <div className="text-base font-bold text-indigo-950">
                                Stiker R-A 1L
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Product stock is running low
                              </div>
                            </div>
                            <div className="justify-center self-stretch px-1.5 py-0.5 my-auto text-xs text-center whitespace-nowrap rounded-md border border-solid border-indigo-950 text-indigo-950 hover:bg-indigo-950 hover:text-white cursor-pointer transition duration-300 hover:bg-purple-900 hover:text-white">
                              Done
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={handleUsersNavigation}
                          className="flex flex-col justify-center px-6 py-2 w-full bg-white cursor-pointer transition duration-300 hover:bg-purple-300"
                        >
                          <div className="flex gap-4 pr-3.5">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/463b7d1cc2c0ab40351a503173509b3a5cae712cd021329bbdc20904c5eb1fc6?"
                              className="shrink-0 my-auto aspect-square fill-indigo-950 w-[17px]"
                            />
                            <div className="flex flex-col flex-grow">
                              <div className="text-base font-bold text-indigo-950">
                                Tiwiwai
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Have given an review to the product
                              </div>
                            </div>
                            <div className="justify-center self-stretch px-1.5 py-0.5 my-auto text-xs text-center whitespace-nowrap rounded-md border border-solid border-indigo-950 text-indigo-950 hover:bg-indigo-950 hover:text-white cursor-pointer transition duration-300 hover:bg-purple-900 hover:text-white">
                              Done
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={handleUsersNavigation}
                          className="flex flex-col justify-center px-6 py-2 w-full bg-white cursor-pointer transition duration-300 hover:bg-purple-300"
                        >
                          <div className="flex gap-4 pr-3.5">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5435be6ae71b2e1add5617b5c077896fa28fc14a376fc1a843a4e7a46e642379?"
                              className="shrink-0 my-auto aspect-square fill-indigo-950 w-[17px]"
                            />
                            <div className="flex flex-col flex-grow">
                              <div className="text-base font-bold text-indigo-950">
                                Asiatul Aini
                              </div>
                              <div className="text-xs text-black text-opacity-40">
                                Has sent you a new message
                              </div>
                            </div>
                            <div className="justify-center self-stretch px-1.5 py-0.5 my-auto text-xs text-center whitespace-nowrap rounded-md border border-solid border-indigo-950 text-indigo-950 hover:bg-indigo-950 hover:text-white cursor-pointer transition duration-300 hover:bg-purple-900 hover:text-white">
                              Done
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
