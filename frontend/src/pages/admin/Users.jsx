import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import trash from "../../assets/trash.png";
import search from "../../assets/search.svg";
import "./../../assets/css/user.css";
import ConfirmationPopup from '../../Components/ConfirmationPopup';

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const { isError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      navigate("/Login");
    }
  }, [isError, navigate]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setUsers(response.data);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupAction, setPopupAction] = useState(() => {});

  const handleDeleteUser = (userId) => {
    setPopupMessage("Are you sure you want to delete this user?");
    setPopupAction(() => async () => {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      getUsers();
      setShowPopup(false);
    });
    setShowPopup(true);
  };

  const handleConfirmUser = (userId) => {
    setPopupMessage("Are you sure you want to confirm this user?");
    setPopupAction(() => async () => {
      await axios.patch(`http://localhost:3000/roleusers/${userId}`);
      getUsers();
      setShowPopup(false);
    });
    setShowPopup(true);
  };

  const newUserCount = users.filter(
    (user) => user.role === "pengunjung"
  ).length;
  const activeUserCount = users.filter(
    (user) => user.role === "pembeli"
  ).length;

  const [newUserSearchTerm, setNewUserSearchTerm] = useState("");
  const [activeUserSearchTerm, setActiveUserSearchTerm] = useState("");

  const handleNewUserSearch = (event) => {
    setNewUserSearchTerm(event.target.value);
  };

  const handleActiveUserSearch = (event) => {
    setActiveUserSearchTerm(event.target.value);
  };

  return (
    <div className="user-content">
      <div className="pr-14 bg-gray-200 max-md:pr-5 w-full">
        <div className="left-[347px] top-[69px] absolute text-black text-xl font-normal font-['Poppins']">
          Admin Infinite Learning Shop
        </div>
        <div className="left-[347px] top-[30px] absolute text-violet-600 text-[32px] font-bold font-['Poppins']">
          User List
        </div>

        <div
          style={{
            width: 1060,
            height: 380,
            left: 345,
            top: 120,
            position: "absolute",
            background: "white",
            boxShadow: "0px 0px 5.5px rgba(0, 0, 0, 0.25)",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <div
            className="inline-flex items-center gap-2"
            style={{ marginLeft: "640px", marginTop: "10px" }}
          >
            <input
              type="text"
              placeholder="Search New User"
              className="input input-bordered input-primary w-[409px] h-[42px] pl-[15px] pr-[15px] py-3 bg-white rounded-[10px] shadow justify-center items-center gap-2.5 inline-flex"
              value={newUserSearchTerm}
              onChange={handleNewUserSearch}
            />
          </div>

          <div className="px-5 pt-4 flex-col justify-start items-start flex">
            <div className="w-96 text-black text-lg font-bold font-['Poppins']">
              NEW USER LIST
            </div>
            <div className="w-56 h-5 text-black/opacity-50 text-xs font-light font-['Poppins']">
              {newUserCount} User{newUserCount !== 1 ? "s" : ""} Requires
              Confirmation
            </div>
          </div>
          <div className="overflow-x-auto w-1060 h-[250px]">
            <table
              className="table table-zebra table-pin-rows table-pin-cols"
              style={{ width: "1060" }}
            >
              <thead>
                <tr className="w-96 h-11 bg-gray-300">
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    No
                  </td>
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    Phone Number
                  </td>
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    Email
                  </td>
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    Name
                  </td>
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(
                    (user) =>
                      user.role === "pengunjung" &&
                      user.name
                        .toLowerCase()
                        .includes(newUserSearchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {index + 1}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {user.phone}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {user.email}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {user.name}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        <button
                          className="btn btn-ghost btn-xs btn-outline btn-warning"
                          onClick={() => handleConfirmUser(user.id)}
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="btn btn-ghost btn-xs btn-outline btn-error"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            width: 1060,
            height: 470,
            left: 345,
            top: 510,
            position: "absolute",
            background: "white",
            boxShadow: "0px 0px 5.5px rgba(0, 0, 0, 0.25)",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <div
            className="inline-flex items-center gap-2"
            style={{ marginLeft: "640px", marginTop: "10px" }}
          >
            <input
              type="text"
              placeholder="Search Active Users"
              className="input input-bordered input-primary w-[409px] h-[42px] pl-[15px] pr-[15px] py-3 bg-white rounded-[10px] shadow justify-center items-center gap-2.5 inline-flex "
              value={activeUserSearchTerm}
              onChange={handleActiveUserSearch}
            />
          </div>
          <div className="px-5 pt-4 flex-col justify-start items-start flex">
            <div className="w-96 text-black text-lg font-bold font-['Poppins']">
              LIST OF ACTIVE USERS
            </div>
            <div className="w-56 h-5 text-black/opacity-50 text-xs font-light font-['Poppins']">
              {activeUserCount} User{activeUserCount !== 1 ? "s" : ""} Active
              User
            </div>
          </div>
          <div className="overflow-x-auto w-1060 h-[387px]">
            <table className="table table-zebra table-pin-rows table-pin-cols">
              <thead>
                <tr className="w-96 h-11 bg-gray-300">
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    No
                  </td>
                  <td className="w-28 text-center text-black text-sm font-semibold font-['Poppins']">
                    Phone Number
                  </td>
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    Email
                  </td>
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    Name
                  </td>
                  <td className="w-10 text-center text-black text-sm font-semibold font-['Poppins']">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(
                    (user) =>
                      user.role === "pembeli" &&
                      user.name
                        .toLowerCase()
                        .includes(activeUserSearchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {index + 1}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {user.phone}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {user.email}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        {user.name}
                      </td>
                      <td className="w-10 text-center text-black text-sm font-normal font-['Poppins']">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          style={{ zIndex: "1" }}
                          className="w-[20px] h-[40px] opacity-60 rounded-full"
                        >
                          <div className="bg-gray-300 w-[21px] h-[21px] flex items-center justify-center rounded-full">
                            <img
                              src={trash}
                              alt="trash Icon"
                              className="w-[13px] h-[15px]"
                            />
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showPopup && (
        <ConfirmationPopup
          message={popupMessage}
          onConfirm={popupAction}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default Users;
