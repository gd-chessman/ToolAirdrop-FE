import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/pages/HomePage.vue";
import AirdropDetail from "../components/pages/AirdropDetail.vue";
import Tools from "../components/pages/Tools.vue";
import Pricing from "../components/pages/Pricing.vue";
import Opportunities from "@/components/pages/Opportunities.vue";
import { reactive } from "vue";
import Login from "@/components/admin/Login.vue";
import DashBoard from "@/components/admin/DashBoard.vue";
import { useAuthStore } from "@/stores/auth";

const scrollPositions = reactive({});

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/airdrops",
    name: "Airdrops",
    component: AirdropDetail,
  },
  {
    path: "/airdrops/:id",
    name: "AirdropDetail",
    component: AirdropDetail,
    props: true,
  },
  {
    path: "/tool",
    name: "Tool",
    component: Tools,
  },
  {
    path: "/tools",
    name: "Tools",
    component: Tools,
  },
  {
    path: "/tools/:id",
    name: "ToolDetail",
    component: () => import("../components/pages/ToolDetail.vue"),
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing,
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../components/pages/News.vue"),
  },
  {
    path: "/news/:id",
    name: "NewsDetail",
    component: () => import("../components/pages/NewsDetail.vue"),
  },
  {
    path: "/payment/success",
    name: "PaymentSuccess",
    component: () => import("../components/pages/PaymentSuccess.vue"),
  },
  {
    path: "/payment/error",
    name: "PaymentError",
    component: () => import("../components/pages/PaymentError.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: HomePage,
  },
  {
    path: "/opportunities",
    name: "Opportunities",
    component: Opportunities,
    children: [
      {
        name: "DetailAirdrop",
        path: "detail/:id",
        component: AirdropDetail,
      },
    ],
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    component: () => import("@/components/pages/Watchlist.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/verify-email/:token",
    name: "VerifyEmail",
    component: () => import("@/components/pages/VerifyEmail.vue"),
  },
  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: () => import("@/components/pages/ResetPassword.vue"),
  },
  {
    name: "Admin",
    path: "/admin",
    redirect: { name: 'Login' },
    children: [
      {
        name: "Login",
        path: "login",
        component: Login,
        meta: { requireGuest: true },
      },
      {
        name: "Dashboard",
        path: "dashboard",
        component: DashBoard,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            redirect: "overview"
          },
          {
            path: "overview",
            name: "DashboardOverview",
            component: () => import("@/components/admin/tabs/OverviewTab.vue"),
          },
          {
            path: "airdrop",
            name: "DashboardAirdrop",
            component: () => import("@/components/admin/tabs/AirdropTab.vue"),
          },
          {
            path: "tools",
            name: "DashboardTools",
            component: () => import("@/components/admin/tabs/ToolsTab.vue"),
          },
          {
            path: "category",
            name: "DashboardCategory",
            component: () => import("@/components/admin/tabs/CategoryTab.vue"),
          },
          {
            path: "user",
            name: "DashboardUser",
            component: () => import("@/components/admin/tabs/UserTab.vue"),
          },
          {
            path: "news",
            name: "DashboardNews",
            component: () => import("@/components/admin/tabs/NewsTab.vue"),
          },
          {
            path: "settings",
            name: "DashboardSettings",
            component: () => import("@/components/admin/tabs/SettingsTab.vue"),
          },
        ]
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition; // back/forward browser
    if (scrollPositions[to.fullPath] != null) {
      return { top: scrollPositions[to.fullPath] }; // router.push()
    }
    return { top: 0 }; // default scroll lên đầu
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // lưu scroll của route hiện tại
  scrollPositions[from.fullPath] = window.scrollY || 0;

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "Login" });
  }

  if (to.meta.requireGuest && authStore.isAuthenticated) {
    return next({ name: "DashboardOverview" });
  }

  next();
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const isDynamicImportFailed = error.message.includes('Failed to fetch dynamically imported module') || error.message.includes('Importing a module script failed');

  if (isChunkLoadFailed || isDynamicImportFailed) {
    // window.location.reload();
    // Thay vì reload ngay lập tức có thể gây lặp vô hạn nếu lỗi server, 
    // ta check xem đã reload chưa
    const targetPath = router.currentRoute.value.fullPath;
    console.log('Chunk load error, reloading:', targetPath);
    window.location.reload();
  }
});

export default router;
