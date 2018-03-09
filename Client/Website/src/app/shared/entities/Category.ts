export class Category {
  id: string;
  name: string;
  isSelect: boolean;
  constructor(id:string, name:string) {
    this.id = id;
    this.name = name;
  }



  public static toCategories(data:any){
    // let jsonData = JSON.parse(data); We don't need to parse this

    let categories: Array<Category> = new Array<Category>();

    data.forEach(element => {
      categories.push(new Category(element.id, element.name));
    });

    return categories;
  }
}
