import React from "react";

const Header = () => {
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcom,</span>
          <span className="--color-danger">Hasnain</span>
        </h3>
        <button className="--btn --btn-danger"> Logout</button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
