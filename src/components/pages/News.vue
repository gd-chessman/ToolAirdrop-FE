<template>
    <div class="news-page min-h-screen text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <!-- Background layers (depth) -->
        <div class="news-page-bg" aria-hidden="true">
            <div class="news-page-bg-base"></div>
            <div class="news-page-bg-orb news-page-bg-orb--1"></div>
            <div class="news-page-bg-orb news-page-bg-orb--2"></div>
            <div class="news-page-bg-orb news-page-bg-orb--3"></div>
            <div class="news-page-bg-orb news-page-bg-orb--4"></div>
            <div class="news-page-bg-vignette"></div>
            <div class="news-page-bg-grain"></div>
        </div>
        <!-- Hero -->
        <header class="news-hero relative pt-28 pb-12 px-4 md:px-6 overflow-hidden">
            <div class="hero-bg absolute inset-0 -z-10">
                <div
                    class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.15),transparent)]">
                </div>
                <div class="absolute top-0 right-0 w-[500px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
                <div class="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-600/5 rounded-full blur-[100px]"></div>
                <div class="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#030712_70%)]"></div>
            </div>
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
                    <span class="text-white">Crypto </span>
                    <span
                        class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">News</span>
                </h1>
                <p class="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                    Stay updated with the latest on cryptocurrency, market analysis, and blockchain technology.
                </p>
            </div>
        </header>

        <main class="px-4 md:px-6 pb-24">
            <div class="max-w-7xl mx-auto">

                <!-- Featured (asymmetric: 1 large + 1 small) -->
                <section v-if="!route.query.tag" class="mb-16 md:mb-24">
                    <div class="flex items-center gap-2 mb-6">
                        <span class="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#1ad609d4]"></span>
                        <h2 class="text-xl font-bold text-white font-inter uppercase tracking-[0.2em]">Featured</h2>
                        <span class="h-px flex-1 bg-gradient-to-l from-transparent to-[#1ad609d4]"></span>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                        <template v-if="isLoading">
                            <div
                                class="lg:col-span-2 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-800/50 animate-pulse border border-white/5">
                            </div>
                            <div
                                class="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-800/50 animate-pulse border border-white/5">
                            </div>
                        </template>
                        <template v-else>
                            <article v-if="featuredStories[0]"
                                @click="navigateToDetail(featuredStories[0].id || featuredStories[0]._id)"
                                class="lg:col-span-2 relative group rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer border border-white/5 hover:border-cyan-500/30 transition-all">
                                <img :src="featuredStories[0].image" loading="lazy"
                                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent">
                                </div>
                                <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <div class="flex items-center gap-3 mb-3">
                                        <span
                                            class="px-2.5 py-1 rounded-lg bg-cyan-500/90 text-[#030712] text-[10px] font-bold uppercase tracking-wider">{{
                                                featuredStories[0].category }}</span>
                                        <span v-if="featuredStories[0].isTrending"
                                            class="flex items-center gap-1 text-amber-400 text-[10px] font-bold uppercase"><i
                                                class="pi pi-bolt"></i> Trending</span>
                                    </div>
                                    <h3
                                        class="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                                        {{ featuredStories[0].title }}</h3>
                                    <p class="text-slate-300 text-sm line-clamp-2 mb-4 max-w-2xl">{{
                                        featuredStories[0].excerpt }}</p>
                                    <div class="flex items-center gap-4 text-xs text-slate-300">
                                        <span><i class="pi pi-clock mr-1"></i>{{ featuredStories[0].readTime }}</span>
                                        <span><i class="pi pi-calendar mr-1"></i>{{ featuredStories[0].date }}</span>
                                        <!-- <span><i class="pi pi-eye mr-1"></i>{{ featuredStories[0].views }}</span> -->
                                    </div>
                                </div>
                            </article>
                            <div class="lg:col-span-1 flex flex-col gap-4">
                                <article v-if="featuredStories[1]"
                                    @click="navigateToDetail(featuredStories[1].id || featuredStories[1]._id)"
                                    class="relative group rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer border border-white/5 hover:border-cyan-500/30 transition-all">
                                    <img :src="featuredStories[1].image" loading="lazy"
                                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent">
                                    </div>
                                    <div class="absolute bottom-0 left-0 right-0 p-5">
                                        <span
                                            class="inline-block px-2 py-0.5 rounded bg-cyan-500/90 text-[#030712] text-[10px] font-bold uppercase mb-2">{{
                                                featuredStories[1].category }}</span>
                                        <h3
                                            class="text-base md:text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">
                                            {{ featuredStories[1].title }}</h3>
                                        <div class="flex items-center gap-3 text-[10px] text-slate-300 mt-2">
                                            <span>{{ featuredStories[1].readTime }}</span>
                                            <span>{{ featuredStories[1].date }}</span>
                                        </div>
                                    </div>
                                </article>
                                <article v-if="featuredStories[2]"
                                    @click="navigateToDetail(featuredStories[2].id || featuredStories[2]._id)"
                                    class="relative group rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer border border-white/5 hover:border-cyan-500/30 transition-all">
                                    <img :src="featuredStories[2].image" loading="lazy"
                                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent">
                                    </div>
                                    <div class="absolute bottom-0 left-0 right-0 p-5">
                                        <span
                                            class="inline-block px-2 py-0.5 rounded bg-cyan-500/90 text-[#030712] text-[10px] font-bold uppercase mb-2">{{
                                                featuredStories[2].category }}</span>
                                        <h3
                                            class="text-base md:text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">
                                            {{ featuredStories[2].title }}</h3>
                                        <div class="flex items-center gap-3 text-[10px] text-slate-500 mt-2">
                                            <span>{{ featuredStories[2].readTime }}</span>
                                            <span>{{ featuredStories[2].date }}</span>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </template>
                    </div>
                </section>
                <div class="flex items-center justify-center w-full gap-4 mb-6">
                    <!-- Search in Hero -->
                    <div class="relative group flex-1 max-w-xl">
                        <i
                            class="pi pi-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors text-base"></i>
                        <input v-model="searchQuery" type="text" placeholder="Search articles, topics..."
                            class="w-full bg-slate-900/80 border border-white/10 rounded-2xl pl-6 pr-5 py-3 placeholder:text-gray-300 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all backdrop-blur-sm" />
                    </div>
                    <!-- Active filters + result count -->
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex flex-wrap items-center bg-slate-900/90 rounded-2xl px-6 py-2 gap-2">
                            <span class="text-sm text-slate-500">
                                <span class="text-slate-300 font-medium">{{ paginationFrom }}–{{ paginationTo
                                }}</span> of <span class="text-slate-300 font-medium">{{ totalNews }}</span>
                                articles
                            </span>
                            <template v-if="hasActiveFilters">
                                <span class="text-slate-600">·</span>
                                <div class="flex flex-wrap gap-2">
                                    <span v-if="selectedTag"
                                        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                                        #{{ selectedTag }}
                                    </span>
                                    <span v-for="c in selectedCategories" :key="c"
                                        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700/80 text-slate-300 text-xs">
                                        {{ c }} <button
                                            @click.stop="selectedCategories = selectedCategories.filter(x => x !== c)"
                                            class="hover:text-white">×</button>
                                    </span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    <!-- Sidebar -->
                    <aside class="w-full lg:w-64 xl:w-72 shrink-0 order-2 lg:order-1">
                        <div
                            class="bg-slate-900/50 border border-white/5 rounded-2xl p-5 sticky top-24 backdrop-blur-sm">
                            <div class="flex items-center justify-between mb-5">
                                <h3
                                    class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <i class="pi pi-filter text-cyan-400 text-xs"></i> Filters
                                </h3>
                                <button v-if="hasActiveFilters" @click="clearFilters"
                                    class="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Clear</button>
                            </div>
                            <!-- <div class="mb-4 md:mb-6 p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                                <span class="block text-2xl font-bold text-cyan-400 tabular-nums">{{ totalNews }}</span>
                                <span
                                    class="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Articles</span>
                            </div> -->
                            <div class="space-y-6">
                                <!-- <div>
                                    <h4
                                        class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <i class="pi pi-folder text-[10px]"></i> Category
                                    </h4>
                                    <div class="space-y-2">
                                        <label v-for="cat in categories" :key="cat.name"
                                            class="flex items-center gap-3 cursor-pointer group py-1">
                                            <input type="checkbox" v-model="selectedCategories" :value="cat.name"
                                                class="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500/50 focus:ring-offset-0" />
                                            <span
                                                class="text-sm text-slate-400 group-hover:text-white transition-colors">{{
                                                    cat.name
                                                }}</span>
                                        </label>
                                    </div>
                                </div> -->
                                <div class="border-t border-white/5 pt-4">
                                    <h4
                                        class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <i class="pi pi-calendar text-[10px]"></i> Time
                                    </h4>
                                    <div class="space-y-2">
                                        <label v-for="time in timeRanges" :key="time.value"
                                            class="flex items-center gap-3 cursor-pointer group py-1">
                                            <input type="radio" v-model="selectedTimeRange" :value="time.value"
                                                name="timeRange"
                                                class="w-4 h-4 border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500/50" />
                                            <span
                                                class="text-sm text-slate-400 group-hover:text-white transition-colors">{{
                                                    time.label
                                                }}</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="border-t border-white/5 pt-4">
                                    <h4
                                        class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <i class="pi pi-sort-alt text-[10px]"></i> Sort
                                    </h4>
                                    <select v-model="sortBy"
                                        class="news-sort-select w-full bg-slate-800 border border-white/10 text-slate-300 text-sm rounded-xl pl-3 pr-9 py-2.5 focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                                        <option value="latest">Newest first</option>
                                        <option value="popular">Most popular</option>
                                        <option value="oldest">Oldest first</option>
                                    </select>
                                </div>
                            </div>
                            <!-- <div
                                class="mt-6 pt-5 border-t border-white/5 rounded-xl p-4 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/10">
                                <div class="flex items-center gap-2 mb-2">
                                    <i class="pi pi-bell text-cyan-400 text-sm"></i>
                                    <span class="text-sm font-bold text-white">Stay in the loop</span>
                                </div>
                                <p class="text-xs text-slate-400 leading-relaxed">Get the hottest crypto news in your
                                    inbox.</p>
                            </div> -->
                        </div>
                    </aside>


                    <!-- Main content -->
                    <div class="flex-1 min-w-0 order-1 lg:order-2">
                        <!-- Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            <template v-if="isLoading">
                                <div v-for="n in 6" :key="n"
                                    class="rounded-2xl overflow-hidden bg-slate-800/40 border border-white/5 animate-pulse flex flex-col">
                                    <div class="h-44 bg-slate-700/50"></div>
                                    <div class="p-5 flex-1 flex flex-col">
                                        <div class="h-5 bg-slate-700/50 rounded w-4/5 mb-3"></div>
                                        <div class="h-4 bg-slate-700/50 rounded mb-2"></div>
                                        <div class="h-4 bg-slate-700/50 rounded w-2/3 mb-4"></div>
                                        <div class="mt-auto flex justify-between pt-4 border-t border-white/5">
                                            <div class="h-3 w-16 bg-slate-700/50 rounded"></div>
                                            <div class="h-3 w-12 bg-slate-700/50 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="newsList.length === 0">
                                <div
                                    class="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
                                    <div
                                        class="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center mb-4">
                                        <i class="pi pi-inbox text-3xl text-slate-500"></i>
                                    </div>
                                    <h3 class="text-lg font-semibold text-white mb-2">No articles found</h3>
                                    <p class="text-slate-400 text-sm max-w-sm mb-6">Try adjusting filters or search
                                        terms.</p>
                                    <button @click="clearFilters(); searchQuery = ''"
                                        class="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-colors">Clear
                                        filters</button>
                                </div>
                            </template>
                            <article v-else v-for="(news, idx) in newsList" :key="news.id"
                                :style="{ animationDelay: `${idx * 40}ms` }"
                                @click="navigateToDetail(news.id || news._id)"
                                class="news-card bg-slate-900/90 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-900/5 transition-all duration-300 group">
                                <div class="relative h-44 overflow-hidden">
                                    <img :src="news.image" loading="lazy"
                                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    </div>
                                    <span
                                        class="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-sm text-cyan-400 text-[10px] font-bold uppercase tracking-wide border border-white/10">{{
                                            news.category }}</span>
                                </div>
                                <div class="p-5 flex flex-col flex-1">
                                    <h3
                                        class="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors leading-snug">
                                        {{ news.title }}</h3>
                                    <p class="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">{{
                                        news.excerpt }}</p>
                                    <div v-if="news.tags?.length" class="flex flex-wrap gap-1.5 mb-4">
                                        <span v-for="tag in news.tags.slice(0, 3)" :key="tag"
                                            class="px-2 py-0.5 bg-slate-800/80 text-white italic text-[10px] rounded border border-white/5">#{{
                                                tag }}</span>
                                    </div>
                                    <div
                                        class="mt-auto flex items-center justify-between pt-4 border-t border-white/5 text-[11px] text-slate-500">
                                        <span class="flex items-center gap-1"><i
                                                class="pi pi-calendar text-cyan-500/80"></i> {{
                                                    news.date }}</span>
                                        <span class="flex items-center gap-1"><i
                                                class="pi pi-clock text-cyan-500/80"></i> {{
                                                    news.readTime }}</span>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <!-- Pagination -->
                        <div v-if="totalPages > 1" class="mt-12 flex flex-wrap items-center justify-center gap-2">
                            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                                class="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 inline-flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                                <i class="pi pi-chevron-left text-xs"></i>
                            </button>
                            <template v-for="page in visiblePageNumbers" :key="page">
                                <button v-if="page === 'ellipsis'"
                                    class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 cursor-default">…</button>
                                <button v-else @click="goToPage(page)"
                                    :class="page === currentPage ? 'bg-[#5827ae] text-white font-semibold shadow-lg shadow-[#5827ae]/25' : 'bg-slate-800/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30'"
                                    class="w-10 h-10 rounded-xl inline-flex items-center justify-center text-sm transition-all">
                                    {{ page }}
                                </button>
                            </template>
                            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                                class="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 inline-flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                                <i class="pi pi-chevron-right text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Back to top -->
        <Transition name="fade-slide">
            <button v-show="showBackToTop" @click="scrollToTop"
                class="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-xl bg-slate-800/90 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 shadow-lg flex items-center justify-center transition-all backdrop-blur-sm">
                <i class="pi pi-arrow-up text-sm"></i>
            </button>
        </Transition>

        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import NewsService from '@/service/news';
