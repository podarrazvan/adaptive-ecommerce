import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

const fb: FormBuilder = new FormBuilder();

export const buildProductFormGroup = () => {
  return fb.group({
    product: fb.group({
      title: fb.control('', Validators.required),
      category: fb.control('', Validators.required),
      brand: fb.control('', Validators.required),
      price: fb.control('', Validators.required),
      images: fb.control('', Validators.required),
      thumbnail: fb.control('', Validators.required),
      mainImg: fb.control('', Validators.required),
      description: fb.control('', Validators.required),
      tags: fb.control('', Validators.required),
      quantity: fb.control('', Validators.required),
      minPrice: fb.control(''),
      salesWeekTarget: fb.control(''),
      productModels: fb.control(''),
    }),
  });
};

export function mapProducts(formArray, products: IProduct[] = []) {
  formArray.clear();
  products.forEach((p) => {
    formArray.push(
      fb.group({
        title: p.title,
        category: p.category,
        brand: p.brand,
        price: p.price,
        images: p.images,
        description: p.description,
        tags: p.tags,
        quantity: p.quantity,
        minPrice: p.minPrice,
        salesWeekTarget: p.salesWeekTarget,
      })
    );
  });
}
