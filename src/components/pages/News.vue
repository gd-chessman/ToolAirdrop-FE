<template>
    <div class="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <header class="pt-24 pb-8 px-6 relative overflow-hidden">
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] -z-10">
            </div>

            <div class="max-w-7xl mx-auto">
                <h1 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    <span class="text-white">Crypto </span>
                    <span class="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        News
                    </span>
                </h1>
                <p class="text-lg text-slate-400 max-w-3xl leading-relaxed mb-8">
                    Cập nhật tin tức mới nhất về tiền điện tử, phân tích thị trường và công nghệ blockchain.
                </p>

                <!-- Trending Topics -->
                <div class="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    <span class="text-orange-500 font-bold flex items-center gap-1 min-w-fit">
                        <i class="pi pi-bolt"></i> Xu hướng:
                    </span>
                    <button v-for="topic in trendingTopics" :key="topic" @click="selectTag(topic)"
                        class="px-4 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap"
                        :class="selectedTag === topic ? 'bg-cyan-500 text-[#020617] border-cyan-500 font-bold' : 'bg-[#1e293b] border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-[#0f172a]'">
                        #{{ topic }}
                    </button>
                </div>
            </div>
        </header>

        <main class="px-6 pb-20">
            <div class="max-w-7xl mx-auto space-y-12">

                <!-- Featured Stories -->
                <section>
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-white">Tin nổi bật</h2>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <template v-if="isLoading">
                            <div v-for="n in 2" :key="n"
                                class="relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#0f172a] animate-pulse border border-white/5">
                                <div class="absolute inset-0 bg-slate-800/50"></div>
                                <div class="absolute bottom-0 left-0 p-8 w-full z-10">
                                    <div class="flex items-center gap-3 mb-3">
                                        <div class="h-6 w-20 bg-slate-700/50 rounded"></div>
                                        <div class="h-6 w-24 bg-slate-700/50 rounded"></div>
                                    </div>
                                    <div class="h-8 w-3/4 bg-slate-700/50 rounded mb-3"></div>
                                    <div class="h-4 w-full bg-slate-700/50 rounded mb-2"></div>
                                    <div class="h-4 w-2/3 bg-slate-700/50 rounded mb-4"></div>
                                    <div class="flex gap-4">
                                        <div class="h-4 w-16 bg-slate-700/50 rounded"></div>
                                        <div class="h-4 w-16 bg-slate-700/50 rounded"></div>
                                        <div class="h-4 w-16 bg-slate-700/50 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <article v-else v-for="story in featuredStories" :key="story.id"
                            @click="navigateToDetail(story.id || story._id)"
                            class="relative group rounded-3xl overflow-hidden aspect-[16/9] cursor-pointer">
                            <img :src="story.image" loading="lazy"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent">
                            </div>

                            <div class="absolute bottom-0 left-0 p-8 w-full">
                                <div class="flex items-center gap-3 mb-3">
                                    <span
                                        class="px-3 py-1 rounded bg-cyan-500 text-[#020617] text-xs font-bold uppercase tracking-wider">
                                        {{ story.category }}
                                    </span>
                                    <span v-if="story.isTrending"
                                        class="flex items-center gap-1 text-orange-400 text-xs font-bold uppercase tracking-wider">
                                        <i class="pi pi-bolt text-[10px]"></i> Trending
                                    </span>
                                </div>

                                <h3
                                    class="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                                    {{ story.title }}
                                </h3>
                                <p class="text-slate-300 text-sm line-clamp-2 mb-4 md:w-3/4">
                                    {{ story.excerpt }}
                                </p>

                                <div class="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                    <div class="flex items-center gap-1">
                                        <i class="pi pi-clock text-[10px]"></i> {{ story.readTime }}
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <i class="pi pi-calendar text-[10px]"></i> {{ story.date }}
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <i class="pi pi-eye text-[10px]"></i> {{ story.views }}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <div class="flex flex-col lg:flex-row gap-8">

                    <!-- Sidebar Filters -->
                    <aside class="w-full lg:w-72 shrink-0">
                        <div class="bg-[#0f172a] border border-white/5 rounded-3xl p-6 sticky top-24">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-lg font-bold text-white">Bộ lọc</h3>
                            </div>

                            <div class="mb-6 p-4 bg-[#1e293b] rounded-xl border border-white/5 text-center">
                                <span class="block text-3xl font-bold text-cyan-400 mb-1">{{ totalNews }}</span>
                                <span class="text-xs text-slate-400 uppercase tracking-widest font-bold">Bài viết</span>
                            </div>

                            <!-- Categories -->
                            <div class="mb-8">
                                <h4 class="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Danh mục</h4>
                                <div class="space-y-3">
                                    <label v-for="cat in categories" :key="cat.name"
                                        class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative flex items-center justify-center w-5 h-5">
                                            <input type="checkbox" v-model="selectedCategories" :value="cat.name"
                                                class="peer appearance-none w-5 h-5 border border-slate-600 rounded bg-[#020617] checked:bg-cyan-500 checked:border-cyan-500 transition-all" />
                                            <i
                                                class="pi pi-check text-[10px] text-[#020617] absolute opacity-0 peer-checked:opacity-100 pointer-events-none"></i>
                                        </div>
                                        <span class="text-sm text-slate-400 group-hover:text-white transition-colors">{{
                                            cat.name }}</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Time Range -->
                            <div class="mb-8">
                                <h4 class="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Thời gian
                                </h4>
                                <div class="space-y-3">
                                    <label v-for="time in timeRanges" :key="time.value"
                                        class="flex items-center gap-3 cursor-pointer group">
                                        <div class="relative flex items-center justify-center w-5 h-5">
                                            <input type="radio" v-model="selectedTimeRange" :value="time.value"
                                                name="timeRange"
                                                class="peer appearance-none w-5 h-5 border border-slate-600 rounded-full bg-[#020617] checked:border-cyan-500 transition-all" />
                                            <div
                                                class="w-2.5 h-2.5 rounded-full bg-cyan-500 absolute scale-0 peer-checked:scale-100 transition-transform pointer-events-none">
                                            </div>
                                        </div>
                                        <span class="text-sm text-slate-400 group-hover:text-white transition-colors">{{
                                            time.label }}</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Sort -->
                            <div class="mb-8">
                                <h4 class="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Sắp xếp</h4>
                                <div class="relative">
                                    <select v-model="sortBy"
                                        class="w-full bg-[#020617] border border-slate-700 text-slate-300 text-sm rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer">
                                        <option value="latest">Mới nhất</option>
                                        <option value="popular">Phổ biến nhất</option>
                                        <option value="oldest">Cũ nhất</option>
                                    </select>
                                    <i
                                        class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs"></i>
                                </div>
                            </div>

                            <!-- Newsletter -->
                            <div
                                class="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl p-5 border border-cyan-500/20">
                                <div class="flex items-center gap-2 mb-3">
                                    <i class="pi pi-bell text-cyan-400"></i>
                                    <span class="text-sm font-bold text-white">Đừng bỏ lỡ</span>
                                </div>
                                <p class="text-xs text-slate-400 mb-4 leading-relaxed">Nhận tin tức nóng hổi được gửi
                                    trực tiếp đến hộp thư của bạn.</p>
                            </div>

                        </div>
                    </aside>

                    <!-- Main News List -->
                    <div class="flex-1">
                        <!-- Search Bar -->
                        <div class="mb-8 relative group">
                            <i
                                class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 group-focus-within:text-cyan-400 transition-colors"></i>
                            <input v-model="searchQuery" type="text" placeholder="Tìm kiếm bài viết..."
                                class="w-full bg-[#0f172a] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
                        </div>

                        <div class="flex items-center justify-between mb-6">
                            <span class="text-sm text-slate-400">Hiển thị {{ newsList.length }} / {{ totalNews }} bài
                                viết</span>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <template v-if="isLoading">
                                <div v-for="n in 6" :key="n"
                                    class="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden animate-pulse flex flex-col h-full">
                                    <div class="h-48 bg-slate-800/50"></div>
                                    <div class="p-6 flex flex-col flex-1">
                                        <div class="h-6 bg-slate-800/50 rounded mb-3 w-3/4"></div>
                                        <div class="h-4 bg-slate-800/50 rounded mb-2"></div>
                                        <div class="h-4 bg-slate-800/50 rounded mb-4 w-1/2"></div>
                                        <div class="flex gap-2 mb-6">
                                            <div class="h-5 w-12 bg-slate-800/50 rounded"></div>
                                            <div class="h-5 w-12 bg-slate-800/50 rounded"></div>
                                        </div>
                                        <div class="mt-auto flex justify-between pt-4 border-t border-white/5">
                                            <div class="h-3 w-20 bg-slate-800/50 rounded"></div>
                                            <div class="h-3 w-16 bg-slate-800/50 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <article v-else v-for="news in newsList" :key="news.id"
                                @click="navigateToDetail(news.id || news._id)"
                                class="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all group hover:-translate-y-1 duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-cyan-900/10 cursor-pointer">
                                <div class="relative h-48 overflow-hidden">
                                    <img :src="news.image" loading="lazy"
                                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div class="absolute top-4 left-4">
                                        <span
                                            class="px-2.5 py-1 rounded-lg bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide border border-blue-400/20">
                                            {{ news.category }}
                                        </span>
                                    </div>
                                </div>

                                <div class="p-6 flex flex-col flex-1">
                                    <h3
                                        class="text-lg font-bold text-white mb-3 leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                                        {{ news.title }}
                                    </h3>
                                    <p class="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                                        {{ news.excerpt }}
                                    </p>

                                    <div class="flex flex-wrap gap-2 mb-6">
                                        <span v-for="tag in news.tags" :key="tag"
                                            class="px-2 py-1 bg-[#1e293b] text-slate-400 text-[10px] rounded border border-white/5">
                                            #{{ tag }}
                                        </span>
                                    </div>

                                    <div class="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                        <div class="flex items-center gap-2">
                                            <i class="pi pi-calendar text-cyan-400 text-[10px]"></i>
                                            <span class="text-[10px] text-slate-400">{{ news.date }}</span>
                                        </div>
                                        <span class="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                            <i class="pi pi-clock text-cyan-400 text-[9px]"></i> {{ news.readTime }}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <!-- Pagination -->
                        <div class="mt-12 flex justify-center gap-2" v-if="totalPages > 1">
                            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                                class="w-10 h-10 rounded-xl bg-[#0f172a] border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="pi pi-chevron-left text-xs"></i>
                            </button>

                            <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                                :class="page === currentPage ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/20' : 'bg-[#0f172a] border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/50'"
                                class="w-10 h-10 rounded-xl flex items-center justify-center transition-all">
                                {{ page }}
                            </button>

                            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                                class="w-10 h-10 rounded-xl bg-[#0f172a] border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="pi pi-chevron-right text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import NewsService from '@/service/news';
