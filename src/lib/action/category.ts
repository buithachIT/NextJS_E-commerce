import { cache } from "react";
import { apiPath } from "../api/utils";

// Get categories
export const getCategory = cache(async () => {
    try {
        const res = await fetch(apiPath(`/v1/category/`));
        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
        const json = await res.json();
        return { data: json.data };
    } catch (error) {
        console.error('[getCategory] Error:', error);
        return { data: [] };
    }
});


