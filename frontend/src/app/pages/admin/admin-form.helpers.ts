import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/interfaces/product.interface';

const fb: FormBuilder = new FormBuilder();

export const buildProductFormGroup = () => {
  return fb.group({
    product: fb.group({
      title: fb.control(null),
      category: fb.control(null),
      brand: fb.control(null),
      price: fb.control(null),
      images: fb.control(null),
      description: fb.control(null),
      tags: fb.control(null),
      quantity: fb.control(null),
      minPrice: fb.control(null),
      salesWeekTarget: fb.control(null),
    }),
  });
};

export function mapProducts(formArray, products: Product[] = []) {
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
