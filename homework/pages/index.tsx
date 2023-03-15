import styled from "styled-components";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ResourceAreaComponent } from "@/components/ResourceAreaComponent";
import { ViewerAreaComponent } from "@/components/ViewerAreaComponent";

const MainContentDiv = styled.div`
  display: flex;
`;

const Main = () => {
  return (
    <MainContentDiv>
      <ResourceAreaComponent />
      <ViewerAreaComponent />
    </MainContentDiv>
  );
};

export default Main;
