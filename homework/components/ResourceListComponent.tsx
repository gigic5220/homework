import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { toast, ToastContainer } from "react-toastify";
import resourceSlice from "@/reducers/resource";
import { getList, remove, update } from "@/actions/resource";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/configureStore";
import { Resource } from "@/types/resource";

const ListDiv = styled.div`
  padding: 10px;
  height: 730px;
  overflow: auto;
`;

const ListItemDiv = styled.div`
  margin-bottom: 10px;
  height: 90px;
  border-radius: 10px;
  background-color: #ffffff;
  position: relative;
`;

interface ListContentDivProps {
  enabled?: boolean;
}

interface UpdateResourceInputProps {
  resourceListLength: number;
}

const ListContentDiv = styled.div<ListContentDivProps>`
  padding: ${(props) => (props.enabled ? "5px" : "12px")};
`;

const UpdateResourceInput = styled.input<UpdateResourceInputProps>`
  padding: 8px 6px 6px 8px;
  width: ${(props) => (props.resourceListLength > 7 ? "216px" : "234px")};
  height: 16px;
  border: 1px solid #48ace3;
  border-radius: 3px;
  font-size: 14px;
`;

const ResourceDiv = styled.div`
  font-size: 14px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  max-width: 220px;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  cursor: pointer;
`;

const ListButtonDiv = styled.div`
  .material-symbols-outlined {
    font-size: 16px;
  }
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

const UpdateIcon = styled.span`
  margin-right: 10px;
  cursor: pointer;
`;

const RemoveIcon = styled.span`
  cursor: pointer;
`;

export const ResourceListComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const resourceList = useSelector((state: RootState) => state.resource.list);
  const selectedResource = useSelector(
    (state: RootState) => state.resource.selectedResource
  );
  const listItemDiv = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getList());
  }, []);

  const handleClickEditBtn = (id: number | undefined) => {
    const mappedList = resourceList.map((resource: Resource) => {
      return {
        ...resource,
        enabled: id === resource.id ? !resource.enabled : false,
      };
    });
    dispatch(resourceSlice.actions.setResourceList(mappedList));
  };

  const callRemoveResourceApi = async (id: number | undefined) => {
    return await toast.promise(dispatch(remove(id)).unwrap(), {
      pending: "삭제중입니다",
      success: "삭제되었습니다.",
      error: "삭제에 실패했습니다.",
    });
  };

  const handleClickRemoveBtn = async (id: number | undefined) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await callRemoveResourceApi(id);
        if (selectedResource && id === selectedResource.id) {
          dispatch(resourceSlice.actions.setSelectedResource(null));
        }
        dispatch(getList());
      } catch (e) {
        console.log("error: ", e);
      }
    }
  };

  const handleClickResource = (resource: Resource) => {
    const isWebpage = resource.url.toString().startsWith("https://");

    dispatch(resourceSlice.actions.setIsShowIFrame(isWebpage));
    dispatch(resourceSlice.actions.setIsShowImage(!isWebpage));
    dispatch(resourceSlice.actions.setSelectedResource(resource));
  };

  const handleBlurUpdateInput = async (
    e: React.FocusEvent<HTMLInputElement>,
    id: number | undefined
  ) => {
    await updateResource(e.target.value, id);
  };

  const handleUpdateKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number | undefined
  ) => {
    if (e.key === "Enter") {
      await updateResource((e.target as HTMLInputElement).value, id);
    }
  };

  const callUpdateResourceApi = async (
    name: string,
    id: number | undefined
  ) => {
    const reqParam = {
      id: id,
      name: name,
    };
    return await toast.promise(dispatch(update(reqParam)).unwrap(), {
      pending: "수정중입니다",
      success: "수정되었습니다.",
      error: "수정에 실패했습니다.",
    });
  };

  const validateResource = (url: string) => {
    return !!url;
  };

  const updateResource = async (name: string, id: number | undefined) => {
    if (!validateResource(name)) {
      return;
    }

    try {
      await callUpdateResourceApi(name, id);
      if (selectedResource && id === selectedResource.id) {
        dispatch(
          resourceSlice.actions.setSelectedResource({
            ...selectedResource,
            name: name,
          })
        );
      }
      dispatch(getList());
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <ListDiv>
      <ToastContainer
        position="top-left"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      {resourceList &&
        resourceList.map((resource: Resource) => {
          return (
            <ListItemDiv key={resource.id} ref={listItemDiv}>
              <ListContentDiv enabled={resource.enabled}>
                {resource.enabled ? (
                  <UpdateResourceInput
                    resourceListLength={resourceList.length}
                    type={"text"}
                    defaultValue={resource.name}
                    onBlur={(e) => handleBlurUpdateInput(e, resource.id)}
                    onKeyDown={(e) => handleUpdateKeyDown(e, resource.id)}
                  />
                ) : (
                  <ResourceDiv onClick={() => handleClickResource(resource)}>
                    {resource.name}
                  </ResourceDiv>
                )}
              </ListContentDiv>

              <ListButtonDiv>
                <UpdateIcon
                  className="material-symbols-outlined"
                  onClick={() => handleClickEditBtn(resource.id)}
                >
                  edit
                </UpdateIcon>
                <RemoveIcon
                  className="material-symbols-outlined"
                  onClick={() => handleClickRemoveBtn(resource.id)}
                >
                  delete
                </RemoveIcon>
              </ListButtonDiv>
            </ListItemDiv>
          );
        })}
    </ListDiv>
  );
};
