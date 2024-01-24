// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/model/json/JSONModel",
// 	"../model/formatter",
// 	"sap/ui/model/Filter",
// 	"sap/ui/model/FilterOperator"
// ], (Controller, JSONModel, formatter, Filter, FilterOperator) => {
// 	"use strict";

// 	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
// 		formatter: formatter, 
		
// 		onInit() {
			
// 			var oModel = new sap.ui.model.json.JSONModel({
// 				invoice_product: "",  
// 				invoice_quantity: 0   
// 			  });
	  
// 			  this.getView().setModel(oModel, "invoiceModel");
		
// 			$.ajax({
// 				url: 'https://port4004-workspaces-ws-cbkhj.ap21.trial.applicationstudio.cloud.sap/odata/v4/invoice/Invoice',
// 				type: 'GET',
// 				dataType: 'json',
// 				success: function (data) {
// 					console.log('서버 응답:', data.value);
// 					oModel.setData(data.value);
// 					console.log(oModel);
// 				}.bind(this), 
// 				error: function (error) {
// 					console.error('에러 발생:', error);
// 				}
// 			});

			
			
// 		},

// 		onFilterInvoices(oEvent) {
// 			// build filter array
// 			const aFilter = [];
// 			const sQuery = oEvent.getParameter("query");
// 			if (sQuery) {
// 				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
// 			}

// 			// filter binding
// 			const oList = this.byId("invoiceList");
// 			const oBinding = oList.getBinding("items");
// 			oBinding.filter(aFilter);
// 		},

//         onPress(oEvent) {
// 			const oItem = oEvent.getSource();
// 			const oRouter = this.getOwnerComponent().getRouter();
// 			oRouter.navTo("detail", {
// 				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
// 			});
//         }    
// 	});
// });



sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, formatter, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
		formatter: formatter, 
		
		onInit: function () {
			var oModel = new JSONModel(sap.ui.require.toUrl("ui5/walkthrough/model/items.json"));
			this.getView().setModel(oModel);
		},

		onFilterInvoices(oEvent) {
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

        onPress(oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
        }    
	});
});


