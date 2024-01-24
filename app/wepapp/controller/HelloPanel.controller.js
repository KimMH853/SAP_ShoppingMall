sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], (Controller, MessageToast) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
		onShowHello() {
			// read msg from i18n model
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			const sRecipient = this.getView().getModel().getProperty("/recipient/name");
			const sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},

		onOpenDialog() {
			// create dialog lazily
			this.pDialog ??= this.loadFragment({
				name: "ui5.walkthrough.view.HelloDialog"
			});

			this.pDialog.then((oDialog) => oDialog.open());
		},

		onCloseDialog() {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("helloDialog").close();
		},

		onPressRequestList: function() {
			// 버튼 클릭 시 requestList 페이지로 이동
			this.getOwnerComponent().getRouter().navTo("requestList");
		},

		onGoToOrderPage: function() {
		// Get the router instance from the owner component
		var oRouter = this.getOwnerComponent().getRouter();
	
		// Navigate to the OrderPage route
		oRouter.navTo("OrderPage");
		},
		onGoToUpdatePage: function() {
			// Get the router instance from the owner component
			var oRouter = this.getOwnerComponent().getRouter();
		
			// Navigate to the OrderPage route
			oRouter.navTo("updatePage");
			},
		onGoToDeletePage: function() {
			// Get the router instance from the owner component
			var oRouter = this.getOwnerComponent().getRouter();
		
			// Navigate to the OrderPage route
			oRouter.navTo("deletePage");
			},      
	});
});
