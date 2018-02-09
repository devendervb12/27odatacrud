sap.ui.controller("zproductcrud.Product", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zproductcrud.Product
*/
	onInit: function() {
		var serviceURL = "proxy/http/122.180.87.238:8000/sap/opu/odata/SAP/ZGW_BATCH25_PRODUCT_SRV/";
        var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
        this.getView().setModel(oModel);
        
	},

	onSearch : function(oEvent){
		debugger;
		var qValue = oEvent.getParameters().query;
		
		filters = [];
		
		var oFilter1 = new sap.ui.model.Filter({
			path : 'ProductID',
			operator : sap.ui.model.FilterOperator.Contains,
			value1 : qValue
		});
		
		filters.push(oFilter1);
		
		this.getView().byId("idTable").getBinding("items").filter(filters);
		
		
	},
	onselectionChange : function(oEvent){
		debugger;
		
		//grabbing product ID
		var prodId = oEvent.getParameters().listItem.getCells()[1].getText();
		
		this.getView().byId("SimpleFormDisplay354").setVisible(true);
		
		this.getView().byId("SimpleFormDisplay354").bindElement("/ProductSet('" +prodId+ "')");
		
	},
	onCreate : function(){
		// show dialog box
		
		debugger;
		var that = this;
		var odialog = new sap.m.Dialog({
			title : "Create Product",
			content : [
				new sap.m.Label({ text : "Product ID", required : true}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Name", required : true}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Category", required : true}),
				new sap.m.Input({placeholder : "Specify predefined Categories"}),
				new sap.m.Label({ text : "Supplier ID"}),
				new sap.m.Input({placeholder : "Specify existing Supplier ID"}),
				new sap.m.Label({ text : "Description"}),
				new sap.m.Input()
			],
			buttons : [
				new sap.m.Button({text : "Save & Close", press : function(oEvent){					
					// should save the data to backend
					var cData = {
							ProductID : oEvent.getSource().getParent().getContent()[1].getValue(),
							Name :      oEvent.getSource().getParent().getContent()[3].getValue(),
							Category :  oEvent.getSource().getParent().getContent()[5].getValue(),
							SupplierID : oEvent.getSource().getParent().getContent()[7].getValue(),
							Description : oEvent.getSource().getParent().getContent()[9].getValue()
					}
					
					debugger;
					//get the model
					// this.getView().getModel()
					var oModel = that.getView().getModel();
					oModel.create("/ProductSet", cData, {
						success : function(){
							sap.m.MessageToast.show("Data Created");
						},
						error : function(){
							sap.m.MessageToast.show("Data not created");
						}
					})
					
					
					
					odialog.close();
				} }),
				new sap.m.Button({ text : "Cancel", press : function(){
					odialog.close();
				}})
			]
		});
		
		odialog.open();
	},
	onUpdate : function(){
		
		// fetch the data from simpleform
		debugger;
		
		//var prodId = this.getView().byId("SimpleFormDisplay354").getContent()[3].getText();
		//var name = this.getView().byId("SimpleFormDisplay354").getContent()[1].getText();
		//var category = this.getView().byId("SimpleFormDisplay354").getContent()[5].getText();
		
		
		
		//var sPath = this.getView().byId("SimpleFormDisplay354").getBindingContext().sPath;
		
		//var supplierID = this.getView().getModel().getProperty(sPath).SupplierID;
		var oController = this;
		var odialog = new sap.m.Dialog({
			title : "Update Product",
			content : [
				new sap.m.HBox({
					items : [
						new sap.m.Label({ text : "Product ID"}),
						new sap.m.Text({text : this.getView().byId("SimpleFormDisplay354").getContent()[3].getText()}),
					
					]
				}),
					
				new sap.m.Label({ text : "Name"}),
				
				new sap.m.Input({ value : this.getView().byId("SimpleFormDisplay354").getContent()[1].getText()}),
				
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input({ value : this.getView().byId("SimpleFormDisplay354").getContent()[5].getText()}),
				
				new sap.m.Label({ text : "Supplier ID"}),
				new sap.m.Input({value : this.getView().getModel().getProperty(this.getView().byId("SimpleFormDisplay354").getBindingContext().sPath).SupplierID})
			],
			buttons : [
				new sap.m.Button({ text : "Update and Close" , press : function(oEvent){
					// get the data
					var uData = {
						Category : oEvent.getSource().getParent().getContent()[4].getValue(), 
						SupplierID : oEvent.getSource().getParent().getContent()[6].getValue(),
						Name : oEvent.getSource().getParent().getContent()[2].getValue()
					}
					
					var oModel = oController.getView().getModel();
					oModel.update("/ProductSet('"+oController.getView().byId("SimpleFormDisplay354").getContent()[3].getText()+"')",
							uData, {
						success : function(){
							sap.m.MessageToast.show("Data got Updated");
						},
						error : function(){
							sap.m.MessageToast.show("Data not Updated");
						}
						
					}			
											)
											odialog.close();
				}}),
				
				
				
				new sap.m.Button({ text : "Close", press : function(){ odialog.close()}})
			]
		});
		
		odialog.open();
	}

});











