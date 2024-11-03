import React, {useState} from "react";
import "./style/index.css";
import Reviews, { handleNextPage, handlePrevPage } from "./components/reviews/Reviews";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalItems = 12;

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header_title">
          <h3>Our Customer Feedback</h3>
          <p>Don't take our word for it. Trust our customers</p>
        </div>
        <div className="app__header_btn">
          <button className="app__header_btn_controlPrev" disabled={currentPage === 1 ? true : false} onClick={() => handlePrevPage(currentPage, setCurrentPage)}>
            <div className="app__header_btn_control-lArrow">&lt;</div>
            <span>Previous</span>
          </button>
          <button className="app__header_btn_controlNext" disabled={currentPage === Math.ceil(totalItems / itemsPerPage) ? true : false} onClick={() => handleNextPage(currentPage, setCurrentPage, totalItems, itemsPerPage)}>
            <span>Next</span>
            <div className="app__header_btn_control-rArrow">&gt;</div>
          </button>
        </div>
      </header>
      <Reviews currentPage={currentPage} itemsPerPage={itemsPerPage} />
    </div>
  );
}

export default App;
