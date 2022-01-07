import Vue from "vue";
import VueRouter from "vue-router";


const Login = () => import("@/renderer/views/login");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Login
    },
];

const router = new VueRouter({
    routes,
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    let token;
    if (sessionStorage.getItem("token")) {
        token = JSON.parse(sessionStorage.getItem("token")).access_token;
    }
    if (to.path !== "/login" && !token) {
        next({
            path: "/login"
        });
    } else {
        next();
    }
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
export default router;
