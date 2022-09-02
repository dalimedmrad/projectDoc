import React from "react";
import "./Header.css";
import NewFile from "./NewFile";
import { Form } from "react-bootstrap";

const index = ({ ping, setPing, setFilter }) => {
  return (
    <div className="header">
      <div className="header__logo">
        {/* <img src={GDriveLogo} alt="Google Drive" />
        <span>Drive</span> */}
      </div>
      <div className="header__searchContainer">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search here"
            className="form-control"
            aria-label="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
        </Form>
      </div>
      <div className="header__icons">
        <NewFile ping={ping} setPing={setPing} />
      </div>
    </div>
  );
};

export default index;