import CategoryService from '@/service/category';
import { useRouter, useRoute } from 'vue-router';
import Footer from './Footer.vue';
import { useNewsStore } from '@/stores/news';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const newsStore = useNewsStore();
const { trendingTopics } = storeToRefs(newsStore);

const selectedCategories = ref([]);
const categories = ref([]);
const selectedTag = ref(route.query.tag || null);

const selectedTimeRange = ref('all');
const timeRanges = [
    { label: 'All time', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'This week', value: 'week' },
    { label: 'This month', value: 'month' }
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

const paginationFrom = computed(() => Math.min((currentPage.value - 1) * itemsPerPage + 1, totalNews.value) || 0);
const paginationTo = computed(() => Math.min(currentPage.value * itemsPerPage, totalNews.value) || 0);

const visiblePageNumbers = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, 'ellipsis', total];
    if (current >= total - 2) return [1, 'ellipsis', total - 3, total - 2, total - 1, total];
    return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
});

const hasActiveFilters = computed(() =>
    selectedTag.value || selectedCategories.value.length > 0 || selectedTimeRange.value !== 'all'
);

const showBackToTop = ref(false);

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
        newsStore.fetchTrendingTopics();

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
        selectedTag.value = null;
    } else {
        selectedTag.value = tag;
    }
}

