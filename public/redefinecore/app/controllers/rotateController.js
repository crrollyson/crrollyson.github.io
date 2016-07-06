(function(){

	var RotateController = function($scope) {

			$scope.components = [{
				quote: "We've always been over-the-top pleased with the products and services ... The functionality, customized reporting capabilities, ease-of-use, and robustness of SilverLake was our first big Jack Henry Banking 'wow.'",
				cite: "Todd Nagel, President/CEO, River Valley Bank"
			}, {
				quote: "SilverLake and its many complementary solutions and services allow us to offer more to our customers.",
				cite: "Thomas Mathe, Senior Vice President/CTO, First Commonwealth Bank"
			}, {
				quote: "Our customers want access to the financial products and services offered at larger banks with the same community bank feel to which they are accustomed. The SilverLake System provides us with the technology to deliver just that.",
				cite: "Wade Peery, Senior VP of Operations and Technology, FirstBank (Nashville, TN)"
			}, {
				quote: "Jack Henry Banking's SilverLake System will provide a more holistic view of each customer from a single screen, enabling our team to better understand the entire relationship. That knowledge will directly translate to us optimizing each customer interaction to ensure it's meaningful for us and for the customer.",
				cite: "Darrell Schmith, Executive Vice President and CFO, First PREMIER Bank (Sioux Falls, SD)"
			}];

	};

	RotateController.$inject = ['$scope'];

	angular.module('dyxjweaApp')
		.controller('RotateController', RotateController);

}());
