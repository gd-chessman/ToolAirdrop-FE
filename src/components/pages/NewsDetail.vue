<template>
    <div class="news-detail-page min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 relative"
        :style="{ fontFamily: `'Roboto', sans-serif` }">
        <!-- Background layers (depth) -->
        <div class="news-detail-bg" aria-hidden="true">
            <div class="news-detail-bg-base"></div>
            <div class="news-detail-bg-image" :style="bgImageStyle"></div>
            <div class="news-detail-bg-overlay"></div>
            <div class="news-detail-bg-orb news-detail-bg-orb--1"></div>
            <div class="news-detail-bg-orb news-detail-bg-orb--2"></div>
            <div class="news-detail-bg-orb news-detail-bg-orb--3"></div>
            <div class="news-detail-bg-orb news-detail-bg-orb--4"></div>
            <div class="news-detail-bg-vignette"></div>
            <div class="news-detail-bg-grain"></div>
        </div>

        <!-- Navigation -->
        <nav class="relative z-10 pt-24 px-6 max-w-4xl mx-auto mb-8">
            <router-link to="/news"
                class="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group">
                <i class="pi pi-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                <span class="text-sm font-medium">Back to News</span>
            </router-link>
        </nav>

        <!-- Loading State -->
        <div v-if="isLoading" class="relative z-10 min-h-svh items-center flex justify-center pt-20">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
        </div>

        <!-- Article Content -->
        <article v-else-if="news" class="relative z-10 max-w-4xl mx-auto px-6">
            <!-- Header -->
            <header class="mb-12">
                <div class="flex items-center gap-3 mb-4 md:mb-6">
                    <span
                        class="px-3 py-1 rounded bg-[#1e293b] text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
                        {{ news.category }}
                    </span>
                    <span v-if="news.isTrending"
                        class="px-3 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <i class="pi pi-bolt"></i> Trending
                    </span>
                </div>

                <h1 class="text-2xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                    {{ news.title }}
                </h1>

                <!-- Metadata -->
                <div class="flex flex-wrap items-center gap-6 px-4 py-2 bg-slate-800/50 text-sm text-slate-400">
                    <div class="flex items-center gap-2">
                        <i class="pi pi-calendar text-cyan-500"></i>
                        <span>{{ news.date }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="pi pi-clock text-cyan-500"></i>
                        <span>{{ news.readTime }}</span>
                    </div>
                    <!-- <div class="flex items-center gap-2">
                        <i class="pi pi-eye text-cyan-500"></i>
                        <span>{{ news.views }} views</span>
                    </div> -->
                </div>
            </header>

            <!-- Content -->
            <div class="
                
                prose prose-invert prose-lg max-w-none 
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-headings:text-white prose-headings:font-bold
                prose-a:text-cyan-400 hover:prose-a:text-cyan-300 
                prose-strong:text-white 
                prose-ul:list-disc prose-ul:ml-6 prose-ul:text-slate-300
                prose-ol:list-decimal prose-ol:ml-6 prose-ol:text-slate-300
                prose-li:marker:text-cyan-500
                prose-code:text-cyan-300 prose-pre:bg-[#0f172a] prose-pre:border prose-pre:border-white/10 mb-12"
                v-html="news.content">
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-12">
                <span v-for="tag in news.tags" :key="tag" @click="handleTagClick(tag)"
                    class="px-4 py-2 rounded-lg bg-[#1e293b] border border-white/5 text-slate-400 text-sm hover:text-white hover:border-cyan-500/30 transition-colors cursor-pointer">
                    #{{ tag }}
                </span>
            </div>

            <!-- Share Section -->
            <div class="pt-8 border-t border-white/10">
                <h3 class="text-white font-bold mb-4">Share this article</h3>
                <div class="flex gap-3">
                    <button @click="shareToSocial('twitter')"
                        class="w-10 h-10 rounded-full bg-[#1e293b] text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                        <i class="pi pi-twitter"></i>
                    </button>
                    <button @click="shareToSocial('facebook')"
                        class="w-10 h-10 rounded-full bg-[#1e293b] text-slate-400 hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center">
                        <i class="pi pi-facebook"></i>
                    </button>
                    <button @click="shareToSocial('linkedin')"
                        class="w-10 h-10 rounded-full bg-[#1e293b] text-slate-400 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center">
                        <i class="pi pi-linkedin"></i>
                    </button>
                    <button @click="copyLink"
                        class="w-10 h-10 rounded-full bg-[#1e293b] text-slate-400 hover:bg-cyan-600 hover:text-white transition-all flex items-center justify-center">
                        <i class="pi pi-link"></i>
                    </button>
                </div>
            </div>
        </article>
        <div class="relative z-10">
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NewsService from '@/service/news';
import Footer from './Footer.vue';
import bgNews from '@/assets/bgnews.jpeg';

const route = useRoute();
const router = useRouter();
const news = ref(null);
const isLoading = ref(true);

const bgImageStyle = computed(() => ({
    backgroundImage: `url(${bgNews})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}));

const handleTagClick = (tag) => {
    router.push({ path: '/news', query: { tag: tag } });
};

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép liên kết vào bộ nhớ tạm!');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

const shareToSocial = (platform) => {
    if (!news.value) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(news.value.title);
    let shareUrl = '';

    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
};

onMounted(async () => {
    isLoading.value = true;
    try {
        const id = route.params.id;
        if (id) {
            const res = await NewsService.getById(id);
            if (res.success) {
                news.value = res.data;
            }
        }
    } catch (error) {
        console.error("Error loading news detail:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<style scoped>
/* Page background with depth layers */
.news-detail-page {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(180deg, #5317b4 0%, #8b5cf6 35%, #8859b8 60%, #e5b2ca 100%);
}

.news-detail-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.news-detail-bg-base {
    position: absolute;
    inset: 0;
    
}

.news-detail-bg-image {
    position: absolute;
    inset: 0;
}

.news-detail-bg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
}

.news-detail-bg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.45;
    will-change: transform;
}

.news-detail-bg-orb--1 {
    width: 60vmin;
    height: 60vmin;
    top: -15%;
    left: -10%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(196, 181, 253, 0.35) 40%, transparent 70%);
}

.news-detail-bg-orb--2 {
    width: 50vmin;
    height: 50vmin;
    top: 30%;
    right: -15%;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(244, 114, 182, 0.18) 50%, transparent 70%);
}

.news-detail-bg-orb--3 {
    width: 45vmin;
    height: 45vmin;
    bottom: -10%;
    left: 20%;
    background: radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, rgba(196, 181, 253, 0.12) 50%, transparent 70%);
}

.news-detail-bg-orb--4 {
    width: 40vmin;
    height: 40vmin;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    filter: blur(60px);
    opacity: 0.7;
}

.news-detail-bg-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, rgba(0, 0, 0, 0.2) 65%, rgba(0, 0, 0, 0.45) 100%);
}

.news-detail-bg-grain {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
}

/* Custom prose styling overrides if needed */
.prose img {
    border-radius: 1rem;
}

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4) {
    font-weight: 800;
    /* Extra bold for a premium feel */
    line-height: 1.2;
    margin-bottom: 1.5rem;
    letter-spacing: -0.025em;
}

:deep(h1) {
    font-size: clamp(2.5rem, 5vw, 4rem) !important;
    /* Responsive sizing */
    margin-top: 2rem;
}

:deep(h2) {
    font-size: clamp(2rem, 4vw, 3rem) !important;
    margin-top: 1.75rem;
}

:deep(h3) {
    font-size: clamp(1.5rem, 3vw, 2.25rem) !important;
    margin-top: 1.5rem;
}

:deep(h4) {
    font-size: clamp(1.25rem, 2vw, 1.75rem) !important;
    margin-top: 1.25rem;
}

/* Force list styling inside the news content */
:deep(.prose ul) {
    list-style-type: disc !important;
    padding-left: 1.5rem !important;
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
}

:deep(.prose ol) {
    list-style-type: decimal !important;
    padding-left: 1.5rem !important;
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
}

:deep(.prose li) {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
    padding-left: 0.5rem !important;
}

:deep(.prose li::marker) {
    color: #06b6d4 !important;
    /* cyan-500 */
}

:deep(.prose) {
    line-height: 1.9 !important;
}
</style>
