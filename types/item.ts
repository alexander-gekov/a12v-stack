export interface Item {
  id: string;
  name: string;
  description: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export type CreateItemDTO = Pick<Item, "name" | "description" | "status">;
export type UpdateItemDTO = Partial<CreateItemDTO>;
