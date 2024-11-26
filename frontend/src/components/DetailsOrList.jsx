import React, { useState } from "react";
import ApplicationList from "./ApplicationList";
import ApplicationListed from "./ApplicationListed";

import { useAuth } from "../context/AuthContext";

export default function DetailsOrList({ applications, refreshApplications }) {
  const { isAuthenticated } = useAuth();
  const [showDetails, setShowDetails] = useState(true);

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };
  return (
    <div className="applicationList-wrapper">
      <button onClick={handleShowDetails} className="detailSwitcher">
        Zeige {showDetails ? " Liste" : " Details"}
      </button>
      {showDetails ? <ApplicationList /> : <ApplicationListed />}
    </div>
  );
}
