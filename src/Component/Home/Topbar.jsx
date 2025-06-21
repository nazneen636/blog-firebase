import React, { useEffect, useState } from "react";
import lib from "../../lib/lib";
import { IoMdCloudUpload } from "react-icons/io";
import { IoChatbubbleEllipses, IoHome, IoLogOutSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { FaGear } from "react-icons/fa6";
import { FaBell, FaEdit } from "react-icons/fa";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
import ThemeToggle from "../ThemeToggle";
const navigationItem = [
  { id: 1, name: 'Home', path: "/" },
  { id: 2, name: 'Blog' , path: "/blog" },
  { id: 3, name: 'Sign Out', path: "/signin" },

];

// handleNavigation

const Topbar = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path = "/") => {
    navigate(path);
    console.log(path);
  };

  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, "users/");
      onValue(userRef, (snapshot) => {
        let obj = {};
        snapshot.forEach((item) => {
          if (auth.currentUser.uid == item.val().userid)
            obj = { ...item.val(), userKey: item.key };
        });
        setUserData(obj);
      });
    };
    fetchData();
  }, []);
  console.log(auth.currentUser, "currentUser");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);
    console.log(script);
  }, []);

  const handleProfilePicture = () => {
    console.log("hello");

    cloudinary.openUploadWidget(
      {
        cloudName: "dzfesj1vk",
        uploadPreset: "Nazneen",
        searchByRights: true,
        googleApiKey: "AIzaSyAPSvRNBpPeXhqIfMBTP2v-6kWYjjfCLMo",
        searchBySites: ["all", "cloudinary.com"],
        sources: [
          "local",
          "url",
          "image_search",
          "unsplash",
          "shutterstock",
          "dropbox",
          "camera",
          "gettyimages",
          "istock",
        ],
      },
      (error, result) => {
        if (error) {
          throw new Error("upload failed", error);
        }
        if (result.info.secure_url) {
          update(ref(db, `users/${userData.userKey}`), {
            profile_picture: result.info.secure_url,
          }).then(() => {
            SuccessToast("Update Profile Successfully");
          });
          updateProfile(auth.currentUser, {
            displayName: '',
            photoURL: '',
          })
            .then(() => {
              SuccessToast("Update Profile Successfully");
            })
            .catch((error) => {
              console.log("Updating failed", error);
            });
        }
      }
    );
  };

  return (
    <div className="flex w-full justify-between  items-center bg-amber-100 px-10">
      {/* profile */}
      <div className="flex items-center justify-center">
        <div
          onClick={handleProfilePicture}
          className="w-[100px] h-[100px] rounded-full bg-black relative group cursor-pointer my-4"
        >
          <picture>
            <img
              src={userData?.profile_picture || 'profile'}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </picture>
          <div className="absolute left-0 top-0 h-full w-full rounded-full bg-[#0000007a] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <IoMdCloudUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-3xl" />
        </div>
        <h1 className="ml-5 text-center text-gray-700 text-base font-semibold mt-2 flex gap-1 items-center">
          {userData?.username || "User Name"}{" "}
        </h1>
        {/* <p className="text-gray-700 text-sm mt-1 mb-2">
          {userData?.email || "email"}
        </p> */}
      </div>

      {/* navigation icon */}
      <div className=" flex gap-10 items-center">
        {navigationItem?.map(({ id, name, path }, index) =>
      
          (
            <span
              onClick={() => handleNavigation(path)}
              key={id}
              className={
                location.pathname == path
                  ? "text-3xl text-blue-600 py-2 cursor-pointer active"
                  : "text-3xl text-black py-2 cursor-pointer"
              }
            >
              {name}
            </span>
          )
        )}
        <ThemeToggle/>
      </div>
    </div>
  );
};

export default Topbar;