// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/m/MessageToast",
// 	"sap/ui/model/json/JSONModel"
// ], function (Controller, MessageToast, JSONModel) {
// 	"use strict";

// 	return Controller.extend("Quickstart.controller.App", {
// 		onPress : function () {
// 			MessageToast.show("Hello UI5!");
// 			this.byId("app2").to(this.byId("intro"));
// 		},

// 		onInit : function () {
// 			this.getView().setModel(new JSONModel({
// 					features: [
// 						"Enterprise-Ready Web Toolkit",
// 						"Powerful Development Concepts",
// 						"Feature-Rich UI Controls",
// 						"Consistent User Experience",
// 						"Free and Open Source",
// 						"Responsive Across Browsers and Devices"
// 					]
// 				})
// 			);
// 		},

// 		onChange: function (oEvent) {
// 			var bState = oEvent.getParameter("state");
// 			this.byId("ready").setVisible(bState);
// 		}
// 	});

// });


sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent" // 추가
  ], function (Controller, MessageToast, JSONModel, UIComponent) {
	"use strict";
  
	return Controller.extend("Quickstart.controller.App", {
	  onPress: function () {
		MessageToast.show("Hello UI5!");
		
		// UIComponent를 사용하여 뷰 이동
		UIComponent.getRouterFor(this).navTo("testView");
	  },
  
	  // 나머지 코드는 그대로 유지
	  onInit : function () {
		this.getView().setModel(new JSONModel({
				features: [
					"Enterprise-Ready Web Toolkit",
					"Powerful Development Concepts",
					"Feature-Rich UI Controls",
					"Consistent User Experience",
					"Free and Open Source",
					"Responsive Across Browsers and Devices"
				]
			})
		);
	},

	onChange: function (oEvent) {
		var bState = oEvent.getParameter("state");
		this.byId("ready").setVisible(bState);
	}
	});
  });