import CategoryService from '@/service/category';
import { useRouter, useRoute } from 'vue-router';
import Footer from './Footer.vue';

const router = useRouter();
const route = useRoute();
const trendingTopics = ref([]);

const selectedCategories = ref([]);
const categories = ref([]);
const selectedTag = ref(route.query.tag || null);

const selectedTimeRange = ref('all');
const timeRanges = [
    { label: 'Tất cả thời gian', value: 'all' },
    { label: 'Hôm nay', value: 'today' },
    { label: 'Tuần này', value: 'week' },
    { label: 'Tháng này', value: 'month' }
];

const sortBy = ref('latest');
const featuredStories = ref([]);
const newsList = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');

// Pagination
const currentPage = ref(1);
const totalPages = ref(1);
const totalNews = ref(0);
const itemsPerPage = 12;

// Load Data
async function loadData() {
    isLoading.value = true;
    try {
        // Load Featured (Trending)
        const trendingRes = await NewsService.getAll({ isTrending: true, limit: 2 });
        if (trendingRes.success) {
            featuredStories.value = trendingRes.data;
        }

        // Load Trending Topics (Tags)
        const tagsRes = await NewsService.getTags();
        if (tagsRes.success) {
            trendingTopics.value = tagsRes.data;
        }

        // Load Categories
        const catRes = await CategoryService.getAll({ type: 'news' });
        categories.value = catRes || [];

        // Load All News
        await loadNewsList();

    } catch (error) {
        console.error("Failed to load news:", error);
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    }
}

