sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.UpdatePage", {
        onInit() {


        },

        fetchData() {
            const inputValue = this.byId("myInput").getValue();
            console.log('입력된 값:', inputValue);
            var inputQuantity = document.getElementById('inputQuantity');
            const url = `https://port4004-workspaces-ws-cbkhj.ap21.trial.applicationstudio.cloud.sap/odata/v4/invoice/Invoice?$filter=invoice_product eq '${inputValue}'`;
            // Ajax 요청
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log('서버 응답:', data);
                    this.fetchedData = data;
                    console.log(data.value[0].invoice_quantity);
                    if (inputQuantity !== null) {
                        if (data.value[0]) {
                            inputQuantity.value = data.value[0].invoice_quantity;
                        }
                    }
                    
                }.bind(this),
                error: function (error) {
                    console.error('에러 발생:', error);
                }
            });

           

        },
        updateQuantityButtom() {
            const data = this.fetchedData;
            
            const inputQuantity = parseInt(this.byId("inputQuantity").getValue());
            const updatedData = {
                invoice_quantity : inputQuantity
            };

            
            
            $.ajax({
                url: 'https://port4004-workspaces-ws-cbkhj.ap21.trial.applicationstudio.cloud.sap/odata/v4/invoice/Invoice/' + data.value[0].invoice_number
                ,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: function() {
                   console.log("업데이트 성공");
                },
                error: function(error) {
                    console.error('아이템을 수정하는 중 에러 발생:', error);
                }
            });
            
        },

        onObjectMatched(oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        }
    });
});