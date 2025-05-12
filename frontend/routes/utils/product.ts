export interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    rating: number;
    reviews: number;
    isFeatured: boolean;
    isOnSale: boolean;
    salePrice: number;
    tags: string[];
    brand: string;
}

export const items: Item[] = [
    {
        id: "1",
        name: "Item 1",
        description: "Description for Item 1",
        price: 19.99,
        imageUrl: "https://via.placeholder.com/150",
        category: "Category 1",
        stock: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 4.5,
        reviews: 10,
        isFeatured: true,
        isOnSale: false,
        salePrice: 0,
        tags: ["tag1", "tag2"],
        brand: "Brand A",
    },
    {
        id: "2",
        name: "Item 2",
        description: "Description for Item 2",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        category: "Category 2",
        stock: 50,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 4.0,
        reviews: 5,
        isFeatured: false,
        isOnSale: true,
        salePrice: 19.99,
        tags: ["tag3", "tag4"],
        brand: "Brand B",
    },
    {
        id: "3",
        name: "Item 3",
        description: "Description for Item 3",
        price: 39.99,
        imageUrl: "https://via.placeholder.com/150",
        category: "Category 3",
        stock: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 3.5,
        reviews: 20,
        isFeatured: true,
        isOnSale: false,
        salePrice: 0,
        tags: ["tag5", "tag6"],
        brand: "Brand C",
    },
]