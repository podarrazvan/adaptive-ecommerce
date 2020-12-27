import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // times = new Array(5);

  // shortDescription = "iPhone 12 Pro Max. 5G to download huge files on the go and stream HDR video.1 Larger 6.7-inch Super Retina XDR display.2 Ceramic Shield with four times better drop performance.3 Incredible low-light photography with the best Pro camera system on an iPhone, and 5x optical zoom range. Cinema-grade Dolby Vision video recording, editing and playback. Night mode portraits and next-level AR experiences with the LiDAR Scanner. Powerful A14 Bionic chip. And new MagSafe accessories for easy attachment and faster wireless charging.4 For infinitely spectacular possibilities.";
  // description = "The new iPhone 12 Pro Max is Apple’s flagship device in the lineup featuring a triple-lens camera system with LiDAR, Portrait and Night modes, as well as a front-facing TrueDepth camera capable of capturing video in stunning 4K resolution. The iPhone 12 Pro Max also features Apple’s A14 processor, which is the fastest smartphone chip in the world. Oh, and how could we forget 5G connectivity, which brings ultra-fast, low-latency cellular data speeds across the entire iPhone lineup. Its screen size has also increased over its predecessor thanks to new, smaller bezels. Ceramic Shield has also been introduced, which provides 4x better drop-protection than last year’s model. There’s so much to love about the new iPhone 12 Pro Max that we’re going to give one away to an iDrop News reader absolutely free. Entering is easy. Use the giveaway tool below to earn your chances to win an unlocked iPhone 12 Pro Max (128GB). Just by signing up for our weekly newsletter, you’ll automatically earn one entry to win. You can increase your chances of winning the iPhone 12 Pro Max by completing additional actions as shown within the giveaway tool. No purchase necessary."
  
  // img = ["https://p1.akcdn.net/full/731721861.apple-iphone-12-pro-max-128gb.jpg",
  //       "https://azcd.harveynorman.com.au/media/catalog/product/1/_/1_60_624.jpg",
  //       "https://lcdn.altex.ro/resize/media/catalog/product/A/P/2bd48d28d1c32adea0e55139a4e6434a/APPLE-iPhone-12-Pro-5G-Gold.jpg",
  //       "https://lcdn.altex.ro/resize/media/catalog/product/A/P/2bd48d28d1c32adea0e55139a4e6434a/APPLE-iPhone-12-Pro-5G-Gold_4.jpg"];

  // product = {price: 999, title: "Iphone 12 Pro Max", quantity:10, rating:4.5, img: this.img, shortDescription: this.shortDescription, desciption: this.description, availability: true, brand:"https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo-700x394.png", id:120, models: ['Blue','Black','Red'],category: 'phones'};
  // recommendedProduct = {title: "Iphone 12 Pro Max", rating:4.5, img: this.img[0]};

  product;
  loading = true;

  constructor(private dbFetchDataService:DbFetchDataService,
              private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const key =  this.route.snapshot.params['key'];
    this.dbFetchDataService.fetchProduct(key).subscribe((productData) => {
      this.product = productData.product[0];
      this.loading = false;
    });
  }

}
