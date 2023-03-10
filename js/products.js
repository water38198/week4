const url = "https://vue3-course-api.hexschool.io/";
const api_path = "payroom";
let productModal = {};
let delModal = {};
import pagination from "./components/pagination.js";
import productModalComponent from "./components/productModal.js";
import delModalComponent from "./components/delModal.js";

const app = {
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: true,
            page: {},
        };
    },
    components: { pagination, productModalComponent, delModalComponent },
    methods: {
        //驗證登入
        checkLogin() {
            axios
                .post(`${url}v2/api/user/check`)
                .then((res) => {
                    this.getProducts();
                })
                .catch((err) => {
                    alert("請先登入");
                    location.href = "index.html";
                });
        },
        //取得產品資料
        getProducts(page = 1) {
            axios
                .get(`${url}v2/api/${api_path}/admin/products?page=${page}`)
                .then((res) => {
                    this.products = res.data.products;
                    this.page = res.data.pagination;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        openModal(status, product) {
            if (status === "new") {
                productModal.show();

                this.isNew = true;
                this.tempProduct = {
                    imagesUrl: [],
                };
            } else if (status === "edit") {
                productModal.show();

                this.isNew = false;
                this.tempProduct = { ...product };
            } else if (status === "delete") {
                delModal.show();
                this.tempProduct = { ...product };
            }
            // 避免找不到imagesUrl而跳錯
            if (!this.tempProduct.imagesUrl) {
                this.tempProduct.imagesUrl = [];
            }
        },
        updateProduct() {
            let method = "post";
            let apiUrl = `${url}v2/api/${api_path}/admin/product`;
            if (!this.isNew) {
                apiUrl = `${url}v2/api/${api_path}/admin/product/${this.tempProduct.id}`;
                method = "put";
            }
            axios[method](apiUrl, {
                data: this.tempProduct,
            })
                .then(() => {
                    this.getProducts();
                    productModal.hide();
                    this.tempProduct = {
                        imagesUrl: [],
                    };
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        uploadImage() {
            const file = document.querySelector("#formFile");
            const formData = new FormData();
            formData.append("file-to-upload", file.files[0]);
            axios
                .post(`${url}v2/api/${api_path}/admin/upload`, formData)
                .then((res) => {
                    if (res.data.imageUrl) {
                        this.tempProduct.imagesUrl.push(res.data.imageUrl);
                        file.value = "";
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        },
        deleteProduct() {
            axios
                .delete(
                    `${url}v2/api/${api_path}/admin/product/${this.tempProduct.id}`
                )
                .then(() => {
                    delModal.hide();
                    this.getProducts();
                    alert("刪除成功!");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        //抓取Cookie
        const myToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("myToken="))
            ?.split("=")[1];
        // axios header
        axios.defaults.headers.common["Authorization"] = myToken;
        this.checkLogin();

        // Modal建立
        productModal = new bootstrap.Modal("#productModal");
        delModal = new bootstrap.Modal("#deleteModal");
    },
};

Vue.createApp(app).mount("#productApp");
