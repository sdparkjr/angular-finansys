import { BaseResourceModel } from "../../../shared/models/BaseResourceModel";
export class Category extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string
  ) {
    super();
  }

  static fromJson(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }
}