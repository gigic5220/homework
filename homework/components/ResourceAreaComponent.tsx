import React, { useRef } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { add, getList } from "@/actions/resource";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/configureStore";
import { ResourceListComponent } from "@/components/ResourceListComponent";
import { ResourceAddComponent } from "@/components/ResourceAddComponent";
import resourceSlice from "@/reducers/resource";
import { Resource, ResourceReq } from "@/types/resource";

const UrlListDiv = styled.div`
  width: 280px;
  height: 800px;
  background-color: #f7f7f7;
  border-right: 1px solid #c4c4c4;
`;

const ButtonDiv = styled.div`
  padding: 10px;
  width: 260px;
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const Button = styled.button`
  font-size: 12px;
  width: 100%;
  height: 30px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

export const ResourceAreaComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInput = useRef<HTMLInputElement>(null);
  const isShowAddInput = useSelector(
    (state: RootState) => state.resource.isShowAddInput
  );
  const resourceList = useSelector((state: RootState) => state.resource.list);

  const handleClickAddUrlBtn = () => {
    const mappedResourceList = resourceList.map((resource: Resource) => {
      return {
        ...resource,
        enabled: false,
      };
    });
    dispatch(resourceSlice.actions.setResourceList(mappedResourceList));
    dispatch(resourceSlice.actions.setIsShowAddInput(!isShowAddInput));
  };

  const handleClickAddFileBtn = () => {
    fileInput.current?.click();
    dispatch(resourceSlice.actions.setIsShowAddInput(false));
  };

  const validateImage = (fileList: FileList | null) => {
    let result = true;
    for (let i = 0; fileList !== null && i < fileList.length; i++) {
      const fileName = fileList[i].name;
      let ext = fileName
        .substring(fileName.lastIndexOf(".") + 1)
        .toLocaleLowerCase();
      if (!ext) {
        result = false;
        break;
      }
      const allowExtList = ["jpg", "png"];
      if (!allowExtList.includes(ext)) {
        result = false;
        break;
      }
    }
    return result;
  };

  const convertImageToBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result);
        }
      };
    });
  };

  const convertFileToResource = async (fileList: FileList | null) => {
    const fileParams: ResourceReq[] = [];
    if (fileList !== null && fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const result = await convertImageToBase64(fileList[i]);
        fileParams.push({ name: fileList[i].name, url: result });
      }
    }
    return fileParams;
  };

  const callUploadFileApi = async (fileParams: ResourceReq[]) => {
    return await toast.promise(dispatch(add(fileParams)).unwrap(), {
      pending: "등록중입니다",
      success: "등록되었습니다.",
      error: "등록에 실패했습니다.",
    });
  };

  const uploadFile = async (fileList: FileList | null) => {
    if (!validateImage(fileList)) {
      toast.error("jpg, png 파일만 업로드 가능합니다.", {
        position: "top-left",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      await callUploadFileApi(await convertFileToResource(fileList));
      dispatch(getList());
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleChangeFileInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    await uploadFile(e.target.files);
  };

  const handleClickFileInput = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    (e.target as HTMLInputElement).value = "";
  };

  return (
    <UrlListDiv>
      <ButtonDiv>
        <Button onClick={handleClickAddUrlBtn}>URL 추가</Button>
        <Button onClick={handleClickAddFileBtn}>이미지 추가</Button>
        <input
          type="file"
          multiple={true}
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleChangeFileInput}
          onClick={handleClickFileInput}
          accept={".jpg, .png"}
        />
        {isShowAddInput && <ResourceAddComponent />}
      </ButtonDiv>
      <ResourceListComponent />
    </UrlListDiv>
  );
};
