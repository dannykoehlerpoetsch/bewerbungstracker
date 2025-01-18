import { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import styles from "./FilterSortPanel.module.css"; // Separate CSS-Datei für Stile
import { SortDescending, SortAscending } from "@phosphor-icons/react";

const FilterSortPanel = () => {
  const {
    filterStatus,
    setFilterStatus,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
  } = useContext(ApplicationContext);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.select}
          >
            <option value="">Alle</option>
            <option value="Offen">Offen</option>
            <option value="Absage">Absage</option>
            <option value="In Bearbeitung">In Bearbeitung</option>
          </select>
        </div>

        <div className={styles.sortGroup}>
          <label className={styles.label}>Sortiere nach:</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className={styles.select}
          >
            <option value="date">Datum</option>
            <option value="companyName">Unternehmen</option>
          </select>
        </div>

        <div className={styles.iconGroup}>
          <button
            type="button"
            className={styles.sortButton}
            onClick={toggleSortOrder}
            title={
              sortOrder === "asc"
                ? "absteigend sortieren"
                : "aufsteigend sortieren"
            }
          >
            {sortOrder === "asc" ? (
              <SortAscending size={24} />
            ) : (
              <SortDescending size={24} />
            )}
          </button>
        </div>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Unternehmen suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchbar}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSortPanel;
