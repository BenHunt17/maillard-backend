import { Router } from "express";
import { ingredientsServiceSearch } from "../../application/ingredients/ingredientService";

export const ingredientsRouter = Router();

ingredientsRouter.post("/search", async (req, res) => {
  const { searchTerm, offset, limit } = req.body;

  const ingredients = await ingredientsServiceSearch(searchTerm, offset, limit);
  res.json({ ingredients });
});
