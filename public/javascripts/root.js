angular.module('mainApp', ['ngDraggable']).
  controller('MainCtrl', function ($scope) {

    // initializes variables through $scope for items and folders
    $scope.items = [];
    $scope.currentFolder = "";
    $scope.folders = [ ];

    // Default folder declaration
    $scope.defaultFolder = {
        folderName: "Default",
        itemsContained: []
    };

    // Boolean for preview of content
    $scope.defaultContent = false;
      
    // Method for ng-click directive that creates new item/gift
    $scope.createItem = function () {  
        $scope.showTable = true;
        
        // Instantiation of new item object from form
        var newItem = {
            itemKeyName : $scope.nameForNewItem,
            itemKeyCost : $scope.costForNewItem
        }
        
        // Appending to the list of items and folders' update
        $scope.items.push(newItem);
        $scope.defaultFolder.itemsContained.push(newItem);

        // Re-set form inputs to "null"
        $scope.nameForNewItem = null;
        $scope.costForNewItem = null;
    };
    
    // Creates new folder
    $scope.createFolder = function () { 
        
        // Instantiation of new folder object from form
        var newFolder = {
            folderName : $scope.nameForNewFolder,
            itemsContained : []
        }       
        
        // Append and reset folders array and the input form tag
        $scope.folders.push(newFolder);
        $scope.nameForNewFolder= null;
    };

    // Methods handling drag-n-drop process
    $scope.onDropComplete1=function(data,evt){
        var index = $scope.defaultFolder.itemsContained.indexOf(data);
        if (index == -1){
            $scope.defaultFolder.itemsContained.push(data);
        }
    }

    $scope.onDragSuccess1=function(data,evt){
        var index = $scope.defaultFolder.itemsContained.indexOf(data);
        if (index > -1) {
            $scope.defaultFolder.itemsContained.splice(index, 1);
        }
    }

    $scope.onDragSuccess2=function(data,evt, folderName){
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
        angular.forEach($scope.folders, function(value, key) {
            if(value.folderName === folderName){
                index = value.itemsContained.indexOf(data)
                if (index == -1) {
                    value.itemsContained.push(data);
                }
            }
        })
    }

    //shows Default content
    $scope.showDefaultFolderGifts = function (){
        $scope.defaultContent =  !$scope.defaultContent;
    }

    // shows content of folder
    $scope.showFolder = function (folderName){
        // validates folder identity
        if (folderName === $scope.currentFolder){
            return true;
        }
        return false;
    }

    // Method finding folder
    $scope.findCurrentFolder = function(folderClicked){
        $scope.currentFolder = folderClicked;
    }
});