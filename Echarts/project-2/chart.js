$(function(){
     var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        option = {
        	title: {
        		text:'某地降水情况',
        		padding: [0,0,15,0],
        	},
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    magicType: {show: true, type: ['line', 'bar']},
                }
            },
            legend: {
                data:['蒸发量','降水量','平均温度'],
                backgroundColor: '#ccc',
                borderColor: '#808080'
            },
            xAxis: [
                {
                    type: 'category',
                    data: [{
                    	value:'1月',
                    	textStyle:{
                    		fontSize:20,
                    		color:'#f00'
                    	}
                    },'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],

                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '水量',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [
            	{
                    name:'蒸发量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name:'降水量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name:'平均温度',
                    type:'line',
                    yAxisIndex: 1,
                    data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ],
            color:['#ca8622', '#bda29a','#6e7074'],
            backgroundColor:'#7CCD7C',
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
})