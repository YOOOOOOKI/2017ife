$(function(){
    function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
            var dateString = rawData[i].Date;
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var r1 = dateString.replace(pattern, '$1-$2-$3');
            categoryData.push(r1);
            values.push([rawData[i].Open,rawData[i].Close,rawData[i].Low,rawData[i].High]);
            volumns.push(rawData[i].Volume);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    };
	var base = +new Date(2009,09,21);
	var oneDay = 24 * 3600 * 1000;
	var now = new Date(base);
    function addData() {
    		now = new Date(+new Date(now) + oneDay);
	        var values = [];
	        var volumns = [];     
		    nowTime = [now.getFullYear(), now.getMonth(), now.getDate()].join('-');
		    values.push((Math.random()*(29-25+1)+25).toFixed(2),(Math.random()*(29-25+1)+25).toFixed(2),(Math.random()*(29-25+1)+25).toFixed(2),(Math.random()*(29-25+1)+25).toFixed(2));
		    volumns.push(Math.floor(Math.random()*(40000-30000+1)+30000));			   		
			return {
	            categoryData: nowTime,
	            values: values,
	            volumns: volumns
			};
	};


    var myChart = echarts.init(document.getElementById('chart'));

    function set(rawData) {

        var data = splitData(rawData);

        option = {
	            backgroundColor: '#eee',
	            title:{
	                text:"A公司股价动态数据年股票数据",
	                subtext:"虚拟数据"
	            },

	            legend: {
	                bottom: 10,
	                left: 'center',
	                data: ['日K']
	            },
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: {
	                    type: 'line'
	                }
	            },
	            grid: [
	                {
	                    left: '10%',
	                    right: '8%',
	                    height: '50%'
	                },
	                {
	                    left: '10%',
	                    right: '8%',
	                    top: '63%',
	                    height: '16%'
	                }
	            ],
	            xAxis: [
	                {
	                    type: 'category',
	                    data: data.categoryData,
	                    scale: true,
	                    boundaryGap : false,
	                    axisLine: {onZero: false},
	                    splitLine: {show: false},
	                    splitNumber: 20,
	                },
	                {
	                    type: 'category',
	                    gridIndex: 1,
	                    data: data.categoryData,
	                    scale: true,
	                    boundaryGap : false,
	                    axisLine: {onZero: false},
	                    axisTick: {show: false},
	                    splitLine: {show: false},
	                    axisLabel: {show: false},
	                    splitNumber: 20,
	                }
	            ],
	            yAxis: [
	                {
	                    scale: true,
	                    splitArea: {
	                        show: true
	                    }
	                },
	                {
	                    scale: true,
	                    gridIndex: 1,
	                    splitNumber: 2,
	                    axisLabel: {show: false},
	                    axisLine: {show: false},
	                    axisTick: {show: false},
	                    splitLine: {show: false}
	                }
	            ],
	            series: [
		            {
		                name: '日K',
		                type: 'candlestick',
		                data: data.values,
		                itemStyle: {
		                    normal: {
		                        borderColor: null,
		                        borderColor0: null
		                    }
		                },
		                tooltip: {
		                    formatter: function (param) {
		                        var param = param[0];
		                        return [
		                            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
		                            'Open: ' + param.data[0] + '<br/>',
		                            'Close: ' + param.data[1] + '<br/>',
		                            'Lowest: ' + param.data[2] + '<br/>',
		                            'Highest: ' + param.data[3] + '<br/>'
		                        ].join('');
		                    }
		                }
		            },
		            {
		                name: 'Volumn',
		                type: 'bar',
		                xAxisIndex: 1,
		                yAxisIndex: 1,
		                data: data.volumns
		            }
	       		]
   		};
        
        myChart.setOption(option);

	    setInterval(function (){
	    	var dataNew = addData();

	    	var dataTime1 = option.xAxis[0].data;
	    	var dataValues = option.series[0].data;
	   		var dataVolumn = option.series[1].data;

		    dataTime1.push(dataNew.categoryData);
		    dataValues.push(dataNew.values);
		    dataVolumn.push(dataNew.volumns);
		    myChart.setOption(option);
		}, 2100);
    };
    
    set(data0);
});