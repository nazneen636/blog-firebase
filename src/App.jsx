import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./Component/Home/RootLayout";
// import SignUp from "./pages/SignUp/SignUp";
// import SignIn from "./pages/SignIn/SignIn";

const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Home = lazy(() => import("./pages/Home/Home"));
const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-red-700 text-2xl flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
