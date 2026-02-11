<template>
    <footer class="mt-16 bg-[#a272bd] text-slate-400 border-t border-white/5 py-16">
        <div class="w-full max-w-7xl mx-auto px-6">
            <div class="flex flex-col items-start justify-start">
                    <div class="flex items-center gap-3 mb-6">
                        <img :src="siteSettings.logoUrl || '/logocipher43.png'" alt="Logo"
                            class="h-10 w-10 rounded-xl bg-cyan-500/10 object-cover" />
                        <span class="font-bold text-xl text-white">{{ siteSettings.siteName || 'Cipher 43 Lab' }}</span>
                    </div>
                    <p class="text-sm leading-relaxed mb-6 text-slate-300">
                        {{ siteSettings.footerDescription || defaultFooterDescription }}
                    </p>
                    <div class="flex gap-4">
                        <a v-if="socialLinks.twitter" :href="socialLinks.twitter" target="_blank"
                            class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-[#020617] transition-all"><i
                                class="pi pi-twitter"></i></a>
                        <a v-if="socialLinks.telegram" :href="socialLinks.telegram" target="_blank"
                            class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-[#020617] transition-all"><i
                                class="pi pi-telegram"></i></a>
                        <a v-if="socialLinks.discord" :href="socialLinks.discord" target="_blank"
                            class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-[#020617] transition-all"><i
                                class="pi pi-discord"></i></a>
                        <a v-if="socialLinks.facebook" :href="socialLinks.facebook" target="_blank"
                            class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-[#020617] transition-all"><i
                                class="pi pi-facebook"></i></a>
                        <a v-if="socialLinks.youtube" :href="socialLinks.youtube" target="_blank"
                            class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-[#020617] transition-all"><i
                                class="pi pi-youtube"></i></a>
                </div>
            </div>

            <div
                class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-300">
                <p>{{ siteSettings.footerCopyright || '© 2025 Cipher 43 Lab. All rights reserved.' }}</p>
                <p class="flex items-center gap-1 mt-4 md:mt-0">
                    Made with <span class="text-red-500 animate-pulse">❤</span> for the community
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SettingsService from '@/service/settings';

const defaultFooterDescription = 'The ultimate center for crypto airdrop hunters. Maximize your rewards with our AI-powered tools.';

const siteSettings = ref({
    siteName: 'Cipher 43 Lab',
    logoUrl: '',
    socialLinks: {
        twitter: '',
        telegram: '',
        discord: '',
        facebook: '',
        youtube: ''
    },
    footerLinks: {
        airdrops: '/opportunities',
        tools: '/tools',
        news: '/news',
        pricing: '/pricing',
        about: '#',
        blog: '/news',
        careers: '#',
        contact: '#',
        privacyPolicy: '#',
        termsOfService: '#',
        cookiePolicy: '#',
        security: '#'
    }
});

const socialLinks = computed(() => siteSettings.value.socialLinks);
const footerLinks = computed(() => siteSettings.value.footerLinks);

onMounted(async () => {
    try {
        const res = await SettingsService.get();
        if (res.success && res.data) {
            if (res.data.socialLinks) siteSettings.value.socialLinks = res.data.socialLinks;
            if (res.data.siteName) siteSettings.value.siteName = res.data.siteName;
            if (res.data.logoUrl) siteSettings.value.logoUrl = res.data.logoUrl;
            if (res.data.footerDescription) siteSettings.value.footerDescription = res.data.footerDescription;
            if (res.data.footerCopyright) siteSettings.value.footerCopyright = res.data.footerCopyright;
            if (res.data.footerLinks) siteSettings.value.footerLinks = { ...siteSettings.value.footerLinks, ...res.data.footerLinks };
        }
    } catch (error) {
        console.error("Failed to fetch footer settings", error);
    }
});
</script>
