<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

        <!-- General Info -->
        <div class="col-span-2">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Thông tin Website</h3>
        </div>

        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Logo Website</label>
            <div class="flex items-center gap-4">
                <div
                    class="h-16 w-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 relative">
                    <img :src="form.logoUrl || '/src/assets/logocipher43.png'" class="h-full w-full object-cover">
                    <button v-if="form.logoUrl" @click="form.logoUrl = ''"
                        class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600">
                        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1">
                    <input type="file" @change="$emit('file-upload', $event)" accept="image/*"
                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                    <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF max 5MB</p>
                </div>
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tên Website (Logo Text)</label>
            <input v-model="form.siteName" type="text" placeholder="Cipher 43 Lab"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Trang (Slogan)</label>
            <input v-model="form.pageTitle" type="text" placeholder="Cipher 43 Lab - Dashboard"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div class="col-span-2 mt-4">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Thông tin Footer</h3>
        </div>

        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả Footer</label>
            <textarea v-model="form.footerDescription" rows="3" placeholder="Nhập mô tả footer..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
        </div>

        <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Text Copyright</label>
            <input v-model="form.footerCopyright" type="text" placeholder="© 2025 Cipher 43 Lab..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div class="col-span-2 mt-4">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Liên kết mạng xã hội (Footer)</h3>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Twitter (X)</label>
            <input v-model="form.socialLinks.twitter" type="text" placeholder="https://twitter.com/..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Telegram</label>
            <input v-model="form.socialLinks.telegram" type="text" placeholder="https://t.me/..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Discord</label>
            <input v-model="form.socialLinks.discord" type="text" placeholder="https://discord.gg/..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input v-model="form.socialLinks.facebook" type="text" placeholder="https://facebook.com/..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div class="col-span-2 mt-4">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Cài đặt Giá (Pricing)</h3>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giá theo Tháng ($)</label>
            <input v-model.number="form.pricing.monthly" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giá theo Năm ($)</label>
            <input v-model.number="form.pricing.yearly" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tỷ giá (USD to VND)</label>
            <input v-model.number="form.pricing.exchangeRate" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
        </div>

        <div class="col-span-2 flex justify-end mt-6 border-t pt-4">
            <button @click="$emit('save')"
                class="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-all flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Lưu Cài đặt
            </button>
        </div>

    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    form: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['file-upload', 'save'])
</script>
