import React from "react";
import styled from "@emotion/styled";
import resourceSlice from "@/reducers/resource";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/configureStore";

const Viewer = styled.div`
  width: 919px;
  height: 800px;
  background-color: #f0f0f0;
`;

const ResourceUrlDiv = styled.div`
  font-size: 14px;
  padding: 17px;
  height: 16px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const UrlRemoveIcon = styled.span`
  line-height: 14px;
  float: right;
  cursor: pointer;
`;

const IFrame = styled.iframe`
  width: 915px;
  height: 746px;
  background: #ffffff;
`;

const Img = styled.img`
  width: 915px;
  height: 746px;
  background: #ffffff;
`;

export const ViewerAreaComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isShowIFrame = useSelector(
    (state: RootState) => state.resource.isShowIFrame
  );
  const isShowImage = useSelector(
    (state: RootState) => state.resource.isShowImage
  );
  const selectedResource = useSelector(
    (state: RootState) => state.resource.selectedResource
  );

  const handleUrlRemoveBtn = () => {
    dispatch(resourceSlice.actions.setSelectedResource(null));
    dispatch(resourceSlice.actions.setIsShowIFrame(false));
    dispatch(resourceSlice.actions.setIsShowImage(false));
  };

  return (
    <Viewer>
      {selectedResource && (
        <>
          <ResourceUrlDiv>
            {selectedResource ? selectedResource.name : ""}
            <UrlRemoveIcon
              className="material-symbols-outlined"
              onClick={handleUrlRemoveBtn}
            >
              close
            </UrlRemoveIcon>
          </ResourceUrlDiv>
          {isShowIFrame && (
            <IFrame
              src={selectedResource ? selectedResource.url.toString() : ""}
            />
          )}
          {isShowImage && (
            <Img
              src={selectedResource ? selectedResource.url.toString() : ""}
            />
          )}
        </>
      )}
    </Viewer>
  );
};
