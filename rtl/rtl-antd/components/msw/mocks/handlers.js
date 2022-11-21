import { rest } from "msw";
import mock from "./mock";

export const api = {
  getFolders1: rest.get("http://localhost:4000/api/get-folders", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock.getFolders1));
  }),

  getFolders2: rest.get("http://localhost:4000/api/get-folders", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock.getFolders2));
  }),

  getFoldersError: rest.get("http://localhost:4000/api/get-folders", (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "http error" }));
  }),

  createFolder: rest.get("http://localhost:4000/api/create-folder/d", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock.createFolder));
  }),

  createFolderError: rest.get("http://localhost:4000/api/create-folder/d", (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "http error" }));
  }),

  //   catchUnhandledRoute: () => {
  catchUnhandledRoute: rest.all("*", (req, res, ctx) => {
    console.log(req.url.toString());
    return res(ctx.status(500), ctx.json({ message: "Unhandled route" }));
  }),
};

export const handlers = [
  api.getFolders1,
  api.createFolder,

  // catchUnhandledRoute must be last
  api.catchUnhandledRoute,
];
