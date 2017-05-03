(function(global){
    function compare(a, b) {
        if (a.rank > b.rank) {
              return -1;
        }
        if (a.rank < b.rank) {
              return 1;
        }
        return 0;
    }

    function registerResult(raw, results, values){
        for(var i = 0; i < raw.length; i++){
            var val = raw[i];
            if(values.includes(val)){
                results[values.indexOf(val)].rank++;
            }else{
                values.push(val);
                results.push(new SearchResult(val));
            }
        }
    }

    function SearchEngine(){
        var index = [];
        this.add = function(key,value){
            if(key){
                for(var i = 0; i < index.length; i++){
                    var pair = index[i];
                    if(key == pair[0]){
                        //there are results for "key". Add another and return.
                        pair[1].push(value);
                        return;
                    }
                }
                //there are no results for "key". Create result list.
                var pair = [key,[value]];
                index.push(pair);
            }
        };
        this.query = function(query){
            var result = [];
            var values = [];
            for(var i = 0; i < query.length; i++){
                var q = query[i].trim();
                if(q){
                    for(var k = 0; k < index.length; k++){
                        var pair = index[k];
                        if(pair[0].toLowerCase().includes(q.toLowerCase())){
                            registerResult(pair[1], result, values);
                        }
                    }
                }
            }
            //TODO sort
            result.sort(compare);
            return result;
        };
    }

    function SearchResult(value){
        this.rank = 0;
        this.getValue = function(){
            return value;
        };
    }
    
    global.SearchEngine = SearchEngine;
})(this);
