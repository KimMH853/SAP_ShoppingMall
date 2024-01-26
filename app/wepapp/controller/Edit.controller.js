// sap.ui.define([
//    "sap/ui/core/mvc/Controller",
//    "sap/ui/core/routing/History",
//    "sap/ui/model/json/JSONModel" // Make sure to include this line
// ], function (Controller, History, JSONModel) {
//    "use strict";

//    return Controller.extend("ui5.walkthrough.controller.Edit", {
//        onInit: function () {
//            const oRouter = this.getOwnerComponent().getRouter();
//            oRouter.getRoute("edit").attachPatternMatched(this.onEditMatched, this);

//            const oEditModel = new JSONModel();
//             this.getView().setModel(oEditModel, "oEditModel");
//        },

//        handleModelUpdate: function (oData) {
//          console.log("update")
//          // 라우터 이벤트로 전달받은 모델 데이터를 페이지2의 모델에 설정
//          const oEditModel = this.getView().getModel("oEditModel");
//          oEditModel.setData(oData);
//      }
//    });
// });

// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/Label",
//     "sap/m/Input",
//     "sap/m/Button",
//     "sap/m/VBox",
//     "sap/m/Page",
//     "sap/m/Panel",
//    "sap/ui/core/routing/History"
// ], function (Controller, History) {
//    "use strict";

//    return Controller.extend("ui5.walkthrough.controller.Edit", {
    
   
//     onInit: function () {
//         const oRouter = this.getOwnerComponent().getRouter();
//         oRouter.getRoute("edit").attachPatternMatched(this.onObjectMatched, this);
//         console.log("bye");
//     },

//     onObjectMatched: function (oEvent) {
//         console.log("hihi");
//         const oArgs = oEvent.getParameter("arguments");
//         const sProductPath = oArgs.productPath;
        
//         console.log(sProductPath);

//         const oProductModel = new JSONModel({
//             product_id: sProductPath,
//             product_name: "",
//             product_description: "",
//             product_image: "",
//             product_price: 0,
//             stock_quantity: 0,
//             category_id: 0
//         });


//         this.getView().setModel(oProductModel, "product");

//         $.ajax({
//             url: 'https://port4004-workspaces-ws-bsc8r.ap21.trial.applicationstudio.cloud.sap/odata/v4/shopping-mall/Product',
//             type: 'GET',
//             dataType: 'json',
//             data: {
//                 $filter: `product_id eq '${sProductPath}'`
//             },
//             success: function (data) {
//                 console.log('서버 응답:', data);
//                 oProductModel.setData(data.value[0]);
//                 console.log(oProductModel);
//             }.bind(this),
//             error: function (error) {
//                 console.error('에러 발생:', error);
//             }
//         });
        
//     },
//    });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel", // 모듈 추가
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/m/Page",
    "sap/m/Panel",
    "sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.Edit", {
    
   
    onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("edit").attachPatternMatched(this.onObjectMatched, this);
        console.log("bye");
    },

    onObjectMatched: function (oEvent) {
        console.log("hihi");
        const oArgs = oEvent.getParameter("arguments");
        const sProductPath = oArgs.productPath;
        this.sProductPath = sProductPath;
        console.log(sProductPath);

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

    onCreateOrder: function () {
        const oProductModel = this.getView().getModel("product");
        const oData = oProductModel.getData();
        const price = parseInt(oData.product_price);
        const quantity = parseInt(oData.stock_quantity)
        console.log(quantity);


        const oRouter = this.getOwnerComponent().getRouter();
        
        $.ajax({
            url: `https://port4004-workspaces-ws-bsc8r.ap21.trial.applicationstudio.cloud.sap/odata/v4/shopping-mall/Product/${oData.product_id}`,
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({
                product_name: oData.product_name,
                product_description: oData.product_description,
                product_price: price,
                stock_quantity: quantity
                // 필요한 경우 수정할 다른 속성들을 추가하세요.
            }),
            success: function (data) {
                console.log('수정 성공:', data);
                
                oRouter.navTo("detail", {
                productPath: oData.product_id    
                });
                console.log(oData.product_id);
            },
            error: function (error) {
                console.error('에러 발생:', error);
            }
        });
    },



   });
});