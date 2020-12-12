# Building a Simple Virtual DOM from Scratch

此為學習 React.js 的 Virtual Dom 原理的學習筆記<br>
參考資料為:<br>
https://www.youtube.com/watch?v=85gJMUEcnkc&ab_channel=TechTalksYLD<br>
https://github.com/ycmjason-talks/2018-11-21-manc-web-meetup-4/blob/master/README.md

###實現

-  createElement: 模擬 React.createElement 創造一個描述 dom 節點的 object
-  render: 將描述虛擬 dom 的 object 轉化成真正的 dom 節點
-  mount: 將 render() 所產生的 dom 放置到 html 上
-  diff: 比較新舊的 virtual dom, 找出不同點, 並只針對不同點對實體 dom 進行更新

###專案使用方式

```
npm install
npm run dev
```
