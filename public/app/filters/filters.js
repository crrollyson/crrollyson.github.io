angular.module('dyxjweaApp').filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);
angular.module('dyxjweaApp').filter('trust', function($sce) {
	return function (val) {
		return $sce.trustAsHtml(val);
	};
});
angular.module('dyxjweaApp').filter('hyphenToSpace', function() {
	return function (value) {
		return value && value.replace(/-/g, ' ');
	}
});

angular.module('dyxjweaApp').filter('spaceToHyphen', function() {
	return function (value) {
		return value && value.replace(/\s+/g, '-');
	}
});
angular.module('dyxjweaApp').filter('trimAtHyphen', function() {
	return function (value) {
		var result = value.split("-");
		return result[0];
	}
});
angular.module('dyxjweaApp').filter('capitalize', function() {
	return function (value, all) {
    	return (!!value) ? value.replace(/([^\W_]+[^\s-]*) */g,
      		function (value) {
      			return value.charAt(0).toUpperCase() + value.substr(1);
      		}) : '';
    }
});