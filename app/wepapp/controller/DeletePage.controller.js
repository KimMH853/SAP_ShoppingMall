sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.DeletePage", {
        onInit() {


        },

        deleteFetchData() {
            const inputValue = this.byId("delete").getValue();
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
                    console.log(data.value[0].invoice_number);
                    
                    
                }.bind(this),
                error: function (error) {
                    console.error('에러 발생:', error);
                }
            });

           

        },
        delelteButton() {
            const data = this.fetchedData;
            console.log(data.value[0].invoice_number)
            const deleteNumber = parseInt(data.value[0].invoice_number)
            
            $.ajax({
                url: 'https://port4004-workspaces-ws-cbkhj.ap21.trial.applicationstudio.cloud.sap/odata/v4/invoice/Invoice/' + deleteNumber,
                type: 'DELETE',
                success: function(response) {
                    console.log('상품 ID ' + data.value[0].invoice_number + '이(가) 성공적으로 삭제되었습니다.', response);
                },
                error: function(error) {
                    console.error('삭제 중 에러 발생:', error);
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