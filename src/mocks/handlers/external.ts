import { CATEGORY, PRODUCT_MOCK } from '../datas/product';
import { http, HttpResponse } from 'msw';
import { apiPath } from '../../lib/api/utils';
import { CUSTOMER_REVIEWS } from '../datas/rating';
import { CART_MOCK } from '../datas/cart';
import { CUSTOMER_REVIEWS_BY_PRODUCT } from '../datas/ratingByProduct';
export const EXTERNAL_HANDLERS = [
  http.get(apiPath('/v1/product/search'), async ({ request }) => {
    console.log('MSW request:', request);
    const url = new URL(request.url);
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const orderBy = url.searchParams.get('orderBy') || 'desc';

    const sortedProducts = [...PRODUCT_MOCK];

    if (sortBy === 'sold') {
      sortedProducts.sort((a, b) => {
        return orderBy === 'desc' ? b.sold - a.sold : a.sold - b.sold;
      });
    }
    return HttpResponse.json({ data: sortedProducts });
  }),
  //Mock api reviewer
  http.get(apiPath('/v1/reviews'), async () => {
    return HttpResponse.json({ data: CUSTOMER_REVIEWS });
  }),

  //Mock api reviewer by productId
  http.get(apiPath('/v1/reviews/product/:productId'), async ({ params }) => {
    const { productId } = params;
    const productReviews = CUSTOMER_REVIEWS_BY_PRODUCT.filter(
      (review) => review.productId === productId
    );
    return HttpResponse.json({ data: productReviews });
  }),

  //Mock api cart
  http.get(apiPath('/v1/cart'), async () => {
    return HttpResponse.json({ data: CART_MOCK });
  }),

  http.get(apiPath('/v1/category'), async () => {
    return HttpResponse.json({ data: CATEGORY });
  }),
  //get product by id
  http.get(apiPath('/v1/product/:id'), async ({ params }) => {
    const { id } = params;

    const product = PRODUCT_MOCK.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ data: product });
  }),

  http.get(apiPath('/v1/product'), async ({ request }) => {
    const url = new URL(request.url);

    const categoryId = url.searchParams.get('categoryId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '8');
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const orderBy = url.searchParams.get('orderBy') || 'desc';

    let filteredProducts = PRODUCT_MOCK;

    // Lọc theo category
    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryId === categoryId
      );
    }

    // Sắp xếp
    filteredProducts.sort((a, b) => {
      const valueA = a[sortBy as keyof typeof a];
      const valueB = b[sortBy as keyof typeof b];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return orderBy === 'desc' ? valueB - valueA : valueA - valueB;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return orderBy === 'desc'
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }

      return 0;
    });

    // Phân trang
    const start = (page - 1) * limit;
    const paginated = filteredProducts.slice(start, start + limit);

    return HttpResponse.json({
      data: paginated,
      meta: {
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    });
  })
];
