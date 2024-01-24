// // ap.ui.define([
// // 	"sap/ui/core/mvc/Controller",
// // 	"sap/ui/model/json/JSONModel",
// // 	"../model/formatter",
// // 	"sap/ui/model/Filter",
// // 	"sap/ui/model/FilterOperator"
// // ], (Controller, JSONModel, formatter, Filter, FilterOperator) => {
// // 	"use strict";

// // 	return Controller.extend("ui5.walkthrough.controller.RequestList", {
// // 		formatter: formatter, 

// // 		onInit() {
			
// //             const oRouter = this.getOwnerComponent().getRouter();
// //             oRouter.getRoute("requestList").attachPatternMatched(this.onObjectMatched, this);
            
// //             console.log("requestList")
			
// // 		},

	
// // 	});
// // });

// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/model/json/JSONModel"
//   ], function(Controller, JSONModel) {
// 	"use strict";
  
// 	return Controller.extend("ui5.walkthrough.controller.RequestList", {
// 	  onInit: function() {
// 		// 예시용 데이터 (실제 서버에서 받아오는 데이터로 대체)
// 		var aRequests = [
// 		  { request_number: 1, request_product: "Product A", request_quantity: 10 },
// 		  { request_number: 2, request_product: "Product B", request_quantity: 5 },
// 		  // 추가 데이터
// 		];
  
// 		// 모델 생성 및 데이터 설정
// 		var oModel = new JSONModel({
// 		  requests: aRequests
// 		});
  
// 		// 뷰에 모델 설정
// 		this.getView().setModel(oModel, "requestModel");
// 	  }
// 	});
//   });

// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/model/json/JSONModel",
// 	"sap/ui/thirdparty/jquery" // jQuery 추가
//   ], function(Controller, JSONModel, jQuery) {
// 	"use strict";
  
// 	return Controller.extend("ui5.walkthrough.controller.RequestList", {
// 	  onInit: function() {
// 		// 서버에서 데이터를 비동기적으로 가져오기
// 		this.fetchDataFromServer().then(function(aRequests) {
// 		  // 모델 생성 및 데이터 설정
// 		  var oModel = new JSONModel({
// 			requests: aRequests
// 		  });
  
// 		  // 뷰에 모델 설정
// 		  this.getView().setModel(oModel, "requestModel");
// 		}.bind(this));
// 	  },
  
// 	  // 서버에서 데이터를 비동기적으로 가져오는 함수
// 	  fetchDataFromServer: function() {
// 		return new Promise(function(resolve, reject) {
// 		  // 실제 서버 엔드포인트 및 요청 방법에 맞게 수정
// 		  var sServerURL = "https://api.cf.us10-001.hana.ondemand.com"; // 실제 서버 URL로 변경
  
// 		  jQuery.ajax({
// 			url: sServerURL,
// 			method: "GET",
// 			success: function(data) {
// 			  // 서버에서 받아온 데이터를 resolve로 반환
// 			  resolve(data);
// 			},
// 			error: function(error) {
// 			  // 오류 발생 시 reject로 반환
// 			  reject(error);
// 			}
// 		  });
// 		});
// 	  }
// 	});
//   });

// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/model/json/JSONModel",
// 	"sap/ui/model/resource/ResourceModel",
// 	"sap/ui/core/routing/History"
//   ], function(Controller, JSONModel, ResourceModel, History) {
// 	"use strict";
  
// 	return Controller.extend("ui5.walkthrough.controller.RequestList", {
// 	  onInit: function() {
// 		// 백엔드 서비스에서 데이터 가져오기
// 		this._loadData();
// 	  },
  
// 	  _loadData: function() {
// 		// 컴포넌트에서 OData 모델 가져오기
// 		var oModel = this.getOwnerComponent().getModel();
  
// 		// Request 엔터티에 대한 경로 정의
// 		var sPath = "/Request";
  
// 		// 데이터를 가져오기 위한 요청 만들기
// 		oModel.read(sPath, {
// 		  success: function(oData) {
// 			// JSONModel 생성 및 데이터 설정
// 			var oJSONModel = new JSONModel(oData);
// 			this.getView().setModel(oJSONModel, "requestModel");
// 		  }.bind(this),
// 		  error: function(oError) {
// 			console.error("데이터 로딩 중 오류 발생:", oError);
// 		  }
// 		});
// 	  },
  
// 	  onNavBack: function() {
// 		// 이전 페이지로 돌아가기
// 		var oHistory = History.getInstance();
// 		var sPreviousHash = oHistory.getPreviousHash();
  
// 		if (sPreviousHash !== undefined) {
// 		  window.history.go(-1);
// 		} else {
// 		  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
// 		  oRouter.navTo("overview", {}, true);
// 		}
// 	  }
// 	});
//   });
  
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/routing/History"
  ], function(Controller, JSONModel, ResourceModel, History) {
	"use strict";
  
	return Controller.extend("ui5.walkthrough.controller.RequestList", {
	  onInit: function() {
		// 백엔드 서비스에서 데이터 가져오기
		this._loadData();
	  },
  
	  _loadData: function() {
		// 컴포넌트에서 OData 모델 가져오기
		var oModel = this.getOwnerComponent().getModel();
  
		// Request 엔터티에 대한 경로 정의
		var sPath = "/Request";
  
		// 데이터를 가져오기 위한 요청 만들기
		oModel.read(sPath, {
		  success: function(oData) {
			// JSONModel 생성 및 데이터 설정
			var oJSONModel = new JSONModel(oData);
			this.getView().setModel(oJSONModel, "requestModel");
		  }.bind(this),
		  error: function(oError) {
			console.error("데이터 로딩 중 오류 발생:", oError);
		  }
		});
	  },
  
	  onNavBack: function() {
		// 이전 페이지로 돌아가기
		var oHistory = History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();
  
		if (sPreviousHash !== undefined) {
		  window.history.go(-1);
		} else {
		  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		  oRouter.navTo("overview", {}, true);
		}
	  }
	});
  });
  