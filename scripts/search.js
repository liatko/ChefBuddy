var myProducts = null;

    
var products = getProducts().sort();
    var app = angular.module('shefBodyApp', []);
    app.controller('list', function($scope) {
        $scope.myProducts=null;
        $scope.products=_.sortBy( products,"name");
        $scope.productDropdownText = "select product";
        $scope.lkProcuctRecipes=getLk();
        $scope.recipes = getRecepies();

        $scope.updateSelectedProduct = function(product) {
            $scope.selectedProduct=product;
            $scope.productDropdownText =product.name; 
            $("#btnAddProductToList").removeClass("disabled");
        }

        
        $scope.updateSelectedProductNew = function(product) {
            $scope.products = $scope.products.filter(p=>p.id!=product.id)
            if ($scope.myProducts==null)
            {
                $scope.myProducts=[];
            }
            $scope.myProducts.push(product);
            $scope.filterProduct="";
        }

        
        $scope.removeItem = function(product){
            $scope.myProducts=$scope.myProducts.filter(p=>p.id!=product.id);
            $scope.products.push(product);
            $scope.products= _.sortBy( $scope.products,"name");
        }

        $scope.addProductToMyList = function(){
            if ($scope.myProducts==null)
            {
                $scope.myProducts=[];
            }
            
            $scope.toggleAddProductList();
            $scope.productDropdownText = "select product";
        }

        $scope.toggleAddProductList  = function(){
            $('.overlay').toggle();;$('#addProductPopup').toggle();
        }

        $scope.findRecepies=function(){
            var myproduct = $scope.myProducts.map(p=>p.id);
            var lkFiltersRecepies= $scope.lkProcuctRecipes.filter(lk=>myproduct.indexOf( lk.productId)!=-1).sort();
            $scope.numberOfSelectedProduct = myproduct.length;
            if(lkFiltersRecepies.length==0){
                $("#noRecepiesErrorMessage").addClass("display");
                return;
            }
            $("#noRecepiesErrorMessage").removeClass("display");
            //get number of product for recipe
            var numberOfProductForRecipes = _.countBy(lkFiltersRecepies,'recepieId');
            
            // get recipes to display
            $scope.recipesFound = _.sortBy(_.map(numberOfProductForRecipes, function(value, key){
                return {
                    id: key,
                    productsCount: value,
                    name: $scope.recipes.filter(r=>r.id==key)[0].name,
                    url: $scope.recipes.filter(r=>r.id==key)[0].url,
                    percent: Math.round(value/$scope.numberOfSelectedProduct *100)
                };
            }),"productsCount").reverse();


            $scope.graphClass = function(recepy){
                if(recepy.percent>80)
                {
                    return "bg-success";
                }
                else if(recepy.percent>50)
                {
                    return "bg-warning";
                }
                return "bg-danger";
            }
            var top = document.getElementById("foundRecepies").offsetTop; //Getting Y of target element
            window.scrollTo(0, top);  
        }

        $scope.research = function(){
            var top = document.getElementById("searchRecepies").offsetTop; //Getting Y of target element
            window.scrollTo(0, top);  
        
        }
    });