function clearFilters() {
    selectedCategories.value = [];
    selectedTimeRange.value = 'all';
    selectedTag.value = null;
    router.replace({ path: route.path, query: {} });
    currentPage.value = 1;
    loadNewsList();
}

function removeTagFilter() {
    selectedTag.value = null;
    const q = { ...route.query };
    delete q.tag;
    router.replace({ path: route.path, query: q });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onScroll() {
    showBackToTop.value = window.scrollY > 600;
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
    window.addEventListener('scroll', onScroll, { passive: true });
});
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
/* Page background with depth layers */
.news-page {
    position: relative;
    min-height: 100vh;
}

.news-page-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.news-page-bg-base {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #5317b4 0%, #8b5cf6 35%, #8859b8 60%, #e5b2ca 100%);
}

.news-page-bg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    will-change: transform;
}

.news-page-bg-orb--1 {
    width: 60vmin;
    height: 60vmin;
    top: -15%;
    left: -10%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(196, 181, 253, 0.4) 40%, transparent 70%);
}

.news-page-bg-orb--2 {
    width: 50vmin;
    height: 50vmin;
    top: 30%;
    right: -15%;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(244, 114, 182, 0.2) 50%, transparent 70%);
}

.news-page-bg-orb--3 {
    width: 45vmin;
    height: 45vmin;
    bottom: -10%;
    left: 20%;
    background: radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(196, 181, 253, 0.15) 50%, transparent 70%);
}

.news-page-bg-orb--4 {
    width: 40vmin;
    height: 40vmin;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
    filter: blur(60px);
    opacity: 0.8;
}

.news-page-bg-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0.35) 100%);
}

.news-page-bg-grain {
    position: absolute;
    inset: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Back to top transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

/* Card stagger (optional; use animation-delay from inline style) */
.news-card {
    animation: news-card-in 0.4s ease-out backwards;
}

@keyframes news-card-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Sort select: custom arrow so it doesn’t sit too far right */
.news-sort-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 14px;
}
</style>
