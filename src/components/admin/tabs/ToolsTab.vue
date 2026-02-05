<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">

        <div class="p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div class="flex gap-2 items-center">
                <button @click="$emit('open-modal')"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Thêm Công cụ
                </button>
                <button v-if="selectedItems.length > 0" @click="deleteSelected"
                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-all">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Xóa ({{ selectedItems.length }})
                </button>
            </div>

            <div class="flex gap-3 w-full sm:w-auto">
                <div class="relative w-full sm:w-64">
                    <input type="text" placeholder="Tìm kiếm công cụ..." :value="searchQuery"
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
                        <th class="p-5 w-4">
                            <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll"
                                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                        </th>
                        <th class="p-5">Tên công cụ</th>
                        <th class="p-5">Loại</th>
                        <th class="p-5">Mô tả</th>
                        <th class="p-5 text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="item in tools" :key="item.id" class="hover:bg-gray-50/80 transition-colors group">
                        <td class="p-5">
                            <input type="checkbox" v-model="selectedItems" :value="item.id"
                                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                        </td>
                        <td class="p-5">
                            <div class="flex items-center gap-3">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <img v-if="item.image" :src="item.image"
                                        class="h-10 w-10 rounded-full object-cover border border-gray-200" alt="">
                                    <div v-else
                                        class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                                        {{ item.name.charAt(0) }}
                                    </div>
                                </div>
                                <div class="font-semibold text-gray-900">{{ item.name }}</div>
                            </div>
                        </td>
                        <td class="p-5">
                            <span
                                class="px-2.5 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-100">
                                {{ item.type || 'N/A' }}
                            </span>
                        </td>
                        <td class="p-5 text-sm text-gray-600 max-w-xs truncate">{{ item.description || 'No description'
                        }}
                        </td>
                        <td class="p-5 text-right">
                            <div
                                class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button @click="$emit('edit', item)"
                                    class="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><svg class="w-4 h-4"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg></button>
                                <button @click="$emit('delete', item.id)"
                                    class="p-1.5 text-red-600 hover:bg-red-50 rounded"><svg class="w-4 h-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg></button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="tools.length === 0">
                        <td colspan="6" class="p-5 text-center text-gray-500">Không tìm thấy công cụ nào.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'

const props = defineProps({
    tools: {
        type: Array,
        required: true
    },
    searchQuery: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['open-modal', 'update:searchQuery', 'edit', 'delete', 'delete-multiple'])

const selectedItems = ref([])

const isAllSelected = computed(() => {
    return props.tools.length > 0 && selectedItems.value.length === props.tools.length
})

const toggleSelectAll = () => {
    if (isAllSelected.value) {
        selectedItems.value = []
    } else {
        selectedItems.value = props.tools.map(item => item.id)
    }
}

const deleteSelected = () => {
    if (confirm(`Bạn có chắc muốn xóa ${selectedItems.value.length} công cụ đã chọn?`)) {
        emit('delete-multiple', selectedItems.value)
        selectedItems.value = []
    }
}
</script>