async function loadNewsList() {
    try {
        const query = {
            limit: itemsPerPage,
            page: currentPage.value,
            sort: sortBy.value
        };

        if (searchQuery.value) {
            query.search = searchQuery.value;
        }

        if (selectedCategories.value.length > 0) {
            query.category = selectedCategories.value[0]; // Assuming single category filter for now based on backend
        }

        if (selectedTimeRange.value !== 'all') {
            query.timeRange = selectedTimeRange.value;
        }

        if (selectedTag.value) {
            query.tag = selectedTag.value;
        }

        const res = await NewsService.getAll(query);
        if (res.success) {
            newsList.value = res.data;
            totalNews.value = res.total || 0;
            totalPages.value = res.pages || 1;
        }
    } catch (e) {
        console.error("Failed to load news list", e);
    }
}

const selectTag = (tag) => {
    if (selectedTag.value === tag) {
        selectedTag.value = null; // Toggle off
    } else {
        selectedTag.value = tag;
    }
}

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

const navigateToDetail = (id) => {
    router.push(`/news/${id}`);
}

// Watchers
watch([searchQuery, selectedCategories, sortBy, selectedTimeRange, selectedTag], () => {
    currentPage.value = 1; // Reset to page 1 on filter change
    loadNewsList();
}, { deep: true });

watch(currentPage, () => {
    loadNewsList();
});

watch(() => route.query.tag, (newTag) => {
    selectedTag.value = newTag || null;
});

onMounted(() => {
    loadData();
});
</script>

<style scoped>
/* Hide scrollbar for trending topics */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
