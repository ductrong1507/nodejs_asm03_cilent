import React from "react";
import SignInForm from "../components/SignInForm/SignInForm";

export default function LoginPage() {
  return (
    <main
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('http://localhost:3000/assets/images/banner1.jpg')`,
      }}
      className="w-70 mb-32"
    >
      <SignInForm />
    </main>
  );
}
