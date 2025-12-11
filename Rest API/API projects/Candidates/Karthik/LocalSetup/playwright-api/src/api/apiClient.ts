import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { Product } from "../types/product";
const headers = { "Content-Type": "application/json" };
export class ApiClient {
    private request: APIRequestContext;
    private baseUrl: string;
    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl.replace(/\/$/, "");
    }
    getProducts(): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/product`);
    }
    getProductById(id: number): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/product/${id}`);
    }
    createProduct(payload: Product): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/product`, {
            headers,
            data: payload
        });
    }
    updateProduct(id: number, payload: Product): Promise<APIResponse> {
        return this.request.put(`${this.baseUrl}/product/${id}`, {
            headers,
            data: payload
        });
    }
    deleteProduct(id: number): Promise<APIResponse> {
        return this.request.delete(`${this.baseUrl}/product/${id}`);
    }

    patchProduct(id: number, payload: Partial<Product>): Promise<APIResponse> {
        return this.request.patch(`${this.baseUrl}/product/${id}`, {
            headers,
            data: payload
        });
    }
}

export default ApiClient;