angular.module('mainApp', ['ngDraggable']).
  controller('MainCtrl', function ($scope) {

    $scope.items = [];
    $scope.currentFolder = "";
    $scope.folders = [ ];
    $scope.defaultFolder = {
        folderName: "Default",
        itemsContained: []
    };

    $scope.defaultContent = false;
      
    $scope.createItem = function () {  
        $scope.showTable = true;
        
        var newItem = {
            itemKeyName : $scope.nameForNewItem,
            itemKeyCost : $scope.costForNewItem
        }
        
        $scope.items.push(newItem);
        $scope.defaultFolder.itemsContained.push(newItem);
        $scope.nameForNewItem = null;
        $scope.costForNewItem = null;
    };
    
    // Creates new folder
    $scope.createFolder = function () { 
        
        var newFolder = {
            folderName : $scope.nameForNewFolder,
            itemsContained : []
        }       
        
        $scope.folders.push(newFolder);
        $scope.nameForNewFolder= null;
    };

    $scope.centerAnchor = true;

    $scope.toggleCenterAnchor = function () {
        $scope.centerAnchor = !$scope.centerAnchor
    }

    $scope.droppedObjects1 = [];
    $scope.droppedObjects2= [];

    $scope.onDropComplete1=function(data,evt){
        var index = $scope.defaultFolder.itemsContained.indexOf(data);
        if (index == -1){
            $scope.defaultFolder.itemsContained.push(data);
        }
    }

    $scope.onDragSuccess1=function(data,evt){
        console.log("133","$scope","onDragSuccess1", "", evt);
        var index = $scope.defaultFolder.itemsContained.indexOf(data);
        if (index > -1) {
            $scope.defaultFolder.itemsContained.splice(index, 1);
        }
    }

    $scope.onDragSuccess2=function(data,evt, folderName){
        console.log("onDragSuccess2", folderName);
        angular.forEach($scope.folders, function(value, key) {
            if(value.folderName === folderName){
                index = value.itemsContained.indexOf(data)
                if (index > -1) {
                    value.itemsContained.splice(index, 1);
                }
            }
        })
    }

    $scope.onDropComplete2=function(data,evt, folderName){
        console.log("onDropComplete2", folderName)
        angular.forEach($scope.folders, function(value, key) {
            if(value.folderName === folderName){
                index = value.itemsContained.indexOf(data)
                if (index == -1) {
                    value.itemsContained.push(data);
                }
            }
        })
    }

    var inArray = function(array, obj) {
        var index = array.indexOf(obj);
    }

    //shows Default content
    $scope.showDefaultFolderGifts = function (){
        $scope.defaultContent =  !$scope.defaultContent;
    }

    $scope.showFolder = function (folderName){
        if (folderName === $scope.currentFolder){
            return true;
        }
        return false;
    }

    $scope.findCurrentFolder = function(folderClicked){
        $scope.currentFolder = folderClicked;
    }
});