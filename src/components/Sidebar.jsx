import React, { useState } from "react";
import {
  DASHBOARD_SIDEBAR_LINKS,
  USER_SIDEBAR_LINKS,
} from "../lib/consts/navigation";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "universal-cookie";

import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import { FaTooth } from "react-icons/fa";

library.add(faArrowRightFromBracket);

const linkClasses =
  "flex items-center gap-2 font-light transition-all duration-200 ease-in-out px-3 py-2 hover:bg-[#17345c] hover:no-underline text-base hover:text-white mx-1";

const SidebarLink = ({ item }) => {
  const { pathname } = useLocation();
  const id = useParams();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "text-white text-xl font-semibold bg-[#17345c]"
          : "text-gray-900 text-xl font-semibold",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userType = useSelector((state) => state.users.type);

  const dni = useSelector((state) => state.users.users);
  const onLogout = () => {
    const cookie = new Cookie();
    cookie.remove("token");
    const tokenExists = cookie.get("token");
    if (!tokenExists) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <section
        className={`${
          isOpen ? "left-0" : "-left-full"
        } bg-background-300 lg:w-[20%] w-[100%] shadow-lg z-[50] flex flex-col  justify-between py-4 fixed h-screen transition-all duration-200 lg:left-0`}
      >
        <div className="flex items-center justify-center gap-2 px-1 py-3">
          <div className="text-blue-600">
            <FaTooth style={{ height: "30px", width: "30px" }} />
          </div>
          <span className="text-gray-900 text-3xl font-bold">Dental Care</span>
        </div>
        <div className="flex-1 py-8 flex flex-col gap-4">
          {userType
            ? DASHBOARD_SIDEBAR_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} />
              ))
            : USER_SIDEBAR_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} />
              ))}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 mb-10">
          <button
            className={classNames(
              "text-red-500 text-lg font-semibold cursor-pointer",
              linkClasses
            )}
            onClick={onLogout}
          >
            <span className="text-xl">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </span>
            Logout
          </button>
          {/* comentario */}
        </div>
      </section>
      <button
        className="absolute bottom-6 right-8 text-4xl lg:hidden bg-icon-100 text-white rounded-lg py-1 px-2 box-content z-50 text-light"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RiCloseFill /> : <RiMenu3Fill />}
      </button>
    </>
  );
};

export default Sidebar;
