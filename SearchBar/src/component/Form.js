import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "./axios/axios";
import requests from "./axios/Request";
import DisplayData from "./DisplayData";

function Form() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchComments);
      const requestData = await request.data;
      setData(requestData);
    };
    fetchData();
  }, []);

  const filterHandler = (e) => {
    const searchWord = e.target.value;
    setSearch(searchWord);

    const filterData = data?.filter((val) => {
      return val.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (filterData === 0) {
      setFilter([]);
    } else {
      setFilter(filterData);
    }
  };

  const clickHandler = (val) => {
    setDisplayData((prev) => {
      const updated = [...prev];
      updated.push({ name: val.name, id: val.id });
      return updated;
    });
    setSearch("");
  };

  const deletHandler = (value) => {
    setDisplayData((prev) => {
      const updated = prev.filter((val) => val.id !== value.id);
      return updated;
    });
  };
  return (
    <Container>
      <DisplayData dataDisplay={displayData} onClick={deletHandler} />

      <Input
        type="text"
        placeholder="Search here"
        onChange={filterHandler}
        value={search}
      />

      {search && <DisplayData dataDisplay={filter} onClick={clickHandler} />}
    </Container>
  );
}

export default Form;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
`;

const Input = styled.input`
  font-size: 1.5rem;
  outline: none;
  border: 1px solid gray;
  border-radius: 5px;
  width: 20rem;
`;
