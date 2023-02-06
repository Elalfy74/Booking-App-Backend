// import { Router } from "express";

// import { isAdmin, isAuth, validator } from "../middlewares";

// import * as RoomCategoryController from "../controllers/room-category";
// import {
//   addRoomCategorySchema,
//   updateRoomCategorySchema,
// } from "../models/room-category/room-category-validation";

// const router = Router();

// // GET
// // api/room-categories
// router.get("/", [isAuth, isAdmin], RoomCategoryController.getAllRoomCategories);

// // GET
// // api/room-categories/:id
// router.get("/:id", RoomCategoryController.getRoomCategory);

// // POST
// // api/room-categories
// router.post(
//   "/",
//   [isAuth, isAdmin, validator(addRoomCategorySchema)],
//   RoomCategoryController.addRoomCategory
// );

// // PATCH
// // api/room-categories/:id
// router.patch(
//   "/:id",
//   [isAuth, isAdmin, validator(updateRoomCategorySchema)],
//   RoomCategoryController.updateRoomCategory
// );

// // DELETE
// // api/room-categories
// router.delete(
//   "/:id",
//   [isAuth, isAdmin],
//   RoomCategoryController.deleteRoomCategory
// );

// export default router;
