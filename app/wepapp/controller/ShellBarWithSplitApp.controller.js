sap.ui.define([
	'sap/ui/Device',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library'
], function ( Device, Controller, JSONModel, Popover, Button, mobileLibrary) {
	"use strict";

	var CController = Controller.extend("ui5.walkthrough.controller.ShellBarWithSplitApp", {
		onInit : function() {
			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("ui5/walkthrough/model/model.json"), null, false);
			this.getView().setModel(this.oModel);


			
			var productoModel = new sap.ui.model.json.JSONModel({
				product_id: 0,
				product_name: "",
				product_description: "",
				product_image: "",
				product_price: 0,
				stock_quantity: 0,
				category_id: 0
			});
			
			
			this.getView().setModel(productoModel, "productoModel");
		
			$.ajax({
				url: 'https://port4004-workspaces-ws-bsc8r.ap21.trial.applicationstudio.cloud.sap/odata/v4/shopping-mall/Product',
				type: 'GET',
				dataType: 'json',
				success: function (data) {
					console.log('서버 응답:', data.value);
					productoModel.setData(data.value);
					console.log(oModel);
				}.bind(this), 
				error: function (error) {
					console.error('에러 발생:', error);
				}
			});
		},

		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
		},

		onMenuButtonPress : function() {
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		onHomeButtonPress: function() {
			// Get the router instance from the owner component
			var oRouter = this.getOwnerComponent().getRouter();
		
			// Navigate to the OrderPage route
			oRouter.navTo("overview");
      	},
		  onPress(oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				productPath: window.encodeURIComponent(oItem.getBindingContext("productoModel").getPath().substr(1))
			});
		}	
	});


	return CController;

});
