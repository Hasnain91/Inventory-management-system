import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          {/* <RiProductHuntLine size={35} /> */}
          <MdInventory size={35} />
        </div>
        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* Hero Section */}
      <div className="container hero">
        <div className="hero-text">
          <h2>Inventory & Stock Management Solution</h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Try it Now!</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="2.3K" text="Brand Owners" />
            <NumberText num="8.7K" text="Active Users" />
            <NumberText num="100+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </div>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
