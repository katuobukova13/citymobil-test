import React, { useState } from "react";
import "./table.css";
import _ from "lodash";

const Table = ({ data, result, checkedCar }) => {
  const [cars, setCars] = useState(data);
  const [sort, setSort] = useState("asc");
  const [sortField, setSortField] = useState("");

  const requestSort = (field) => {
    let sortableData = [...data];
    let sortType = sort === "asc" ? "desc" : "asc";

    const orderedData = _.orderBy(sortableData, field, sortType);

    setCars(orderedData);
    setSort(sortType);
    setSortField(field);
  };

  return (
    <table className="data" id="data">
      <thead>
        <tr className="data__titles">
          <th onClick={() => requestSort("mark")} className={`data__title`}>
            Марка и модель
            {sortField === "mark" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
          <th
            onClick={() => requestSort("standart")}
            className={`data__title `}
          >
            Стандарт
            {sortField === "standart" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
          <th onClick={() => requestSort("comfort")} className={`data__title`}>
            Комфорт
            {sortField === "comfort" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
          <th onClick={() => requestSort("business")} className={`data__title`}>
            Бизнес
            {sortField === "business" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
          <th
            onClick={() => requestSort("comfortPlus")}
            className={`data__title `}
          >
            Комфорт+
            {sortField === "comfortPlus" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
          <th onClick={() => requestSort("econom")} className={`data__title `}>
            Эконом
            {sortField === "econom" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
          <th onClick={() => requestSort("minivan")} className={`data__title`}>
            Минивен
            {sortField === "minivan" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
          <th onClick={() => requestSort("lite")} className={`data__title`}>
            Лайт
            {sortField === "lite" ? (
              sort === "asc" ? (
                <small>&#5123;</small>
              ) : (
                <small>&#9661;</small>
              )
            ) : (
              ""
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {cars
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
};

export default Table;
