import React from "react";
import utnPhoto from "../../assets/utm.png";

export default function SignInPageCover() {
  const myImageStyle = { width: "700px", height: "400px" };
  return (
    <div className="bg-image">
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <img
          style={myImageStyle}
          src={utnPhoto}
          className="img-fluid"
          alt="UTM"
        />
      </div>
      <div className="mask d-flex flex-column justify-content-end align-items-end ">
        <div className="d-flex flex-column justify-content-end align-items-end mb-2 ">
          <p className="text-secondary text-center p-5 ">
            Welcome to UTM ONLINE OLD MARKET, where you can sell your unwanted
            things and buy your needed thonge.
          </p>
        </div>
      </div>
    </div>
  );
}
