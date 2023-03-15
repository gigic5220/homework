import React, { useRef } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { add, getList } from "@/actions/resource";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/configureStore";
import resourceSlice from "@/reducers/resource";
import { ResourceReq } from "@/types/resource";

const AddResourceDiv = styled.div`
  padding: 5px;
  width: 250px;
  height: 28px;
  position: absolute;
  left: 10px;
  top: 42px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 2;
`;

const AddResourceInput = styled.input`
  padding: 8px 6px 6px 8px;
  width: 234px;
  height: 12px;
  border: 1px solid #48ace3;
  border-radius: 3px;
`;

export const ResourceAddComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addInput = useRef<HTMLInputElement>(null);

  const handleBlurAddInput = async (e: React.FocusEvent<HTMLInputElement>) => {
    await addResource(e.target.value);
  };

  const handleAddKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await addResource((e.target as HTMLInputElement).value);
    }
  };

  let isCallingApi = false;

  const validateResource = (url: string) => {
    let result = true;
    if (url === "https://") {
      result = false;
    }
    return result;
  };

  const callAddResourceApi = async (url: string) => {
    const resourceReq: ResourceReq = { name: url, url: url };
    return await toast.promise(dispatch(add(resourceReq)).unwrap(), {
      pending: "등록중입니다",
      success: "등록되었습니다.",
      error: "등록에 실패했습니다.",
    });
  };

  const replaceUrl = (resource: string) => {
    return resource.includes("www.youtube.com/watch?v=")
      ? resource.replace("www.youtube.com/watch?v=", "www.youtube.com/embed/")
      : resource;
  };

  const addResource = async (resource: string) => {
    console.log(isCallingApi);
    if (isCallingApi) return;
    isCallingApi = true;

    const url = replaceUrl(resource);

    if (!validateResource(url)) {
      isCallingApi = false;
      return;
    }

    try {
      await callAddResourceApi(url);
      dispatch(resourceSlice.actions.setIsShowAddInput(false));
      dispatch(getList());
    } catch (e) {
      console.log("error: ", e);
    } finally {
      isCallingApi = false;
    }
  };

  return (
    <AddResourceDiv>
      <AddResourceInput
        defaultValue={"https://"}
        onBlur={handleBlurAddInput}
        onKeyDown={handleAddKeyDown}
        ref={addInput}
      />
    </AddResourceDiv>
  );
};
