import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

export const itemsRouter = express.Router();

itemsRouter.get('/', async(request: Request, response: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();

        response.json(items);
    } catch (error) {
        response.status(500).json(error);
    }
}) ;

itemsRouter.get('/:id', async(request: Request, response:Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        const item: Item = await ItemService.find(id);
        if(item) {
            return response.status(200).json(item);
        }

        response.status(404).send('item not found');
    } catch (error) {
        response.status(500).send(error);
    }
});

itemsRouter.post('/', async(request: Request, response: Response) => {
    try {
        const item: BaseItem = request.body;

        const newItem = await ItemService.create(item);

        response.status(201).json(newItem);
    } catch (error) {
        response.status(500).send(error);
    }
});

itemsRouter.put('/:id', async(request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10);

    try {
        const itemUpdate: Item = request.body;

        const existingItem = await ItemService.find(id);

        if (existingItem) {
            const updatedItem = await ItemService.update(id, itemUpdate);
            return response.status(200).json(updatedItem);
        }
      
        const newItem = await ItemService.create(itemUpdate);
    
        response.status(201).json(newItem);
    } catch (error) {
        response.status(500).send(error);
    }
});

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ItemService.remove(id);
  
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error);
    }
});
