import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import lib from "../../lib/lib";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";

const SignUp = () => {
  const inputRef = useRef(null);
  const auth = getAuth();
  const db = getDatabase();
  const { user, setUser, error, setError, loading, setLoading } =
    useContext(AuthContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // handle onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  console.log(user);

  // handle signup
  const handleSignUp = () => {
    const { fullName, email, password } = user;
    const newError = {
      fullName: "",
      email: "",
      password: "",
    };
    if (!fullName) {
      newError.fullName = "Name is empty";
    }
    if (!email) {
      newError.email = "Email is empty";
    }
    if (!password) {
      newError.password = "Password is empty";
    }
    setError(newError);
    createUserWithEmailAndPassword(auth, email, password, fullName)
      .then((userInfo) => {
        setLoading(true);
        lib.SuccessToast("Registration successfully");
        updateProfile(auth.currentUser, {
          displayName: fullName,
          photoURL: "profile",
        });
      })
      .then(() => {
        const userdb = ref(db, "users/");
        set(push(userdb), {
          userid: auth.currentUser.uid,
          username: auth.currentUser.displayName || fullName,
          email: auth.currentUser.email || email,
          profile_picture:
            auth.currentUser.photoURL ||
            "https://img.freepik.com/free-vector/gradient-product-manager-linkedin-profile-picture_742173-7162.jpg?t=st=1746982998~exp=1746986598~hmac=a96833ed2bff144a914d65c126a82d15c8b7f0c2d00bdfea0670ca60ed7abb0c&w=740",
        });
        return sendEmailVerification(auth.currentUser);
      })
      .then((mailData) => lib.InfoToast("Mail verified successfully"))
      .catch((err) => {
        lib.ErrorToast("Registration failed:", err.code);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setUser({
          fullName: "",
          email: "",
          password: "",
        });
      });
  };
  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              class="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  for="fullname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    ref={inputRef}
                    name="fullName"
                    id="fullName"
                    onChange={handleChange}
                    value={user.fullName}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John doe"
                    required=""
                  />
                  <p className="text-red-500 absolute left-0 top-full">
                    {error.fullName}
                  </p>
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={user.email}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  <p className="text-red-500 absolute left-0 top-full">
                    {error.email}
                  </p>
                </div>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={user.password}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  <p className="text-red-500 absolute left-0 top-full">
                    {error.password}
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {loading ? (
                <button class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Processing....
                </button>
              ) : (
                <button
                  onClick={handleSignUp}
                  type="submit"
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              )}
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/signin"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
