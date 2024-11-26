import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const FilterSortPanel = () => {
  const {
    filterStatus,
    setFilterStatus,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = useContext(ApplicationContext);

  return (
    <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
      <label>Status filtern: </label>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ marginLeft: "5px", marginRight: "15px" }}
      >
        <option value="">Alle</option>
        <option value="Offen">Offen</option>
        <option value="Absage">Absage</option>
        <option value="In Bearbeitung">In Bearbeitung</option>
      </select>

      <label>Sortieren nach: </label>
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        style={{ marginLeft: "5px" }}
      >
        <option value="date">Datum</option>
        <option value="companyName">Unternehmen</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ marginLeft: "5px" }}
      >
        <option value="desc">Absteigend</option>
        <option value="asc">Aufsteigend</option>
      </select>
    </div>
  );
};

export default FilterSortPanel;
