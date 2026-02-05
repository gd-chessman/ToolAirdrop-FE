<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <h3 class="text-lg font-bold text-gray-800">Danh sách Người dùng</h3>
            <div class="flex gap-3 w-full sm:w-auto">
                <button @click="$emit('export-users')"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all h-[38px] whitespace-nowrap">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Xuất Số Điện Thoại
                </button>
                <select :value="filterType" @change="$emit('update:filterType', $event.target.value)"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-white">
                    <option value="">Tất cả loại tài khoản</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                </select>
                <div class="relative w-full sm:w-64">
                    <input type="text" placeholder="Tìm kiếm người dùng..." :value="searchQuery"
                        @input="$emit('update:searchQuery', $event.target.value)"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900">
                    <svg class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr
                        class="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        <th class="p-5">Người dùng</th>
                        <th class="p-5">Email</th>
                        <th class="p-5">SĐT</th>
                        <th class="p-5">Vai trò</th>
                        <th class="p-5">Loại tài khoản</th>
                        <th class="p-5 text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50/80 transition-colors">
                        <td class="p-5">
                            <div class="font-semibold text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                            <div class="text-xs text-gray-500">@{{ user.username }}</div>
                        </td>
                        <td class="p-5 text-sm text-gray-600">{{ user.email }}</td>
                        <td class="p-5 text-sm text-gray-600">{{ user.phoneNumber || '-' }}</td>
                        <td class="p-5">
                            <span class="px-2 py-1 rounded text-xs font-medium border"
                                :class="user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-100 text-gray-600 border-gray-200'">
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="p-5">
                            <span class="px-2 py-1 rounded-full text-xs font-medium border transition-colors"
                                :class="user.accountType === 'premium' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'">
                                {{ user.accountType || 'basic' }}
                            </span>
                        </td>
                        <td class="p-5 text-right">
                            <button v-if="user.role !== 'admin'" @click="$emit('edit', user)"
                                class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shadow-sm bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100">
                                Chỉnh sửa
                            </button>
                        </td>
                    </tr>
                    <tr v-if="users.length === 0">
                        <td colspan="5" class="p-5 text-center text-gray-500">Không tìm thấy người dùng nào.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    users: {
        type: Array,
        required: true
    },
    searchQuery: {
        type: String,
        default: ''
    },
    filterType: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['export-users', 'update:searchQuery', 'update:filterType', 'edit'])
</script>
