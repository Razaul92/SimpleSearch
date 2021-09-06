import styled from "styled-components";

function DisplayData({ dataDisplay, onClick }) {
  return (
    <Container>
      {dataDisplay?.map((val) => (
        <p onClick={() => onClick(val)} key={val.id}>
          {val.name}
        </p>
      ))}
    </Container>
  );
}

export default DisplayData;

const Container = styled.div`
  margin-bottom: 0.5rem;
  width: 20rem;
  border-radius: 10px;
  z-index: 10;
  scrollbar-width: 0;
  border: 1px solid gray;

  > p {
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    border-bottom: 1px solid gray;

    :last-child {
      border-bottom: none;
    }
  }
`;
