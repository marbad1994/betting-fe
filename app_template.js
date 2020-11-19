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
    $scope.hide = true;
    buttonHideToggle();
    $scope.one = null;
    $scope.cross = null;
    $scope.two = null;
    $scope.bonus = null;

    $scope.postdata = function(one, cross, two, bonus, safe) {
        $scope.buttonHide = false;
        if (bonus === null) {
            bonus = 500;
        };
        var data = {
            "1": one,
            "X": cross,
            "2": two,
            "bonus": bonus
        };
        if (safe === true) {
            url_api = `${url}:5000/safebet`
        } else {
            url_api = `${url}:5000/bet`
        }

        $http({
            method: "POST",
            url: url_api,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response) {
            if (response.data) {
                document.getElementById("output-message").className = "alert-warning";
                $scope.msg = response.data.msg;
                if (response.data.status == 200) {
                    document.getElementById("output-message").className = "alert-success";
                    $scope.hide = false;
                    $scope.bonus = parseInt(response.data.bonus);
                    $scope.crossBet = parseInt(response.data.crossBet) + $scope.bonus;
                    $scope.oneBet = response.data.oneBet;
                    $scope.twoBet = response.data.twoBet;
                    $scope.winningsOnCross = response.data.winningsOnCross;
                    $scope.winningsOnOne = response.data.winningsOnOne;
                    $scope.winningsOnTwo = response.data.winningsOnTwo;
                }
            }

        }, function(response) {
            document.getElementById("output-message").className = "alert-danger";
            $scope.msg = "Service does not exist";
            $scope.statusval = response.status;
            $scope.statustext = response.msg;
            $scope.headers = response.headers();

        })


    }



})

function buttonHideToggle() {
    var x = document.getElementById("output-message");
    var y = document.getElementById("output-button")
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
    } else {
        x.style.display = "none";
        y.style.display = "none";
    }
}