export default {
    template: `            <div class="modal-dialog  modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title" id="productModalLabel">
                            <span v-if="isNew">新增產品</span>
                            <span v-else>編輯產品</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="" class="row">
                            <div class="col-4">
                                <div class="mb-5">
                                    <label for="imageUrl" class="form-label">主要圖片</label>
                                    <input type="text" placeholder="請輸入圖片連結" id="imageUrl" class="form-control"
                                        v-model="tempProduct.imageUrl">
                                    <img :src="tempProduct.imageUrl" alt="" class="img-fluid">
                                </div>
                                <div>
                                    <h4>多圖新增</h4>
                                    <div v-if="Array.isArray(tempProduct.imagesUrl)">
                                        <template v-for="(image, key) in tempProduct.imagesUrl" :key="key+5566"
                                            class="mb-2">
                                            <div class="d-flex justify-content-space-between">
                                                <label :for="image" class="form-label">圖片網址{{key+1}}</label>
                                                <!-- 刪除按鈕 -->
                                                <button type="button" class="btn-close btn-sm ms-auto"
                                                    aria-label="removeImage"
                                                    @click="tempProduct.imagesUrl.splice(key,1)"></button>
                                            </div>
                                            <input type="text" placeholder="請輸入圖片連結" class="form-control mb-1"
                                                v-model="tempProduct.imagesUrl[key]" :id="image">
                                            <img :src="image" alt="" class="img-fluid mb-4">
                                        </template>
                                        <div v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]||!tempProduct.imagesUrl.length">
                                            <button class="btn btn-outline-primary w-100 mb-3" type="button"
                                                
                                                @click="tempProduct.imagesUrl.push('')">新增圖片網址</button>
                                            <p class="text-center">或</p>
                                            <div class="mb-3" >
                                                <input class="form-control" type="file" id="formFile" @change="uploadImage">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class=" col-8">
                                <div class="row gy-3">
                                    <div class="col-12">
                                        <label for="productTitle" class="form-label">標題</label>
                                        <input type="text" id="productTitle" class="form-control" placeholder="請輸入標題"
                                            v-model="tempProduct.title">
                                    </div>
                                    <div class="col-6">
                                        <label for="productCategory" class="form-label">分類</label>
                                        <input type="text" id="productCategory" class="form-control" placeholder="請輸入分類"
                                            v-model="tempProduct.category">
                                    </div>
                                    <div class="col-6">
                                        <label for="productUnit" class="form-label">單位</label>
                                        <input type="text" id="productUnit" class="form-control" placeholder="請輸入單位"
                                            v-model="tempProduct.unit">
                                    </div>
                                    <div class="col-6">
                                        <label for="productOriginPrice" class="form-label">原價</label>
                                        <input type="number" id="productOriginPrice" class="form-control"
                                            placeholder="請輸入原價" min="0" v-model.number="tempProduct.origin_price">
                                    </div>
                                    <div class="col-6">
                                        <label for="productPrice" class="form-label">售價</label>
                                        <input type="number" id="productPrice" class="form-control" placeholder="請輸入售價"
                                            min="0" v-model.number="tempProduct.price">
                                    </div>
                                    <hr>
                                    <div class="col-12">
                                        <label for="productDescription" class="form-label">產品描述</label>
                                        <textarea id="productDescription" rows="3" class="form-control"
                                            v-model="tempProduct.description"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <label for="productContent" class="form-label">說明內容</label>
                                        <textarea id="productContent" rows="3" class="form-control"
                                            v-model="tempProduct.content"></textarea>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="is_enabled" class="form-check-input"
                                            v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                                        <label for="is_enabled" class="form-label">是否啟用</label>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>`,
    props: ["tempProduct", "isNew", "updateProduct", "uploadImage"],
};
