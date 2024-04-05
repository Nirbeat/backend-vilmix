import { Router } from "express";
import { authToken } from "../functions/jwt.js";

const router = Router();

router.get('/current', (req, res) =>{

    res.json(req.user)
})

export default router;