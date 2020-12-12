/**
 * createElement 模擬 React.createElement
 * 將
 * <div title="some title">text</div>
 * 轉譯成
 * {
 *    "div",
 *    attrs: {
 *        title:"some title"
 *    },
 *     children:[
 *       "text"
 *   ]
 * }
 */
function createElement(tagName, { attrs = {}, children = [] } = {}) {
   return {
      tagName,
      attrs,
      children,
   };
}

export default createElement;
