/**
 *
 * @param {*} param0
 */
const renderElem = ({ tagName, attrs, children }) => {
   const $el = document.createElement(tagName);

   // set attributes
   for (const [k, v] of Object.entries(attrs)) {
      $el.setAttribute(k, v);
   }

   // set children
   for (const child of children) {
      const $child = render(child);
      $el.appendChild($child);
   }

   return $el;
};

/**
 * render function 將描述虛擬 dom 的 object 轉化成真正的 dom 節點
 * @param {Object} vNode
 */
const render = (vNode) => {
   if (typeof vNode === "string") {
      return document.createTextNode(vNode);
   }

   return renderElem(vNode);
};

export default render;
