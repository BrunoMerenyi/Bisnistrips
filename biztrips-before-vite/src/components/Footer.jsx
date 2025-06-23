import React from "react";

export default function Footer() {
  async function  logOut  (){
  const res = await fetch("/api/logout", {
    method: "POST",
    credentials: "include", 
    
  });

  if (res.ok){
    window.location.href='/trips'
  }
    return res;
};
  return (
    <footer className="flex justify-center">
      <p>
        This site is created for demonstrative purposes only and does not offer
        any real products or services.
      </p>
      <button onClick={logOut} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ">
        Log Out
      </button>
      <p>&copy; BBW 2024</p>
    </footer>
  );
}
