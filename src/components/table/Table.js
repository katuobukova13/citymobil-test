import React, { useMemo, useState, useEffect } from "react";
import "./table.css";

const useSortableData = (items) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] === "-") {
          console.log(a[sortConfig.key]);
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

function Table({ tariffs, data, result, checkedCar }) {
  const { items, requestSort, sortConfig } = useSortableData(data);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="data" id="data">
      <thead>
        <tr className="data__titles">
          <th
            onClick={() => requestSort("mark")}
            className={`data__title + ${getClassNamesFor("mark")}`}
          >
            Марка и модель
          </th>
          <th
            onClick={() => requestSort("standart")}
            className={`data__title + ${getClassNamesFor("standart")}`}
          >
            Стандарт
          </th>
          <th
            onClick={() => requestSort("comfort")}
            className={`data__title + ${getClassNamesFor("comfort")}`}
          >
            Комфорт
          </th>
          <th
            onClick={() => requestSort("business")}
            className={`data__title + ${getClassNamesFor("business")}`}
          >
            Бизнес
          </th>
          <th
            onClick={() => requestSort("comfortPlus")}
            className={`data__title + ${getClassNamesFor("comfortPlus")}`}
          >
            Комфорт +
          </th>
          <th
            onClick={() => requestSort("econom")}
            className={`data__title + ${getClassNamesFor("econom")}`}
          >
            Эконом
          </th>
          <th
            onClick={() => requestSort("minivan")}
            className={`data__title + ${getClassNamesFor("minivan")}`}
          >
            Минивен
          </th>
          <th
            onClick={() => requestSort("lite")}
            className={`data__title + ${getClassNamesFor("lite")}`}
          >
            Лайт
          </th>
        </tr>
      </thead>
      <tbody>
        {items
          .filter((val) => {
            if (result === "") {
              return val;
            } else if (
              val.mark.toLowerCase().includes(result.toLowerCase()) ||
              val.model.toLowerCase().includes(result.toLowerCase())
            ) {
              return val;
            }
          })
          .map((car, key) => {
            car.standart = car.tariffs["Стандарт"]?.["year"];
            car.comfort = car.tariffs["Комфорт"]?.["year"];
            car.business = car.tariffs["Бизнес"]?.["year"];
            car.comfortPlus = car.tariffs["Комфорт+"]?.["year"];
            car.econom = car.tariffs["Эконом"]?.["year"];
            car.minivan = car.tariffs["Минивен"]?.["year"];
            car.lite = car.tariffs["Лайт"]?.["year"];

            return (
              <tr
                className="data__car"
                key={car.mark + car.model}
                onClick={() =>
                  checkedCar(
                    `${car.mark} ${car.model} ${
                      car.tariffs["Стандарт"]
                        ? car.tariffs["Стандарт"]?.["year"]
                        : ""
                    }`
                  )
                }
              >
                <td className="data__car-name">
                  {car.mark} {car.model}
                </td>
                <td className={`data__car-standart`}>{car.standart ?? "-"}</td>
                <td className="data__car-comfort">{car.comfort ?? "-"}</td>
                <td>{car.business ?? "-"}</td>
                <td>{car.comfortPlus ?? "-"}</td>
                <td>{car.econom ?? "-"}</td>
                <td>{car.minivan ?? "-"}</td>
                <td>{car.lite ?? "-"}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default Table;
