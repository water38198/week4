const url = "https://vue3-course-api.hexschool.io/";

const app = {
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        login() {
            axios
                .post(`${url}v2/admin/signin`, {
                    username: this.user.username,
                    password: this.user.password,
                })
                .then((res) => {
                    console.log(res);
                    const { expired, token } = res.data;
                    document.cookie = `myToken=${token}; expires=${new Date(
                        expired
                    )}`;
                    alert("登入成功");
                    window.location = "products.html";
                })
                .catch((err) => {
                    console.log(err);
                    alert("登入失敗");
                });
        },
    },
};
Vue.createApp(app).mount("#loginApp");
