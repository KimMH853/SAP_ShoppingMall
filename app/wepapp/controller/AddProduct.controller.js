sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/m/Page",
    "sap/m/Panel"
], function (Controller, JSONModel, Label, Input, Button, VBox, Page, Panel) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.AddProduct", {
        onInit: function () {
			
			
            var oModel = new JSONModel({
                product_id: "",
                product_name: "",
                product_description: "",
                product_image: "",
                product_price: 0,
                stock_quantity: 0,
                category_id: 0
            });

            this.getView().setModel(oModel, "oProductModel");
        },

        onCreateOrder: function () {
            var oProductModel = this.getView().getModel("oProductModel");
            var oData = oProductModel.getData();
			let product_id = 57;
            const quantityAsNumber = parseInt(oData.stock_quantity);
            const price = parseInt(oData.product_price);
			const stringId = String(product_id)
			console.log(stringId)
            let temp = {
                product_id: stringId,
                product_name: oData.product_name,
                product_description: oData.product_description,
                product_image: "",
                product_price: price,
                stock_quantity: quantityAsNumber,
                category_id: 0
            };
            const oRouter = this.getOwnerComponent().getRouter();

           


            $.ajax({
                type: "POST",
                url: "https://port4004-workspaces-ws-bsc8r.ap21.trial.applicationstudio.cloud.sap/odata/v4/shopping-mall/Product",
                contentType: "application/json",
                data: JSON.stringify(temp),
                success: function (response) {
                    console.log('서버 응답:', response);
                    oRouter.navTo("shellBarWithSplitApp");
                    product_id++;
                },
                error: function (error) {
                    console.error('에러 발생:', error);
                }
            });
			
        }
    });
});
