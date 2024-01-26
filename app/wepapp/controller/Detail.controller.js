// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
//     "sap/ui/core/routing/History",
//     "sap/ui/model/json/JSONModel"
// ], (Controller, History) => {
// 	"use strict";

// 	return Controller.extend("ui5.walkthrough.controller.Detail", {
// 		onInit: function () {
//             const oRouter = this.getOwnerComponent().getRouter();
//             oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
//             console.log("bye");
//         },

//         onObjectMatched: function (oEvent) {
//             console.log("hihi");
//             const oArgs = oEvent.getParameter("arguments");
//             const sProductPath = oArgs.productPath;
//             console.log(oArgs);

//             // 여기에서 모델 업데이트 및 뷰 바인딩 등의 로직을 수행합니다.
//             const oProductModel = new JSONModel({
//                 id: sProductPath,
               
//                 name: "상품명",
//                 price: "가격",
//                 description: "상품 설명"
//                 // 추가적인 상세 정보 필드들...
//             });

//             this.getView().setModel(oProductModel, "product");
//         },

// 		onNavBack() {
// 			const oHistory = History.getInstance();
// 			const sPreviousHash = oHistory.getPreviousHash();

// 			if (sPreviousHash !== undefined) {
// 				window.history.go(-1);
// 			} else {
// 				const oRouter = this.getOwnerComponent().getRouter();
// 				oRouter.navTo("shellBarWithSplitApp", {}, true);
// 			}
// 		}
// 	});
// });


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/routing/History",
//     "sap/ui/model/json/JSONModel"
// ], (Controller, History, JSONModel) => {
//     "use strict";

//     return Controller.extend("ui5.walkthrough.controller.Detail", {
//         onInit: function () {
//             const oRouter = this.getOwnerComponent().getRouter();
//             oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
//             console.log("bye");
//         },

//         onObjectMatched: function (oEvent) {
//             console.log("hihi");
//             const oArgs = oEvent.getParameter("arguments");
//             const sProductPath = oArgs.productPath;
//             console.log(oArgs);

//             // 여기에서 모델 업데이트 및 뷰 바인딩 등의 로직을 수행합니다.
//             const oProductModel = new JSONModel({
//                 id: sProductPath,
//                 name: "상품명",
//                 price: "가격",
//                 description: "상품 설명"
//                 // 추가적인 상세 정보 필드들...
//             });

//             this.getView().setModel(oProductModel, "product");
//         },

//         onNavBack() {
//             const oHistory = History.getInstance();
//             const sPreviousHash = oHistory.getPreviousHash();

//             if (sPreviousHash !== undefined) {
//                 window.history.go(-1);
//             } else {
//                 const oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("shellBarWithSplitApp", {}, true);
//             }
//         }
//     });
// });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.Detail", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
            console.log("bye");
        },

        onObjectMatched: function (oEvent) {
            console.log("hihi");
            const oArgs = oEvent.getParameter("arguments");
            const sProductPath = oArgs.productPath;
            console.log(sProductPath);
            this.sProductPath = sProductPath;

            const oProductModel = new JSONModel({
                product_id: sProductPath,
				product_name: "",
				product_description: "",
				product_image: "",
				product_price: 0,
				stock_quantity: 0,
				category_id: 0
            });


            this.getView().setModel(oProductModel, "product");

            $.ajax({
                url: 'https://port4004-workspaces-ws-bsc8r.ap21.trial.applicationstudio.cloud.sap/odata/v4/shopping-mall/Product',
                type: 'GET',
                dataType: 'json',
                data: {
                    $filter: `product_id eq '${sProductPath}'`
                },
                success: function (data) {
                    console.log('서버 응답:', data);
                    oProductModel.setData(data.value[0]);
                    console.log(oProductModel);
                }.bind(this),
                error: function (error) {
                    console.error('에러 발생:', error);
                }
            });
            
        },

        onNavBack() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("shellBarWithSplitApp");
        },
       


        onEditPress: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            const oProductModel = this.getView().getModel("product");
        
            // 모델 설정
            const oEditProductModel = new JSONModel(oProductModel.getData());
            oRouter.getRoute("edit").attachMatched(function() {
                this.getView().setModel(oEditProductModel, "editProduct");
            }, this);
        
            // 현재 상품의 아이디 가져오기
            const sProductPath = oProductModel.getProperty("/product_id");
        
            // "edit" 라우트로 이동하면서 상품 아이디 전달
            oRouter.navTo("edit", {
                productPath: sProductPath
            });
        },


        onDeleltePress() {
            const oRouter = this.getOwnerComponent().getRouter();
            
            console.log(this.sProductPath);
            const productId = this.sProductPath;
            $.ajax({
                url: 'https://port4004-workspaces-ws-bsc8r.ap21.trial.applicationstudio.cloud.sap/odata/v4/shopping-mall/Product/' + productId,
                type: 'DELETE',
                success: function(response) {
                    console.log('상품 ID ' + productId + '이(가) 성공적으로 삭제되었습니다.', response);
                    oRouter.navTo("shellBarWithSplitApp");
                },
                error: function(error) {
                    console.error('삭제 중 에러 발생:', error);
                }
            });

            
            
        },
        
    });
});