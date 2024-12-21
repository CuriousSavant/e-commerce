import prisma from "@/lib/prisma";
import slugify from "slugify";

(async () => {
  const products = await prisma.product.findMany();

  for (const product of products) {
    if (!product.slug) {
      const slug = slugify(product.title, { lower: true, strict: true });
      await prisma.product.update({
        where: { id: product.id },
        data: { slug },
      });
    }
  }
})();