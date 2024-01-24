
sap.ui.define([
   "sap/ui/core/mvc/Controller",
 
], (Controller) => {
   "use strict";

   return Controller.extend("ui5.walkthrough.controller.App", {
      onAdminButtonPress: function() {
			// Get the router instance from the owner component
			var oRouter = this.getOwnerComponent().getRouter();
		
			// Navigate to the OrderPage route
			oRouter.navTo("shellBarWithSplitApp");
      },

      
   });
});
