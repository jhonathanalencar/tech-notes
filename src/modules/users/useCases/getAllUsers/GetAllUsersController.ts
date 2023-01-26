import { Request, Response } from "express";

import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

class GetAllUsersController {
  constructor (private getAllUsersUseCase: GetAllUsersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response>{
    const users = await this.getAllUsersUseCase.execute();

    if(!users){
      return response.status(400).json({ message: 'No users found' });
    }

    return response.status(200).json(users);
  }
}

export { GetAllUsersController }