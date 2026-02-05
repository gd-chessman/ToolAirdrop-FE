<template>
  <div class="flex h-screen bg-gray-50 font-sans">

    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div class="h-16 flex items-center px-6 border-b border-gray-100">
        <div class="bg-blue-600 p-1.5 rounded-lg mr-3">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-gray-800 text-lg tracking-tight">Cipher 43 Lab</h1>
          <p class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Admin Panel</p>
        </div>
      </div>

      <nav class="flex-1 py-6 space-y-1">
        <a href="#" @click.prevent="navigateTo('overview')"
          :class="currentTab === 'overview' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'"
          class="flex items-center px-6 py-3 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Tổng quan
        </a>

        <a href="#" @click.prevent="navigateTo('airdrop')"
          :class="currentTab === 'airdrop' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'"
          class="flex items-center px-6 py-3 transition-colors group">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span class="font-medium">Quản lý Airdrop</span>
        </a>

        <a href="#" @click.prevent="navigateTo('tools')"
          :class="currentTab === 'tools' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'"
          class="flex items-center px-6 py-3 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Quản lý Công cụ
        </a>

        <a href="#" @click.prevent="navigateTo('category')"
          :class="currentTab === 'category' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'"
          class="flex items-center px-6 py-3 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Quản lý Danh mục
        </a>

        <a href="#" @click.prevent="navigateTo('user')"
          :class="currentTab === 'user' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'"
          class="flex items-center px-6 py-3 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Quản lý Người dùng
        </a>

        <a href="#" @click.prevent="navigateTo('news')"
          :class="currentTab === 'news' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'"
          class="flex items-center px-6 py-3 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Quản lý Tin tức
        </a>

        <a href="#" @click.prevent="navigateTo('settings')"
          :class="currentTab === 'settings' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'"
          class="flex items-center px-6 py-3 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Cài đặt
        </a>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">

      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        <div class="flex items-center gap-4">
          <button class="md:hidden text-gray-500">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div class="flex items-center text-sm text-gray-500">
            <span class="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium mr-2">Trang Quản Trị</span>
            <span class="mx-2">/</span>
            <span>admin</span>
            <span class="mx-2">/</span>
            <span class="text-gray-900 font-semibold">{{ currentTab === 'airdrop' ? 'airdrops' : (currentTab === 'tools'
              ?
              'công cụ' : (currentTab === 'category' ? 'danh mục' : (currentTab === 'news' ? 'tin tức' : 'người dùng')))
            }}</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button class="p-2 text-gray-400 hover:text-gray-600"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg></button>
          <button class="p-2 text-gray-400 hover:text-gray-600 relative">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div class="relative ml-4 pl-4 border-l border-gray-200">
            <button @click="toggleProfileMenu" class="flex items-center gap-2 focus:outline-none">
              <div class="text-right hidden md:block">
                <div class="text-sm font-medium text-gray-900">Admin User</div>
              </div>
              <div
                class="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-700 transition-colors">
                A</div>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="showProfileMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 origin-top-right focus:outline-none">
              <div class="px-4 py-2 border-b border-gray-100 md:hidden">
                <p class="text-sm font-medium text-gray-900">Admin User</p>
                <p class="text-xs text-gray-500">admin@airdropalpha.com</p>
              </div>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Hồ sơ</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cài đặt</a>
              <button @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Đăng
                xuất</button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto bg-gray-50 p-6">

        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <button class="md:hidden text-gray-400"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg></button>
            <h2 class="text-xl font-bold text-gray-800">{{ pageTitle }}</h2>
          </div>
        </div>

        <!-- Main Content Area -->
        <router-view v-slot="{ Component }">
          <component :is="Component" :stats="dashboardStats" :airdrops="filteredAirdrops"
            v-model:searchQuery="currentSearchQuery" :tools="filteredTools" :categories="filteredCategories"
            v-model:type="categoryType" :users="filteredUsers" v-model:filterType="searchUserAccountType"
            :news="filteredNews" :form="settingsForm" :newsCategories="newsCategories"
            v-model:searchCategory="searchNewsCategory"
            @filter="(filters) => { dashboardFilters = filters; fetchDashboardStats() }"
            @open-modal="(type, item) => openModal(type || currentTabForModal, item)"
            @edit="(item) => openModal(currentTabForModal, item)" @delete="handleDelete"
            @delete-multiple="handleDeleteMultiple" @export-users="exportUsers"
            @manage-categories="showNewsCategoryModal = true" @file-upload="(e) => handleFileUpload(e, 'settings')"
            @save="saveSettings" />
        </router-view>

      </main>

    </div>

    <!-- Modal Overlay -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
          <h3 class="text-xl font-bold text-gray-800">{{ isEditing ? 'Chỉnh sửa' : 'Thêm mới' }} {{ currentForm ===
            'airdrop' ? 'Airdrop' : (currentForm === 'tool' ? 'Công cụ' : 'Danh mục') }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <!-- User Form -->
          <div v-if="currentForm === 'user'" class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Loại tài khoản</label>
              <select v-model="userForm.accountType"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div v-if="userForm.accountType === 'premium'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu Premium</label>
              <input type="date" v-model="userForm.premiumStartDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
            </div>
            <div v-if="userForm.accountType === 'premium'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc Premium</label>
              <input type="date" v-model="userForm.premiumEndDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
            </div>
          </div>

          <!-- Airdrop Form -->
          <div v-if="currentForm === 'airdrop'">
            <!-- Tab Navigation -->
            <div class="border-b border-gray-200 mb-6">
              <nav class="flex gap-4" aria-label="Tabs">
                <button v-for="tab in airdropTabs" :key="tab.id" @click="currentAirdropTab = tab.id" :class="[
                  currentAirdropTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors'
                ]">
                  {{ tab.name }}
                </button>
              </nav>
            </div>

            <!-- Tab 1: Thông tin dự án -->
            <div v-show="currentAirdropTab === 'info'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Tên dự án</label>
                <input v-model="airdropForm.name" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
                <div class="flex items-center gap-3">
                  <div v-if="airdropForm.image" class="relative h-12 w-12 flex-shrink-0">
                    <img :src="airdropForm.image" class="h-12 w-12 rounded-lg object-cover border border-gray-200"
                      alt="Preview">
                    <button @click="airdropForm.image = ''"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div class="flex-1">
                    <input type="file" @change="(e) => handleFileUpload(e, 'airdrop')" accept="image/*"
                      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                    <input v-if="!airdropForm.image" v-model="airdropForm.image" type="text"
                      placeholder="Hoặc dán URL hình ảnh"
                      class="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500">
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Token</label>
                <input v-model="airdropForm.token" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Loại</label>
                <select v-model="airdropForm.category"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
                  <option value="">Chọn Loại</option>
                  <option v-for="cat in airdropCategories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mạng lưới</label>
                <input v-model="airdropForm.networkd" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select v-model="airdropForm.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
                  <option value="Live">Live</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ended">Ended</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tiềm năng</label>
                <select v-model="airdropForm.potential"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Độ khó</label>
                <select v-model="airdropForm.difficulty"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>


              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea v-model="airdropForm.description" rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Về dự án</label>
                <textarea v-model="airdropForm.about" rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Giá / Giá trị ước tính ($)</label>
                <input v-model="airdropForm.price" type="text" placeholder="e.g. 3000 - 5000"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tổng vốn gọi được ($)</label>
                <input v-model="airdropForm.totalRaise" type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div class="col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Mạng lưới chính</label>
                <input v-model="airdropForm.networkd" type="text" placeholder="e.g. Ethereum"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hạn chót</label>
                <input v-model="airdropForm.deadline" type="datetime-local"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Yêu cầu chính (Tasks - cách nhau bởi dấu
                  phẩy)</label>
                <input v-model="airdropForm.keyRequirements" type="text"
                  placeholder="e.g., Bridge tokens, Use dApps, Hold tokens"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Featured Backers (Investors - cách nhau bởi
                  dấu phẩy)</label>
                <input v-model="airdropForm.supportNetworks" type="text"
                  placeholder="e.g., Binance Labs, Delphi Digital, a16z"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              </div>

              <!-- Social Links -->
              <div class="col-span-2 border-t border-gray-100 pt-4 mt-2">
                <h4 class="text-sm font-semibold text-gray-800 mb-3">Liên kết Cộng đồng / Xã hội</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input v-model="airdropForm.website" type="text" placeholder="https://..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Twitter (X)</label>
                    <input v-model="airdropForm.twitter" type="text" placeholder="https://twitter.com/..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Discord</label>
                    <input v-model="airdropForm.discord" type="text" placeholder="https://discord.gg/..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Gitbook</label>
                    <input v-model="airdropForm.gitbook" type="text" placeholder="https://docs.project.com"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
                  </div>
                  <div class="col-span-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telegram (Cộng đồng)</label>
                    <input v-model="airdropForm.telegram" type="text" placeholder="https://t.me/project"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 2: Hướng dẫn chi tiết -->
            <div v-show="currentAirdropTab === 'guide'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hướng dẫn chi tiết (Rich Text)</label>
                <div class="bg-white text-gray-900">
                  <QuillEditor v-model:content="airdropForm.guide" contentType="html" theme="snow" toolbar="full"
                    style="height: 400px;" />
                </div>
              </div>
            </div>

            <!-- Tab 3: Tin tức & Cập nhật -->
            <div v-show="currentAirdropTab === 'updates'">
              <h4 class="text-sm font-semibold text-gray-800 mb-3">Tin tức & Cập nhật</h4>

              <!-- List of Updates -->
              <div v-if="airdropForm.updates && airdropForm.updates.length > 0" class="space-y-3 mb-4">
                <div v-for="(update, index) in airdropForm.updates" :key="index"
                  class="p-3 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-start group">
                  <div class="flex-1">
                    <div class="font-bold text-gray-800 text-sm">{{ update.title }}</div>
                    <div class="text-xs text-gray-500 mb-1">{{ update.date ? new Date(update.date).toLocaleDateString()
                      : 'No date' }}</div>
                    <div
                      class="text-xs text-gray-600 max-h-20 overflow-hidden prose prose-sm prose-img:h-12 prose-img:w-auto prose-img:inline-block"
                      v-html="update.content"></div>
                  </div>
                  <div class="flex gap-2 ml-2">
                    <button @click="editUpdate(index)" class="text-blue-500 hover:text-blue-700 p-1">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="airdropForm.updates.splice(index, 1)" class="text-red-500 hover:text-red-700 p-1">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Add/Edit Update Form -->
              <div class="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                <h5 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{{ editingUpdateIndex === -1 ?
                  'Thêm mới cập nhật' : 'Chỉnh sửa cập nhật' }}</h5>
                <div class="grid grid-cols-1 gap-3">
                  <input v-model="newUpdate.title" type="text" placeholder="Tiêu đề cập nhật"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none text-gray-900">
                  <div class="bg-white text-gray-900 rounded-lg border border-gray-300 overflow-hidden">
                    <QuillEditor :key="'item-' + editingUpdateIndex" v-model:content="newUpdate.content"
                      contentType="html" theme="snow" toolbar="full" placeholder="Nội dung cập nhật..."
                      style="height: 200px;" />
                  </div>
                  <div class="flex justify-between items-center gap-3">
                    <input v-model="newUpdate.date" type="date"
                      class="border border-gray-300 rounded-lg px-2 py-1 text-xs bg-white text-gray-900">

                    <div class="flex gap-2">
                      <button v-if="editingUpdateIndex !== -1" @click="cancelEditUpdate" type="button"
                        class="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100">Hủy</button>
                      <button @click="addUpdateItem" type="button"
                        class="px-3 py-1.5 bg-gray-800 text-white text-xs font-bold rounded-lg hover:bg-gray-700">
                        {{ editingUpdateIndex === -1 ? 'Thêm cập nhật' : 'Lưu cập nhật' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Tool Form -->
          <div v-if="currentForm === 'tool'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên công cụ</label>
              <input v-model="toolForm.name" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh (Tải lên hoặc URL)</label>
              <div class="flex items-center gap-3">
                <div v-if="toolForm.image" class="relative h-12 w-12 flex-shrink-0">
                  <img :src="toolForm.image" class="h-12 w-12 rounded-lg object-cover border border-gray-200"
                    alt="Preview">
                  <button @click="toolForm.image = ''"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="flex-1">
                  <input type="file" @change="(e) => handleFileUpload(e, 'tool')" accept="image/*"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Loại</label>
              <select v-model="toolForm.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
                <option value="free">Miễn phí</option>
                <option value="powerful">Mạnh mẽ</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (Cards)</label>
              <textarea v-model="toolForm.description" rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Giới thiệu (About This Tool)</label>
              <textarea v-model="toolForm.about" rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Tính năng (Mỗi dòng 1 tính năng)</label>
              <textarea v-model="toolForm.features" rows="4" placeholder="Safe simulation&#10;Risk-free practice"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Cách hoạt động (Mỗi dòng 1 bước)</label>
              <textarea v-model="toolForm.howItWorks" rows="4" placeholder="Step 1...&#10;Step 2..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Use Cases (Mỗi dòng 1 use case)</label>
              <textarea v-model="toolForm.useCases" rows="4" placeholder="Case 1...&#10;Case 2..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Badges (cách nhau bởi dấu phẩy)</label>
              <input v-model="toolForm.badges" type="text" placeholder="POPULAR, PRIVATE, AUTOMATION"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
            </div>

            <div class="col-span-2 flex items-center gap-2">
              <input v-model="toolForm.apiLocked" type="checkbox" id="apiLocked"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
              <label for="apiLocked" class="text-sm font-medium text-gray-700 select-none">Khóa API (Dành cho
                Private)</label>
            </div>
          </div>

        </div>

        <!-- Category Form -->
        <div v-if="currentForm === 'category'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
            <input v-model="categoryForm.name" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Loại danh mục</label>
            <select v-model="categoryForm.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
              <option value="airdrop">Airdrop</option>
              <option value="news">News</option>
              <option value="tool">Tool</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug (Tự động)</label>
            <input :value="categorySlugComputed" type="text" disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500">
          </div>
        </div>

        <!-- News Form -->
        <div v-if="currentForm === 'news'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input v-model="newsForm.title" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh (Tải lên hoặc URL)</label>
            <div class="flex items-center gap-3">
              <div v-if="newsForm.image" class="relative h-12 w-12 flex-shrink-0">
                <img :src="newsForm.image" class="h-12 w-12 rounded-lg object-cover border border-gray-200"
                  alt="Preview">
                <button @click="newsForm.image = ''"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="flex-1">
                <input type="file" @change="(e) => handleFileUpload(e, 'news')" accept="image/*"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                <input v-if="!newsForm.image" v-model="newsForm.image" type="text" placeholder="Hoặc dán URL hình ảnh"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (Excerpt)</label>
            <textarea v-model="newsForm.excerpt" rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"></textarea>
          </div>

          <div class="pt-2">
            <label class="block text-sm font-medium text-gray-700 mb-2 pl-1">Danh mục</label>
            <select v-model="newsForm.category"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 shadow-sm">
              <option v-for="cat in newsCategories" :key="cat._id" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Thời gian đọc</label>
            <input v-model="newsForm.readTime" type="text" placeholder="e.g. 5 min"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select v-model="newsForm.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 shadow-sm">
              <option value="draft">Bản nháp</option>
              <option value="published">Đã xuất bản</option>
              <option value="scheduled">Đã lên lịch</option>
            </select>
          </div>

          <div v-if="newsForm.status === 'scheduled'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Thời gian đăng bài</label>
            <input v-model="newsForm.publishedAt" type="datetime-local"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
          </div>


          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags (cách nhau bởi dấu phẩy)</label>
            <input v-model="newsForm.tags" type="text" placeholder="Bitcoin, ETH, ..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white">
          </div>

          <div class="col-span-2 flex items-center gap-2">
            <input v-model="newsForm.isTrending" type="checkbox" id="isTrending"
              class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
            <label for="isTrending" class="text-sm font-medium text-gray-700 select-none">Là tin nổi bật
              (Trending)</label>
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung bài viết</label>
            <div class="bg-white text-gray-900 border border-gray-300 rounded-lg overflow-hidden">
              <QuillEditor v-model:content="newsForm.content" contentType="html" theme="snow" toolbar="full"
                style="height: 400px;" />
            </div>
          </div>
        </div>


        <div class="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
          <button @click="closeModal"
            class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors">Hủy</button>
          <button @click="saveData"
            class="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition-all flex items-center gap-2">
            <span v-if="isLoading"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ isEditing ? 'Cập nhật' : 'Tạo mới' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm Dialog -->
  <ConfirmDialog v-model:show="confirmDialog.show" :type="confirmDialog.type" :title="confirmDialog.title"
    :message="confirmDialog.message" :confirm-text="confirmDialog.confirmText" @confirm="confirmDialog.onConfirm"
    @cancel="confirmDialog.onCancel" />

  <!-- Toast Notification -->
  <Toast v-model:show="toast.show" :type="toast.type" :title="toast.title" :message="toast.message"
    :duration="toast.duration" />

  <!-- News Category Management Modal -->
  <div v-if="showNewsCategoryModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 class="text-xl font-bold text-gray-800">Quản lý Danh mục Tin tức</h3>
        <button @click="showNewsCategoryModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 max-h-[60vh] overflow-y-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b">
              <th class="p-3">Tên</th>
              <th class="p-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="cat in newsCategories" :key="cat._id" class="hover:bg-gray-50">
              <td class="p-3 text-sm text-gray-800">{{ cat.name }}</td>
              <td class="p-3 text-right">
                <button @click="openModal('news_category', cat); showNewsCategoryModal = false"
                  class="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors mr-1" title="Sửa">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button @click="deleteCategoryItem(cat._id)"
                  class="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Xóa">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="newsCategories.length === 0">
              <td colspan="2" class="p-4 text-center text-sm text-gray-500">Chưa có danh mục nào.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
        <button @click="openModal('news_category'); showNewsCategoryModal = false"
          class="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Thêm mới
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import ProductService from '@/service/product'
import ToolService from '@/service/tool'
import CategoryService from '@/service/category'
import UserService from '@/service/user'
import NewsService from '@/service/news'
import SettingsService from '@/service/settings'
import DashboardService from '@/service/dashboard'
import { UploadImageCypher43 } from '@/common/api'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import Toast from '@/components/common/Toast.vue'
import { useGlobalActions } from '@/composables/useGlobalActions'
import OverviewTab from './tabs/OverviewTab.vue'
import AirdropTab from './tabs/AirdropTab.vue'
import ToolsTab from './tabs/ToolsTab.vue'
import CategoryTab from './tabs/CategoryTab.vue'
import UserTab from './tabs/UserTab.vue'
import NewsTab from './tabs/NewsTab.vue'
import SettingsTab from './tabs/SettingsTab.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
// const { showToast, showConfirm } = useGlobalActions() // Removed duplicate

// Map route names to tab IDs
const routeMap = {
  'DashboardOverview': 'overview',
  'DashboardAirdrop': 'airdrop',
  'DashboardTools': 'tools',
  'DashboardCategory': 'category',
  'DashboardUser': 'user',
  'DashboardNews': 'news',
  'DashboardSettings': 'settings'
}

const currentTab = computed(() => {
  return routeMap[route.name] || 'overview'
})

const currentTabForModal = computed(() => {
  const map = {
    'airdrop': 'airdrop',
    'tools': 'tool',
    'category': 'category',
    'news': 'news',
    'user': 'user'
  }
  return map[currentTab.value] || ''
})

// Unified search query handler
const currentSearchQuery = computed({
  get: () => {
    switch (currentTab.value) {
      case 'airdrop': return searchAirdrop.value
      case 'tools': return searchTool.value
      case 'category': return searchCategory.value
      case 'user': return searchUser.value
      case 'news': return searchNews.value
      default: return ''
    }
  },
  set: (val) => {
    switch (currentTab.value) {
      case 'airdrop': searchAirdrop.value = val; break
      case 'tools': searchTool.value = val; break
      case 'category': searchCategory.value = val; break
      case 'user': searchUser.value = val; break
      case 'news': searchNews.value = val; break
    }
  }
})

const handleDelete = (id) => {
  switch (currentTab.value) {
    case 'airdrop': deleteAirdrop(id); break
    case 'tools': deleteTool(id); break
    case 'category': deleteCategoryItem(id); break
    case 'news': deleteNews(id); break
  }
}

// Navigation function
const navigateTo = (tab) => {
  const routeNameMap = {
    'overview': 'DashboardOverview',
    'airdrop': 'DashboardAirdrop',
    'tools': 'DashboardTools',
    'category': 'DashboardCategory',
    'user': 'DashboardUser',
    'news': 'DashboardNews',
    'settings': 'DashboardSettings'
  }
  router.push({ name: routeNameMap[tab] })
}

const dashboardStats = ref({
  totalUsers: 0,
  newRegistrations: 0,
  premiumUsers: 0,
  monthlyRevenue: 0,
  totalNews: 0
})

const dashboardFilters = ref({
  startDate: '',
  endDate: ''
})

const fetchDashboardStats = async () => {
  try {
    const res = await DashboardService.getStats(dashboardFilters.value)
    if (res.success) {
      console.log('Dashboard stats fetched:', res.data)
      // Use Object.assign to maintain reactivity if component holds reference
      Object.assign(dashboardStats.value, res.data)
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error)
  }
}

// Check if user is authenticated and is admin
onMounted(() => {
  console.log('Auth check - Token:', !!authStore.token)
  console.log('Auth check - User:', authStore.user)
  console.log('Auth check - User role:', authStore.user?.role)

  if (!authStore.token || !authStore.user) {
    console.error('Not authenticated, redirecting to login')
    router.push({ name: 'Login' })
    return
  }

  if (authStore.user.role !== 'admin') {
    console.error('Not admin, redirecting to home')
    router.push({ name: 'Home' })
    return
  }

  // If authenticated as admin, fetch data
  fetchData()
})

const showProfileMenu = ref(false)
const showModal = ref(false)
const showNewsCategoryModal = ref(false)
const isEditing = ref(false)
const currentForm = ref('airdrop') // airdrop, tool, category, news

const isLoading = ref(false)
const searchAirdrop = ref('')
const searchTool = ref('')
const searchCategory = ref('')
const searchUser = ref('')
const searchNews = ref('')

// Dialog and Toast state
const { showToast, showConfirm, toast, confirmDialog } = useGlobalActions()

// Helper functions for dialog and toast



const airdropForm = reactive({
  id: null,
  name: '',
  shortNamme: '',
  description: '',
  networkd: '',
  price: '',
  totalRaise: 0,
  backers: 0,
  deadline: '',
  status: 'Live',
  token: '',
  about: '',
  keyRequirements: '',
  supportChian: '',
  supportNetworks: '',
  potential: 'Medium',
  difficulty: 'Medium',
  category: '',
  website: '',
  twitter: '',
  discord: '',
  gitbook: '',
  telegram: '',
  guide: '',
  updates: []
})

//  Airdrop Tabs
const currentAirdropTab = ref('info')
const airdropTabs = [
  { id: 'info', name: 'Thông tin dự án' },
  { id: 'guide', name: 'Hướng dẫn chi tiết' },
  { id: 'updates', name: 'Tin tức & Cập nhật' }
]


const toolForm = reactive({
  id: null,
  name: '',
  image: '',
  type: 'free',
  description: '',
  about: '',
  features: '',
  howItWorks: '',
  useCases: '',
  badges: '',
  apiLocked: true
})

const categoryForm = reactive({
  id: null,
  name: '',
  slug: '',
  type: 'airdrop'
})

const newsForm = reactive({
  id: null,
  title: '',
  excerpt: '',
  content: '',
  image: '',
  category: 'Market Analysis',
  tags: '',
  isTrending: false,
  readTime: '5 min',
  status: 'published',
  publishedAt: new Date().toISOString().slice(0, 16)
})

const categorySlugComputed = computed(() => {
  return categoryForm.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
})

const userForm = reactive({
  id: null,
  accountType: 'basic',
  premiumStartDate: '',
  premiumEndDate: ''
})



const pageTitle = computed(() => {
  if (currentTab.value === 'overview') return 'Tổng quan'
  if (currentTab.value === 'airdrop') return 'Airdrop Management'
  if (currentTab.value === 'tools') return 'Tools Management'
  if (currentTab.value === 'category') return 'Category Management'
  if (currentTab.value === 'news') return 'News Management'
  if (currentTab.value === 'settings') return 'Cài đặt chung'
  return 'User Management'
})

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const airdrops = ref([])

const tools = ref([])
const categories = ref([])
const users = ref([])
const news = ref([])

const filteredAirdrops = computed(() => {
  if (!searchAirdrop.value) return airdrops.value
  return airdrops.value.filter(item =>
    item.name.toLowerCase().includes(searchAirdrop.value.toLowerCase()) ||
    item.token?.toLowerCase().includes(searchAirdrop.value.toLowerCase())
  )
})

const airdropCategories = computed(() => {
  return categories.value.filter(cat => !cat.type || cat.type === 'airdrop')
})

const NEWS_CATEGORIES = [
  'Market Analysis', 'DeFi', 'NFTs', 'Technology', 'Regulations', 'Airdrops',
  'Phân tích thị trường', 'Công nghệ', 'Quy định'
]

const searchNewsCategory = ref('')

const filteredNews = computed(() => {
  let result = news.value

  if (searchNews.value) {
    result = result.filter(item => item.title.toLowerCase().includes(searchNews.value.toLowerCase()))
  }

  if (searchNewsCategory.value) {
    result = result.filter(item => item.category === searchNewsCategory.value)
  }

  return result
})

const filteredTools = computed(() => {
  if (!searchTool.value) return tools.value
  return tools.value.filter(item =>
    item.name.toLowerCase().includes(searchTool.value.toLowerCase())
  )
})

const filteredCategories = computed(() => {
  if (!searchCategory.value) return categories.value
  return categories.value.filter(item =>
    item.name.toLowerCase().includes(searchCategory.value.toLowerCase())
  )
})

const filteredUsers = computed(() => {
  return users.value
})

let searchUserTimeout
watch(searchUser, (newVal) => {
  clearTimeout(searchUserTimeout)
  searchUserTimeout = setTimeout(() => {
    fetchUsers(newVal)
  }, 300)
})

const exportUsers = () => {
  // Only export users who have a phone number
  const usersWithPhone = users.value.filter(user => user.phoneNumber && user.phoneNumber.trim() !== '');

  if (usersWithPhone.length === 0) {
    showToast({ type: 'warning', title: 'Không có dữ liệu', message: 'Không có người dùng nào có số điện thoại để xuất.' });
    return;
  }

  const headers = ["First Name", "Last Name", "Username", "Email", "Phone Number", "Role", "Account Type"];
  const rows = usersWithPhone.map(user => [
    user.firstName,
    user.lastName,
    user.username,
    user.email,
    user.phoneNumber,
    user.role,
    user.accountType
  ]);

  let csvContent = "data:text/csv;charset=utf-8,"
    + headers.join(",") + "\n"
    + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "users_phone_list.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast({ type: 'success', title: 'Xuất thành công', message: `Đã xuất ${usersWithPhone.length} người dùng có số điện thoại.` });
}

const fetchAirdrops = async () => {
  try {
    const airdropData = await ProductService.getAllProduct({ limit: 100, page: 1 })
    airdrops.value = airdropData.data || airdropData
  } catch (error) {
    console.error("Airdrop API error", error)
  }
}

const categoryType = ref('airdrop')

const fetchCategories = async () => {
  try {
    const catData = await CategoryService.getAll({ type: categoryType.value })
    categories.value = catData || []
  } catch (error) {
    console.error("Category API error", error)
  }
}

watch(categoryType, () => {
  fetchCategories()
})

const fetchTools = async () => {
  try {
    const toolData = await ToolService.getAll()
    tools.value = toolData || []
  } catch (error) {
    console.error("Tools API error", error)
  }
}

const fetchUsers = async () => {
  try {
    const query = {
      search: searchUser.value
    }
    if (searchUserAccountType.value) {
      query.accountType = searchUserAccountType.value
    }
    const userData = await UserService.getAll(query)
    users.value = userData || []
  } catch (error) {
    console.error("User API error", error)
  }
}

const searchUserAccountType = ref('')

watch(searchUserAccountType, () => {
  fetchUsers()
})

const newsCategories = ref([])
const fetchNews = async () => {
  try {
    const response = await NewsService.getAll({ limit: 100, include_hidden: true })
    news.value = response.data

    // Fetch dynamic news categories
    const catData = await CategoryService.getAll({ type: 'news' })
    newsCategories.value = catData || []
  } catch (error) {
    console.error("News API error", error)
  }
}

const fetchData = async () => {
  isLoading.value = true
  try {
    if (currentTab.value === 'airdrop') {
      await fetchAirdrops()
    } else if (currentTab.value === 'tools') {
      await fetchTools()
    } else if (currentTab.value === 'category') {
      await fetchCategories()
    } else if (currentTab.value === 'user') {
      await fetchUsers()
    } else if (currentTab.value === 'news') {
      await fetchNews()
    } else if (currentTab.value === 'settings') {
      await fetchSettings()
    } else if (currentTab.value === 'overview') {
      await fetchDashboardStats()
    }
  } catch (error) {
    console.error("Error fetching data:", error)
  } finally {
    isLoading.value = false
  }
}

const settingsForm = reactive({
  siteName: '',
  pageTitle: '',
  logoUrl: '',
  footerDescription: '',
  footerCopyright: '',
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
  },
  pricing: {
    monthly: 49,
    yearly: 470,
    exchangeRate: 25000
  }
})

const fetchSettings = async () => {
  try {
    const res = await SettingsService.get()
    if (res.success && res.data) {
      settingsForm.siteName = res.data.siteName || ''
      settingsForm.pageTitle = res.data.pageTitle || ''
      settingsForm.logoUrl = res.data.logoUrl || ''
      settingsForm.footerDescription = res.data.footerDescription || ''
      settingsForm.footerCopyright = res.data.footerCopyright || ''
      if (res.data.socialLinks) {
        settingsForm.socialLinks = { ...settingsForm.socialLinks, ...res.data.socialLinks }
      }
      if (res.data.footerLinks) {
        settingsForm.footerLinks = { ...settingsForm.footerLinks, ...res.data.footerLinks }
      }
      if (res.data.pricing) {
        settingsForm.pricing = { ...settingsForm.pricing, ...res.data.pricing }
      }
    }
  } catch (error) {
    console.error("Failed to fetch settings", error)
  }
}

const saveSettings = async () => {
  isLoading.value = true
  try {
    const res = await SettingsService.update(settingsForm)
    if (res.success) {
      showToast({ type: 'success', title: 'Success', message: 'Settings updated successfully' })
    }
  } catch (error) {
    console.error("Failed to save settings", error)
    showToast({ type: 'error', title: 'Error', message: 'Failed to update settings' })
  } finally {
    isLoading.value = false
  }
}

watch(currentTab, () => {
  searchUser.value = ''
  fetchData()
})

const openModal = (type, item = null) => {
  currentForm.value = type
  showModal.value = true
  isEditing.value = !!item

  if (type === 'airdrop') {
    if (item) {
      Object.assign(airdropForm, {
        id: item.id || item._id,
        name: item.name,
        image: item.image || '',
        shortNamme: item.shortNamme,
        description: item.description,
        networkd: item.networkd || (item.supportChian && item.supportChian[0]) || '',
        price: item.price,
        totalRaise: item.totalRaise,
        backers: item.backers,
        deadline: item.deadline ? new Date(item.deadline).toISOString().slice(0, 16) : '',
        status: item.status,
        token: item.token,
        about: item.about,
        keyRequirements: Array.isArray(item.keyRequirements) ? item.keyRequirements.join(', ') : (item.keyRequirements || ''),
        supportChian: Array.isArray(item.supportChian) ? item.supportChian.join(', ') : (item.supportChian || ''),
        supportNetworks: Array.isArray(item.supportNetworks) ? item.supportNetworks.join(', ') : (item.supportNetworks || ''),
        potential: item.potential || 'Medium',
        difficulty: item.difficulty || 'Medium',
        category: (item.category && typeof item.category === 'object') ? item.category._id : (item.category || ''),
        website: item.website || '',
        twitter: item.twitter || '',
        discord: item.discord || '',
        gitbook: item.gitbook || '',
        telegram: item.telegram || '',
        guide: item.guide || '',
        updates: item.updates || []
      })
    } else {
      Object.assign(airdropForm, {
        id: null, name: '', image: '', shortNamme: '', description: '', networkd: '', price: '', toltalRise: 0, backers: 0, deadline: '', status: 'Live',
        token: '', about: '', keyRequirements: '', supportChian: '', supportNetworks: '', potential: 'Medium', difficulty: 'Medium', category: '',
        website: '', twitter: '', discord: '', gitbook: '', telegram: '', guide: '', updates: []
      })
    }
  } else if (type === 'tool') {
    if (item) {
      Object.assign(toolForm, {
        id: item.id || item._id,
        name: item.name,
        image: item.image || '',
        type: item.type,
        description: item.description,
        about: item.about || item.description,
        features: Array.isArray(item.features) ? item.features.join('\n') : (item.features || ''),
        howItWorks: Array.isArray(item.howItWorks) ? item.howItWorks.join('\n') : (item.howItWorks || ''),
        useCases: Array.isArray(item.useCases) ? item.useCases.join('\n') : (item.useCases || ''),
        badges: Array.isArray(item.badges) ? item.badges.join(', ') : (item.badges || ''),
        apiLocked: item.apiLocked !== undefined ? item.apiLocked : true
      })
    } else {
      Object.assign(toolForm, { id: null, name: '', image: '', type: 'free', description: '', about: '', features: '', howItWorks: '', useCases: '', badges: '', apiLocked: true })
    }
  } else if (type === 'category') {
    if (item) {
      Object.assign(categoryForm, {
        id: item._id || item.id,
        name: item.name,
        slug: item.slug,
        type: item.type || 'airdrop'
      })
    } else {
      Object.assign(categoryForm, { id: null, name: '', slug: '', type: categoryType.value })
    }
  } else if (type === 'news_category') { // Special case for creating news categories from News tab
    currentForm.value = 'category' // Reuse category form
    if (item) {
      Object.assign(categoryForm, {
        id: item._id || item.id,
        name: item.name,
        slug: item.slug,
        type: 'news'
      })
    } else {
      Object.assign(categoryForm, { id: null, name: '', slug: '', type: 'news' })
    }
  } else if (type === 'news') {
    if (item) {
      Object.assign(newsForm, {
        id: item._id || item.id,
        title: item.title,
        excerpt: item.excerpt || '',
        content: item.content || '',
        image: item.image || '',
        category: item.category || 'Market Analysis',
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
        isTrending: item.isTrending || false,
        readTime: item.readTime || '5 min'
      })
    } else {
      Object.assign(newsForm, {
        id: null,
        title: '',
        excerpt: '',
        content: '',
        image: '',
        category: 'Market Analysis',
        tags: '',
        isTrending: false,
        readTime: '5 min',
        status: 'published',
        publishedAt: new Date().toISOString().slice(0, 16)
      })
    }
  } else if (type === 'user') {
    if (item) {
      Object.assign(userForm, {
        id: item._id || item.id,
        accountType: item.accountType || 'basic',
        premiumStartDate: item.premiumStartDate ? new Date(item.premiumStartDate).toISOString().split('T')[0] : '',
        premiumEndDate: item.premiumEndDate ? new Date(item.premiumEndDate).toISOString().split('T')[0] : ''
      })
    } else {
      // Should not happen as we only edit users
      Object.assign(userForm, { id: null, accountType: 'basic', premiumStartDate: '', premiumEndDate: '' })
    }
  }
}


const closeModal = () => {
  showModal.value = false
  editingUpdateIndex.value = -1
  newUpdate.title = ''
  newUpdate.content = ''
  newUpdate.date = new Date().toISOString().split('T')[0]
}

const handleFileUpload = async (event, formType) => {
  const file = event.target.files[0]
  if (!file) return

  isLoading.value = true
  try {
    const response = await UploadImageCypher43(file)
    if (formType === 'airdrop') {
      airdropForm.image = response.imageUrl
    } else if (formType === 'tool') {
      toolForm.image = response.imageUrl
    } else if (formType === 'news') {
      newsForm.image = response.imageUrl
    } else if (formType === 'settings') {
      settingsForm.logoUrl = response.imageUrl
    }
  } catch (error) {
    console.error("Upload failed", error)
    showToast({ type: 'error', title: 'Upload Failed', message: error.message })
  } finally {
    isLoading.value = false
    event.target.value = ''
  }
}

const editingUpdateIndex = ref(-1)

const newUpdate = reactive({
  title: '',
  content: '',
  date: new Date().toISOString().split('T')[0]
})

const editUpdate = (index) => {
  editingUpdateIndex.value = index
  const update = airdropForm.updates[index]
  newUpdate.title = update.title
  newUpdate.content = update.content
  newUpdate.date = update.date ? new Date(update.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
}

const cancelEditUpdate = () => {
  editingUpdateIndex.value = -1
  newUpdate.title = ''
  newUpdate.content = ''
  newUpdate.date = new Date().toISOString().split('T')[0]
}

const addUpdateItem = () => {
  if (!newUpdate.title || !newUpdate.content) {
    showToast({ type: 'warning', title: 'Missing Info', message: 'Title and content are required' })
    return
  }

  if (!airdropForm.updates) airdropForm.updates = []

  if (editingUpdateIndex.value !== -1) {
    // Edit existing
    airdropForm.updates[editingUpdateIndex.value] = {
      title: newUpdate.title,
      content: newUpdate.content,
      date: newUpdate.date || new Date()
    }
    cancelEditUpdate() // Reset form
  } else {
    // Add new
    airdropForm.updates.push({
      title: newUpdate.title,
      content: newUpdate.content,
      date: newUpdate.date || new Date()
    })

    // Reset
    newUpdate.title = ''
    newUpdate.content = ''
    newUpdate.date = new Date().toISOString().split('T')[0]
  }
}

const saveData = async () => {
  isLoading.value = true
  try {
    if (currentForm.value === 'airdrop') {
      const payload = {
        ...airdropForm,
        keyRequirements: airdropForm.keyRequirements ? airdropForm.keyRequirements.split(',').map(s => s.trim()) : [],
        supportChian: airdropForm.supportChian ? airdropForm.supportChian.split(',').map(s => s.trim()) : [],
        supportNetworks: airdropForm.supportNetworks ? airdropForm.supportNetworks.split(',').map(s => s.trim()) : []
      }
      // Tự động tính số lượng backers dựa trên Featured Backers
      payload.backers = payload.supportNetworks.length
      if (isEditing.value) {
        await ProductService.updateProduct(airdropForm.id, payload)
      } else {
        await ProductService.createProduct(payload)
      }
    } else if (currentForm.value === 'tool') {
      const payload = {
        ...toolForm,
        features: toolForm.features.split('\n').map(f => f.trim()).filter(f => f),
        howItWorks: toolForm.howItWorks.split('\n').map(f => f.trim()).filter(f => f),
        useCases: toolForm.useCases.split('\n').map(f => f.trim()).filter(f => f),
        badges: toolForm.badges.split(',').map(f => f.trim()).filter(f => f)
      }
      if (isEditing.value) {
        await ToolService.updateTool(toolForm.id, payload)
      } else {
        await ToolService.createTool(payload)
      }
    } else if (currentForm.value === 'category') {
      const payload = {
        name: categoryForm.name,
        slug: categorySlugComputed.value,
        type: categoryForm.type // Include type
      }
      if (isEditing.value) {
        await CategoryService.update(categoryForm.id, payload)
      } else {
        await CategoryService.create(payload)
      }

      // Refresh logic based on type
      if (payload.type === 'news') {
        await fetchNews()
      } else {
        await fetchCategories()
      }
    } else if (currentForm.value === 'news') {
      const payload = {
        ...newsForm,
        tags: newsForm.tags.split(',').map(tag => tag.trim()).filter(t => t)
      }
      if (isEditing.value) {
        await NewsService.update(newsForm.id, payload)
      } else {
        await NewsService.create(payload)
      }
    } else if (currentForm.value === 'user') {
      const payload = {
        accountType: userForm.accountType,
        premiumStartDate: userForm.premiumStartDate,
        premiumEndDate: userForm.premiumEndDate
      }
      await UserService.updateStatus(userForm.id, payload)
    }

    closeModal()
    fetchData()
    showToast({
      type: 'success',
      title: isEditing.value ? 'Updated Successfully' : 'Created Successfully',
      message: `${currentForm.value === 'airdrop' ? 'Airdrop' : currentForm.value === 'tool' ? 'Tool' : currentForm.value === 'user' ? 'User' : 'Category'} has been ${isEditing.value ? 'updated' : 'created'}.`
    })
  } catch (error) {
    console.error("Save failed", error)
    showToast({ type: 'error', title: 'Save Failed', message: error.message })
  } finally {
    isLoading.value = false
  }
}

const deleteAirdrop = async (id) => {
  const confirmed = await showConfirm({
    type: 'danger',
    title: 'Delete Airdrop',
    message: 'Are you sure you want to delete this airdrop? This action cannot be undone.',
    confirmText: 'Delete'
  })

  if (!confirmed) return

  try {
    await ProductService.deleteProduct(id)
    fetchData()
    showToast({ type: 'success', title: 'Deleted', message: 'Airdrop deleted successfully.' })
  } catch (e) {
    console.error(e)
    showToast({ type: 'error', title: 'Delete Failed', message: e.message })
  }
}

const deleteTool = async (id) => {
  const confirmed = await showConfirm({
    type: 'danger',
    title: 'Delete Tool',
    message: 'Are you sure you want to delete this tool? This action cannot be undone.',
    confirmText: 'Delete'
  })

  if (!confirmed) return

  try {
    await ToolService.deleteTool(id)
    fetchData()
    showToast({ type: 'success', title: 'Deleted', message: 'Tool deleted successfully.' })
  } catch (e) {
    console.error(e)
    showToast({ type: 'error', title: 'Delete Failed', message: e.message })
  }
}

const deleteCategoryItem = async (id) => {
  const confirmed = await showConfirm({
    type: 'danger',
    title: 'Xóa danh mục',
    message: 'Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.',
    confirmText: 'Xóa'
  })

  if (!confirmed) return

  try {
    await CategoryService.delete(id)
    if (currentTab.value === 'news') {
      await fetchNews()
    } else {
      await fetchData()
    }
    showToast({ type: 'success', title: 'Đã xóa', message: 'Danh mục đã được xóa thành công.' })
  } catch (e) {
    console.error(e)
    showToast({ type: 'error', title: 'Lỗi xóa', message: e.message })
  }
}

const deleteNews = async (id) => {
  const confirmed = await showConfirm({
    type: 'danger',
    title: 'Xóa tin tức',
    message: 'Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.',
    confirmText: 'Xóa'
  })

  if (!confirmed) return

  try {
    await NewsService.delete(id)
    fetchData()
    showToast({ type: 'success', title: 'Đã xóa', message: 'Tin tức đã được xóa thành công.' })
  } catch (e) {
    console.error(e)
    showToast({ type: 'error', title: 'Lỗi xóa', message: e.message })
  }
}

const handleDeleteMultiple = async (ids) => {
  if (!ids || ids.length === 0) return

  isLoading.value = true
  let successCount = 0
  let failCount = 0

  try {
    if (currentTab.value === 'airdrop') {
      for (const id of ids) {
        try {
          await ProductService.deleteProduct(id)
          successCount++
        } catch (e) {
          failCount++
          console.error(`Failed to delete airdrop ${id}`, e)
        }
      }
    } else if (currentTab.value === 'tools') {
      for (const id of ids) {
        try {
          await ToolService.deleteTool(id)
          successCount++
        } catch (e) {
          failCount++
          console.error(`Failed to delete tool ${id}`, e)
        }
      }
    } else if (currentTab.value === 'news') {
      for (const id of ids) {
        try {
          await NewsService.delete(id)
          successCount++
        } catch (e) {
          failCount++
          console.error(`Failed to delete news ${id}`, e)
        }
      }
    }
  } catch (error) {
    console.error("Batch delete error", error)
  } finally {
    isLoading.value = false
    fetchData()
    if (successCount > 0) {
      showToast({ type: 'success', title: 'Xóa hoàn tất', message: `Đã xóa thành công ${successCount} mục.${failCount > 0 ? ` Lỗi ${failCount} mục.` : ''}` })
    } else if (failCount > 0) {
      showToast({ type: 'error', title: 'Lỗi xóa', message: `Không thể xóa các mục đã chọn.` })
    }
  }
}

const toggleUserStatus = async (user) => {
  openModal('user', user)
}

</script>
