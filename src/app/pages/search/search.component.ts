import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dbFetchDataService: DbFetchDataService) {}

  urlData: { search: string[] };

  // products: Product[];

  products = [];
  productsData;
  categories: Category[];
  category;

  ngOnInit(): void {
    for(let i = 0; i< 8 ; i++){
      this.products.push({title: "iPhone 12 Pro Max", cut:-40, img: 'https://s1.flanco.ro/catalog/product/cache/368/image/400x400/9df78eab33525d08d6e5fb8d27136e95/1/4/143545_2_1.jpg', price: 999})
      this.products.push({title: "iPhone 12 Pro Max", img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSYyf_q2kgES_sP7wJVVdmv27TY3xa2lJSrcQ6TUBQk10ORSyLDtHre_Ig4wvI&usqp=CAc', price: 999})
    }
    console.log(this.products);
    // this.urlData = {
    //   search: this.route.snapshot.params['search'].split('-'),
    // };

    // this.searchResult(this.urlData.search);
  }

  searchResult(search: string[]) {
    this.categories = [];
    this.products = [];
    this.dbFetchDataService.fetchCategories().subscribe((categories) => {
      this.category = categories;
      for (let category of categories) {
        this.getProducts(category.name, search);
      }
    });
  }

  getProducts(cat: string, search: string[]) {
    this.dbFetchDataService.fetchProductsByCategory(cat).subscribe((products) => {
      for (let product of products) {
        for (let word of search) {
          if(word != '') {
            word = word.toLowerCase();
            product.title = product.title.toLowerCase();
            if (product.title.includes(word)) {
              this.products.push(product);
              break;
            }
            product.description = product.description.toLowerCase();
            if (product.description.includes(word)) {
              this.products.push(product);
              break;
            }
            for(let tag of product.tags){
              tag = tag.toLowerCase();
              if(tag === word){
                this.products.push(product);
                break
              }
            }
          }
        }
      }
      return this.products;
    });
  }
}
