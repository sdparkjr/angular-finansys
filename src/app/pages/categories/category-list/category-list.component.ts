import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../shared/category.service";
import { Category } from "../shared/category.model";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private _catServ: CategoryService) {}

  ngOnInit() {
    this._catServ
      .getAll()
      .subscribe(
        valor => (this.categories = valor),
        error => alert("Erro ao consultar")
      );
  }

  deleteCategory(categoria: Category): void {
    const deveDeletar = confirm("Deseja realmenta deletar");

    if (deveDeletar) {
      this._catServ.delete(categoria.id).subscribe(() => {
        this.categories = this.categories.filter(valor => valor != categoria); //assim podemos retira da lista
      });
    }
  }
}
