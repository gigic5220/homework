import { rest } from "msw";
import { Resource } from "@/types/resource";

const getResourceList = () => {
  return localStorage.getItem("resourceList")
    ? JSON.parse(localStorage.getItem("resourceList") || "")
    : [];
};

const setResourceList = (resourceList: Resource[]) => {
  localStorage.setItem("resourceList", JSON.stringify(resourceList));
};

export const handlers = [
  rest.get("/api/v1/resource", (req, res, ctx) => {
    const resourceList: Resource[] = getResourceList();
    return res(ctx.status(200), ctx.json(resourceList));
  }),
  rest.post("/api/v1/resource", async (req, res, ctx) => {
    const reqParam = await req.json();
    //등록 성공확률 80%
    const percentage = Math.random();
    const isSuccess = percentage < 0.8;
    //300ms~1000ms random delay
    const randomDelay = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    //성공
    if (isSuccess) {
      let resourceList: Resource[] = getResourceList();
      let lastId =
        resourceList.length > 0 ? resourceList[resourceList.length - 1].id : 0;
      if (reqParam.length > 0) {
        const mappedReqParam = reqParam.map((m: Resource, index: number) => {
          return {
            ...m,
            id: lastId + (index + 1),
          };
        });
        resourceList = [...resourceList, ...mappedReqParam];
      } else {
        reqParam.id = lastId + 1;
        resourceList.push(reqParam);
      }
      setResourceList(resourceList);
    }
    return res(
      ctx.status(isSuccess ? 200 : 500),
      ctx.delay(randomDelay),
      ctx.json({ message: isSuccess ? "success" : "error" })
    );
  }),
  rest.put("/api/v1/resource", async (req, res, ctx) => {
    const reqParam = await req.json();
    const resourceList: Resource[] = getResourceList();

    const mappedResourceList = resourceList.map((resource: Resource) => {
      return {
        ...resource,
        name: resource.id === reqParam.id ? reqParam.name : resource.name,
      };
    });

    setResourceList(mappedResourceList);

    return res(ctx.json({ message: "success" }));
  }),
  rest.delete("/api/v1/resource/:id", (req, res, ctx) => {
    const { id } = req.params;
    const resourceList: Resource[] = getResourceList();
    const filteredResourceList = resourceList.filter((resource: Resource) => {
      return resource.id !== Number(id);
    });

    setResourceList(filteredResourceList);
    return res(ctx.json([]));
  }),
];
