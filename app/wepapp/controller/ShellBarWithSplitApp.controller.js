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
	});


	return CController;

});
