import React from 'react';

const HomeownerSearchPage = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">Logo</div>
        <div className="search-bar">
          <input type="text" placeholder="Search for Cleaner" />
          <button className="search-btn">🔍</button>
        </div>
        <div className="profile-logout">
          <button className="logout">LOGOUT</button>
          <div className="profile-pic"></div>
        </div>
      </div>

      <div className="homeowners">
        <div className="homeowner-card">
          <div className="card-header">
            <span>Maria</span>
            <span className="heart empty">♡</span>
          </div>
          <div className="avatar"></div>
          <button className="view-btn">View</button>
        </div>
        <div className="homeowner-card">
          <div className="card-header">
            <span>Siti</span>
            <span className="heart filled">❤️</span>
          </div>
          <div className="avatar"></div>
          <button className="view-btn">View</button>
        </div>
        <div className="homeowner-card">
          <div className="card-header">
            <span>Mary</span>
            <span className="heart empty">♡</span>
          </div>
          <div className="avatar"></div>
          <button className="view-btn">View</button>
        </div>
        <div className="homeowner-card">
          <div className="card-header">
            <span>Sally</span>
            <span className="heart filled">❤️</span>
          </div>
          <div className="avatar"></div>
          <button className="view-btn">View</button>
        </div>
      </div>

      <div className="footer-buttons">
        <button className="footer-btn cleaner">Cleaner</button>
        <button className="footer-btn">My Match History</button>
        <button className="footer-btn">My Shortlist(s)</button>
      </div>
    </div>
  );
};

export default HomeownerSearchPage;