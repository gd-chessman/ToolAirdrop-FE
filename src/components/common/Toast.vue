<template>
    <Transition name="toast">
        <div v-if="show" class="fixed top-4 right-4 z-50 max-w-md w-full pointer-events-auto">
            <div class="bg-white rounded-xl shadow-2xl overflow-hidden border-l-4" :class="borderColorClass">
                <div class="p-4">
                    <div class="flex items-start">
                        <!-- Icon -->
                        <div class="flex-shrink-0">
                            <div class="h-10 w-10 rounded-full flex items-center justify-center" :class="iconBgClass">
                                <svg class="h-5 w-5" :class="iconColorClass" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path v-if="type === 'success'" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 13l4 4L19 7" />
                                    <path v-else-if="type === 'error'" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    <path v-else-if="type === 'warning'" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="ml-3 flex-1 pt-0.5">
                            <p class="text-sm font-semibold text-gray-900">
                                {{ title }}
                            </p>
                            <p v-if="message" class="mt-1 text-sm text-gray-600">
                                {{ message }}
                            </p>
                        </div>

                        <!-- Close button -->
                        <button @click="close"
                            class="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1.5 transition-colors">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Progress bar -->
                <div v-if="duration > 0" class="h-1 bg-gray-100">
                    <div class="h-full transition-all ease-linear" :class="progressColorClass"
                        :style="{ width: progress + '%' }">
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'info', // 'success', 'error', 'warning', 'info'
        validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 3000 // milliseconds, 0 = no auto close
    }
})

const emit = defineEmits(['close', 'update:show'])

const progress = ref(100)
let timer = null
let progressTimer = null

const borderColorClass = computed(() => {
    switch (props.type) {
        case 'success':
            return 'border-green-500'
        case 'error':
            return 'border-red-500'
        case 'warning':
            return 'border-yellow-500'
        default:
            return 'border-blue-500'
    }
})

const iconBgClass = computed(() => {
    switch (props.type) {
        case 'success':
            return 'bg-green-100'
        case 'error':
            return 'bg-red-100'
        case 'warning':
            return 'bg-yellow-100'
        default:
            return 'bg-blue-100'
    }
})

const iconColorClass = computed(() => {
    switch (props.type) {
        case 'success':
            return 'text-green-600'
        case 'error':
            return 'text-red-600'
        case 'warning':
            return 'text-yellow-600'
        default:
            return 'text-blue-600'
    }
})

const progressColorClass = computed(() => {
    switch (props.type) {
        case 'success':
            return 'bg-green-500'
        case 'error':
            return 'bg-red-500'
        case 'warning':
            return 'bg-yellow-500'
        default:
            return 'bg-blue-500'
    }
})

const close = () => {
    clearTimers()
    emit('close')
    emit('update:show', false)
}

const clearTimers = () => {
    if (timer) {
        clearTimeout(timer)
        timer = null
    }
    if (progressTimer) {
        clearInterval(progressTimer)
        progressTimer = null
    }
}

const startTimer = () => {
    if (props.duration > 0) {
        progress.value = 100
        const interval = 50 // Update every 50ms
        const decrement = (interval / props.duration) * 100

        progressTimer = setInterval(() => {
            progress.value -= decrement
            if (progress.value <= 0) {
                clearInterval(progressTimer)
            }
        }, interval)

        timer = setTimeout(() => {
            close()
        }, props.duration)
    }
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        startTimer()
    } else {
        clearTimers()
    }
}, { immediate: true })

onUnmounted(() => {
    clearTimers()
})
</script>

<style scoped>
.toast-enter-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
