angular.module('MagicRealm')
  .controller('SearchModalCtrl', function ($scope, $modalInstance, items, text) {
    $scope.items = items;
    $scope.text = text;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});
