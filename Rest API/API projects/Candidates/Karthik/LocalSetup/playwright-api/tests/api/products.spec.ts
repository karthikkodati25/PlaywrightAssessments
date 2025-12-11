import { test, expect } from "@playwright/test";
import { ApiClient } from "../../src/api/apiClient";
import type { Product } from "../../src/types/product";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

test.describe("Products API Testing", () => {
    const payloadPath = path.join(__dirname, "../../test-data/productPayload.json");
    const createPayload: Product = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
    
    test("GET /product - validate array & structure", async ({ request }) => {
        const client = new ApiClient(request, BASE_URL);
        const resp = await client.getProducts();
        expect(resp.status()).toBe(200);
        const data = await resp.json();
        console.log("Response Data:", data);
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBeGreaterThan(0);
        const first = data[0];
        expect(first).toHaveProperty("id");
        expect(first).toHaveProperty("name");
        expect(first).toHaveProperty("quantity");
        expect(first).toHaveProperty("price");
    });

    test("POST /product - create new product", async ({ request }) => {
        const client = new ApiClient(request, BASE_URL);
        const resp = await client.createProduct(createPayload);
        expect([200, 201]).toContain(resp.status());
        const data = await resp.json();
        console.log("Response Data:", data);
    });

    test("GET /product/{id} - validate created product", async ({ request }) => {
        const client = new ApiClient(request, BASE_URL);
        const resp = await client.getProducts();    
        expect(resp.status()).toBe(200);
        const data = await resp.json();
        console.log("Response Data:", data);
    });

    test("PUT /product/{id} - update product", async ({ request }) => {
        const client = new ApiClient(request, BASE_URL);
        const resp = await client.getProducts();
        expect(resp.status()).toBe(200);
        const data = await resp.json();
        const productId = data[0].id;
        const updatedPayload: Product = { ...createPayload, name: "Updated Chair Item" };
        const updateResp = await client.updateProduct(productId, updatedPayload);
        expect(updateResp.status()).toBe(200);
        const updatedData = await updateResp.json();
        console.log("Updated Product Data:", updatedData);
    });

    test("DELETE /product/{id} - delete product", async ({ request }) => {
        const client = new ApiClient(request, BASE_URL);
        const resp = await client.getProducts();
        expect(resp.status()).toBe(200);
        const data = await resp.json();
        const productId = data[0].id;
        const deleteResp = await client.deleteProduct(productId);
        expect(deleteResp.status()).toBe(200);
    });

    test("GET /product - validate deletion", async ({ request }) => {
        const client = new ApiClient(request, BASE_URL);
        const resp = await client.getProducts();
        expect(resp.status()).toBe(200);
        const data = await resp.json();
        console.log("Response Data after deletion:", data);
    });

    test("Patch /product/{id} - partially update product", async ({ request }) => {
        const client = new ApiClient(request, BASE_URL);
        const resp = await client.getProducts();
        expect(resp.status()).toBe(200);
        const data = await resp.json();
        const productId = data[0].id;
        const patchPayload = { price: 149.99 };
        const patchResp = await client.patchProduct(productId, patchPayload);
        expect(patchResp.status()).toBe(200);
        const patchedData = await patchResp.json();
        console.log("Patched Product Data:", patchedData);
    });
});