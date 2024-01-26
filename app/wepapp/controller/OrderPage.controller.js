// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
//   ], function(Controller, JSONModel) {
//     "use strict";

//     return Controller.extend("ui5.walkthrough.controller.OrderPage", {
//       onInit: function() {
//         // 모델 로드 및 설정
//         var oModel = new sap.ui.model.json.JSONModel({
//           invoice_product: "",  // 초기값 설정
//           invoice_quantity: 0    // 초기값 설정
//         });

//         this.getView().setModel(oModel, "invoiceModel");
//       },

//       onCreateOrder: function() {
//         var oModel = this.getView().getModel("invoiceModel");
//         var oData = oModel.getData();

//         // Call OData service to create a new order
//         var oOrders = this.getView().getModel("odataModel").getProperty("/Orders");
//         oOrders.create(oData);

//         // Reset the form after creating the order
//         oModel.setProperty("/invoice_product", "");
//         oModel.setProperty("/invoice_quantity", 0);
//       }
//     });
//   });


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
//   ], function(Controller, JSONModel) {
//     "use strict";

//     return Controller.extend("ui5.walkthrough.controller.OrderPage", {
//       onInit: function() {
//         // 모델 로드 및 설정
//         var oModel = new sap.ui.model.json.JSONModel({
//           invoice_product: "",  // 초기값 설정
//           invoice_quantity: 0    // 초기값 설정
//         });

//         this.getView().setModel(oModel, "invoiceModel");
//       },

//       onCreateOrder: function() {
//         var oModel = this.getView().getModel("invoiceModel");
//         var oData = oModel.getData();

//         // 여기서 oData를 사용하여 필요한 작업 수행
//         console.log("Invoice Product: " + oData.invoice_product);
//         console.log("Invoice Quantity: " + oData.invoice_quantity);


//         oModel.setProperty("/invoice_product", "");
//         oModel.setProperty("/invoice_quantity", 0);
//       }
//     });
//   });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.OrderPage", {
        onInit: function () {
            // 모델 로드 및 설정
            var oModel = new sap.ui.model.json.JSONModel({
                invoice_product: "",  // 초기값 설정
                invoice_quantity: 0    // 초기값 설정
            });

            this.getView().setModel(oModel, "invoiceModel");
        },

        onCreateOrder: function () {
            var oModel = this.getView().getModel("invoiceModel");
            var oData = oModel.getData();
        
            
            console.log("Invoice Product: " + oData.invoice_product);
            console.log("Invoice Quantity: " + oData.invoice_quantity);
            let quantityAsNumber = parseInt(oData.invoice_quantity);
            let temp = {
                invoice_number: 4,
                invoice_product: oData.invoice_product,
                invoice_quantity: quantityAsNumber
            }
        
            $.ajax({
                type: "POST",
                url: "https://port4004-workspaces-ws-cbkhj.ap21.trial.applicationstudio.cloud.sap/odata/v4/invoice/Invoice",
                contentType: "application/json", // 수정된 Content-Type
                data: JSON.stringify(temp),
                success: function (response) {
                    // 성공적으로 처리된 경우의 코드
                    console.log('서버 응답:', response);
                },
                error: function (error) {
                    // 오류가 발생한 경우의 코드
                    console.error('에러 발생:', error);
                }
            });
        }
    });
});
