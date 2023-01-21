import express, {NextFunction, Request, Response} from 'express';
import user from '../Logic/logicUser';


// generic router 
const routeruser = express.Router();

routeruser.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

routeruser.get("/user/:user_nickname", async (request: Request, response: Response, next: NextFunction) => {
  const user_nickname = +request.params.user_nickname;
  response.status(200).json( await user.getSingleuser(user_nickname))
})

routeruser.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await user.getAllUser())
})

routeruser.post("/add", async (request: Request, response: Response, next: NextFunction) => {
   const body = request.body;
   response.status(201).json( await user.addUser(body))
})

routeruser.post("/login",async (request:Request,response:Response, next: NextFunction) => {
  const body= request.body;
  response.status(200).json(await user.checkPassword(body))
})

routeruser.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(204).json( await user.deleteUser(id))
})


export default routeruser;