# echart和three.js尝试
## three.js 实现绘制3d图形和阴影控制
### 展示地址：https://zhangtda.github.io/2017ife/WebGl/project-02/
## echart项目
### 自定义的统计图表 https://zhangtda.github.io/2017ife/Echarts/project-2/index.html
### 可视化前的数据预处理 https://zhangtda.github.io/2017ife/Echarts/project-4/index.html
### 动态数据 https://zhangtda.github.io/2017ife/Echarts/project-5/index.html

### 可视化数据处理学习笔记
一，数据预处理：CSV格式转换为JSON格式
				这次任务给定的是一个csv格式的txt文件，并进行数据可视化操作。其实我们平时最容易获得的数据也是从excel文件导出的CSV格式的数据。所以将CSV格式的数据转换为JSON等前端常用数据就很必要。
				这次数据量很大，高达5MB左右，如果使用在线转换器的话很慢，而且容易导致浏览器奔溃。所以选择NODE进行本地转换效率会高很多。这次我选用node-csvtojson插件进行转换。github地址：https://github.com/Keyang/node-csvtojson 。
				1.首先安装node-csvtojson，再项目文件夹下输入`npm i --save csvtojson`并执行。
				2.这里要注意，在转换前，在csv文件的头部插入一行，可指定json文件key名。这个文件即：`Date, Ticker, Open, High, Low, Close, Volume`。否则转换中插件会自动把第一行数据最为json中的key名进行转换。
				3.在node环境下输入 `csvtojson source.csv > converted.json` 并执行。期中source.csv替换为你的csv文件的地址。converted.json替换为你希望导出的文件。然后按enter执行。
				4.这时你设定的json文件中应该已经包含转换过来的json数据了。观察其格式为[{"key":"value"},{}....]。
二，将JSON数据引入并转换为适合Echart的数据

```
function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
						//将json中yyyymmdd格式的时间转换为yyyy-mm-dd格式
						var dateString = rawData[i].Date;
            var pattern = /(d{4})(d{2})(d{2})/;
            var dateNewType = dateString.replace(pattern, '$1-$2-$3');
            categoryData.push(dateNewType);
						//股价数据，按开盘价，收盘价，最低价和最高价的顺序传入，以一个数组进行包裹
            values.push([rawData[i].Open,rawData[i].Close,rawData[i].Low,rawData[i].High]);
            //销量数据
						volumns.push(rawData[i].Volume);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    };
```
编写上面的函数处理JSON数据，返回  categoryData，values，volumns分别作为x轴时间，股票价格数据，和销量。
三，将数据填入并渲染
此次数据量较大，最好是搭建服务器并通过ajax进行异步更新然后渲染，以避免出现页面等待现象。但条件不够也可以直接通过<script>标签引入数据。然后在series里data属性中设定数据。并加入datazoom和brush组件，设置合适的距离。
