export default {
    template: `            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">確認刪除</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        您確定要刪除此產品嗎?{{tempProduct.title}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-outline-danger" @click="deleteProduct">刪除</button>
                    </div>
                </div>
            </div>`,
    props: ["tempProduct", "deleteProduct"],
};
