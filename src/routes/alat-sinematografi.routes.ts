import { Router } from "express";
import {
  getAlatSinematografi,
  postAlatSinematografi,
  putAlatSinematografi,
  deleteAlatSinematografi,
} from "../controllers/alat-sinematografi.controller.js";

const alatSinematografiRouter = Router();

alatSinematografiRouter.get("/", getAlatSinematografi);
alatSinematografiRouter.post("/", postAlatSinematografi);
alatSinematografiRouter.put("/:id", putAlatSinematografi);
alatSinematografiRouter.delete("/:id", deleteAlatSinematografi);

export default alatSinematografiRouter;
