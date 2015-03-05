angular.module('mainApp', ['ngDraggable']).
  controller('MainCtrl', function ($scope) {

    $scope.items = [];
    $scope.currFolderName  = "";
    $scope.folders = [{
            folderName : "firstFolder",
            itemsContained : []
        }];

    $scope.defaultFolder = {
        folderName: "Default",
        itemsContained: []
    };
    
    $scope.defaultContent = false;
    $scope.folderContent = false;
      
    $scope.createItem = function () {  
        $scope.showTable = true;
        
        var newItem = {
            itemKeyName : $scope.nameForNewItem,
            itemKeyCost : $scope.costForNewItem, 
            foldersItBelongsTo : [$scope.defaultFolder.folderName]
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

    $scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}];
    $scope.droppedObjects1 = [];
    $scope.droppedObjects2= [];
    $scope.onDropComplete1=function(data,evt){
        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1)
        $scope.droppedObjects1.push(data);
    }
    $scope.onDragSuccess1=function(data,evt){
        console.log("133","$scope","onDragSuccess1", "", evt);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects1.splice(index, 1);
        }
    }
    $scope.onDragSuccess2=function(data,evt){
        var index = $scope.droppedObjects2.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects2.splice(index, 1);
        }
    }
    $scope.onDropComplete2=function(data,evt){
        var index = $scope.droppedObjects2.indexOf(data);
        if (index == -1) {
            $scope.droppedObjects2.push(data);
        }
    }
    var inArray = function(array, obj) {
        var index = array.indexOf(obj);
    }


    //shows Default content
    $scope.showDefaultFolderGifts = function (){
        $scope.defaultContent =  !$scope.defaultContent;
    } 
});