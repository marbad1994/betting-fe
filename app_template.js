var app = angular.module('postserviceApp', []);
app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

let url = "<PLACEHOLDER_PUBLIC_HOST>"
app.controller('postserviceCtrl', function($scope, $http) {
    $scope.hide = true
    $scope.one = null;
    $scope.cross = null;
    $scope.two = null;
    $scope.bonus = null;
    $scope.postdata = function(one, cross, two, bonus, safe) {
        $scope.hide = false;
        var data = {
            "1": one,
            "X": cross,
            "2": two,
            "bonus": bonus
        };
        if (safe === true) {
            url = `${url}:5000/safebet`
            console.log("SAFE")
        } else {
            url = `${url}:5000/bet`
            console.log("NOTSAFE")
        }

        console.log(data)
        $http({
            method: "POST",
            url: url,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response) {
            if (response.data)
                $scope.msg = "Post data submitted successfully!";
            $scope.bonus = parseInt(response.data.bonus);
            $scope.crossBet = parseInt(response.data.crossBet) + $scope.bonus;
            $scope.oneBet = response.data.oneBet;
            $scope.twoBet = response.data.twoBet;
            $scope.winningsOnCross = response.data.winningsOnCross;
            $scope.winningsOnOne = response.data.winningsOnOne;
            $scope.winningsOnTwo = response.data.winningsOnTwo;
        }, function(response) {
            $scope.msg = "Service does not exist";
            $scope.statusval = response.status;
            $scope.statustext = response.msg;
            $scope.headers = response.headers();

        })
    }
})