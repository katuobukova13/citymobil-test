import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../table/Table";
import Search from "../search/Search";
import Loader from "../loader/Loader";
import "./main.css";

function Main() {
  const [loading, setLoading] = useState(true);
  const [tariffs, setTariffs] = useState([]);
  const [data, setData] = useState([]);
  const [result, setResult] = useState("");
  const [checked, checkedCar] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await axios.get("https://city-mobil.ru/api/cars").then((data) => {
        setTariffs(data.data.tariffs_list);
        setData(data.data.cars);
      });
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <main>
      <aside>sidebar</aside>
      <div className="table">
        {loading && <Loader />}
        {!loading && <Search data={data} setResult={setResult} />}
        {!loading && (
          <Table
            tariffs={tariffs}
            data={data}
            result={result}
            checkedCar={checkedCar}
          />
        )}
        <div className="select">{checked}</div>
      </div>
    </main>
  );
}

export default Main;
