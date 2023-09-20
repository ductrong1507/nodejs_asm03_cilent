import React from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";

export default function RegisterPage() {
  return (
    <main
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('./assets/images/banner1.jpg')`,
      }}
      className="w-70 mb-32"
    >
      <SignUpForm />
    </main>
  );
}
