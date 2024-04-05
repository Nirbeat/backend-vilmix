import { Router, json, urlencoded } from "express";
import UserManager from "../dao/UserManager.js";
import { authToken, generateToken } from "../functions/jwt.js";

const router = Router();

router.use(json());
router.use(urlencoded({extended: true}))

router.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;
        
        const user = await new UserManager().logIn(email, password);


        // console.log(req.body)
        const token = generateToken(user);
        console.log(token)
        // //ESTE TOKEN SE GUARDA EN LOCALSTORAGE
        res.json({jwt:token});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

router.post('/register', async (req, res) => {

    const {email, password, role} = req.body;
    try {
        await new UserManager().signIn(email, password, role);

    } catch (error) {
        res.json({error: error.message});
    }
});


router.get('/admin', (req, res) => {
    try {
        if(req.user.role == 'admin'){
            res.json({message: 'sos el admin'})
        }else{
            throw new Error('sin acceso')
        }
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/axios', (req, res) => {
    res.json({data: "conectado con axios"})
})

// ACÁ SOLO TE FALTABA AUTHTOKEN
//NO SÉ DONDE HABRÁ QUEDADO PUESTO EN LO QUE TE PASÉ, PERO ACORDATE QUE LO PUSE EN UN LUGAR
//IRRELEVANTE PORQUE SOLO QUERÍA QUE ANDE, HABRÍA QUE VER EL ASUNTO DE CÓMO GESTIONAR EL MIDDLEWARE
router.get('/profile', authToken, async (req, res) => {
    try {

        if (!req.user) {
            throw new Error('Usuario no autenticado');
        }

        // ACÁ VAS A TENER QUE VER QUE ONDA EL NOMBRE DE TUS COLUMNAS, EN MI CASO ERA USER_ID
        const userId = req.user.user_id;

        const userManager = new UserManager();
        const userProfile = await userManager.getUserProfile(userId);


        res.json(userProfile);

    } catch (error) {

        res.status(401).json({ error: error.message });
    }
})
export default router;