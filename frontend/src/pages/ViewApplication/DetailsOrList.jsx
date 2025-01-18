import React, { useState, useContext } from "react";
import ApplicationList from "../../components/AppDetails/ApplicationList";
import ApplicationListed from "../../components/AppList/ApplicationListed";
import FilterSortPanel from "../../components/FilterSortPanel/FilterSortPanel";
import { ApplicationContext } from "../../context/ApplicationContext";

import { useAuth } from "../../context/AuthContext";

export default function DetailsOrList() {
  const { isAuthenticated } = useAuth();
  const [showDetails, setShowDetails] = useState(true);

  const {
    applications,
    fetchApplications,
    filterStatus,
    sortField,
    sortOrder,
    searchTerm,
    setSearchTerm,
  } = useContext(ApplicationContext);

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };
  return (
    <div className="applicationList-wrapper">
      <FilterSortPanel />
      <p className="application-count">
        gefilterte Bewerbungen: <span>{applications.length}</span>
      </p>

      <button onClick={handleShowDetails} className="detailSwitcher">
        Zeige {showDetails ? " Liste" : " Details"}
      </button>
      {showDetails ? <ApplicationList /> : <ApplicationListed />}
    </div>
  );
}
