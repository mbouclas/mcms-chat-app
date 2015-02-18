function lodash(){
    return window._;
}

function momentService(){
    return window.moment;
}

function slugifyService(){
    return window.slug;
}

logger.$inject = ['$log'];

function logger($log) {
    var service = {
        info : info,
        error : error,
        success : success,
        warning : warning
    };

    return service;

    function info(message,data){
        $log.info('Info : ' + message,data);
    }

    function error(message,data){
        $log.error('Info : ' + message,data);
    }

    function success(message,data){
        $log.success('Info : ' + message,data);
    }

    function warning(message,data){
        $log.warning('Info : ' + message,data);
    }
}

pageTitle.$inject = ['$rootScope','$timeout'];
QS.$inject = ['$location','lodash'];

function pageTitle($rootScope,$timeout){
    var service = {
        title : '',
        set : function(title){
            this.title = title;
            //wait for the DOM basically
            $timeout(function(){
                 $rootScope.$broadcast('set.pageTitle',title);
            });

        },
        get : function() {
            return this.title;
        }
    };

    return service;
}

function QS($location,lodash){

    return {
        setupFiltersFromQueryString : function(filters){
            var params = $location.search();
            lodash.each(params,function(value,key){
                if (typeof filters[key] != 'undefined'){
                    filters[key].value = value;
                }
            });

            return filters;
        },
        setupQueryString : function(filters,include) {
            var params = {},
                QS = $location.search(),
                Query = {};

            for (var a in filters){
                if (filters[a].value){
                    Query[a] = filters[a].value;
                }
            }

            if (include) {
                Query = lodash.merge(include,Query);
            }

            $location.search(Query);
            return Query;
        }
    };
}