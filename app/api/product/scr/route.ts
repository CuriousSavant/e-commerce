import axios from "axios";
import cheerio from "cheerio";
import prisma from "@/lib/prisma";

const urls: string[] = [
  "https://www.bnn.in.th/th/p/apple/apple-mac/apple-macbook-air/apple-macbook-air-15-m3-chip-8c-cpu10c-gpu8gb512gb-space-gray-2024-mryn3tha_dmx5ev?ref=search-result",
  "https://www.bnn.in.th/th/p/tablet-and-accessories/tablet/samsung-tablet/samsung-galaxy-tab-a9-lte-8128gb-silver-8806095279398_zpy7lw?ref=21-dec-2024",
  "https://www.bnn.in.th/th/p/apple/apple-iphone/apple-iphone-12-series/apple-iphone-12-128gb-green-194252032633_r01n6d?ref=best-seller",
];

// Interface สำหรับข้อมูลสินค้า
interface Product {
  title: string;
  description: string;
  image: string[];
  price: number;
  stock: number;
  brand: string;
  features: string[];
}

async function ScrapeProduct(url: string): Promise<Product | null> {
  try {
    // Fetch HTML
    const { data } = await axios.get(url);
    // Load HTML
    const $ = cheerio.load(data);

    const product: Product = {
      title: $("h1.page-title").text().trim(),
      description: $(
        "#__layout > div > main > section > section.container.first-container > div.product-detail-summary-container > div:nth-child(1) > div.product-short-description.html-content > p:nth-child(1)"
      )
        .text()
        .trim(),
      image: [],
      price: parseFloat(
        $("div.row.-space-between > div > div.selling-price")
          .text()
          .trim()
          .split("฿")
          .join("")
          .replace(",", "")
      ),
      stock: 20,
      brand: $(".brand-value").text().trim(),
      features: [],
    };

    // Extract features
    $("div.product-short-description.html-content > ul > li").each(
      (index, element) => {
        const featureDescription = $(element).text().trim();
        if (featureDescription) {
          product.features.push(featureDescription);
        }
      }
    );

    // Extract images
    $(
      "#__layout > div > main > section > section.container.first-container > div.product-detail-image-gallery-container img"
    ).each((index, elm) => {
      const imgSrc = $(elm).attr("src");
      if (imgSrc) {
        product.image.push(imgSrc);
      }
    });

    return product;
  } catch (err) {
    console.error(`Error scraping URL: ${url}`, err);
    return null;
  }
}

export async function scrapeAllProducts(): Promise<void> {
  try {
    const products = await Promise.all(urls.map((url) => ScrapeProduct(url)));
    const validProducts = products.filter(
      (product): product is Product => product !== null
    ); // Type guard to filter out null

    // Save to database
    for (let product of validProducts) {
      const createdProduct = await prisma.product.create({
        data: {
          title: product.title,
          description: product.description,
          image: product.image,
          price: product.price,
          stock: product.stock,
          brand: product.brand,
          feature: {
            create: product.features.map((feature) => ({
              desctiption: feature,
            })),
          },
        },
      });

      console.log(`Product created: ${createdProduct.title}`);
    }
  } catch (err) {
    console.error("Error during scraping process:", err);
  }
}