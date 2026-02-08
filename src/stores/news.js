import { defineStore } from 'pinia';
import { ref } from 'vue';
import NewsService from '@/service/news';

export const useNewsStore = defineStore('news', () => {
    const trendingTopics = ref([]);
    const isLoading = ref(false);

    const fetchTrendingTopics = async () => {
        // If we already have topics, don't refetch immediately unless forced (logic can be added if needed)
        if (trendingTopics.value.length > 0) return;

        isLoading.value = true;
        try {
            const res = await NewsService.getTags();
            if (res.success) {
                trendingTopics.value = res.data;
            }
        } catch (error) {
            console.error("Failed to fetch trending topics:", error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        trendingTopics,
        isLoading,
        fetchTrendingTopics
    };
});
