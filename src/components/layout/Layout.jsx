import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import CloudBackdrop from "../ui/CloudBackdrop";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-skyink-50">
      {/* Фон з “хмарами” */}
      <CloudBackdrop />

      {/* Контент поверх */}
      <div className="relative z-10">
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </div>
  );
}
