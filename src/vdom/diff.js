import render from "./render";

const zip = (xs, ys) => {
   const zipped = [];
   for (let i = 0; i < Math.max(xs.length, ys.length); i++) {
      zipped.push([xs[i], ys[i]]);
   }
   return zipped;
};

const diffAttrs = (oldAttrs, newAttrs) => {
   const patches = [];

   // set new attributes
   for (const [k, v] of Object.entries(newAttrs)) {
      patches.push(($node) => {
         $node.setAttribute(k, v);
         return $node;
      });
   }

   // remove old attributes
   for (const k in oldAttrs) {
      if (!(k in newAttrs)) {
         patches.push(($node) => {
            $node.removeAttribute(k);
            return $node;
         });
      }
   }

   return ($node) => {
      for (const patch of patches) {
         patch($node);
      }
   };
};

const diffChildren = (oldVChildren, newVChildren) => {
   const childPatches = [];
   oldVChildren.forEach((oldVChild, i) => {
      childPatches.push(diff(oldVChild, newVChildren[i]));
   });

   const additionalPatches = [];
   for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
      additionalPatches.push(($node) => {
         $node.appendChild(render(additionalVChild));
         return $node;
      });
   }

   return ($parent) => {
      for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
         patch(child);
      }

      for (const patch of additionalPatches) {
         patch($parent);
      }

      return $parent;
   };
};

/**
 * function diff 對比新舊的virtual dom, 找出不同點, 並針對不同點進行dom的更新
 * return 一個 patch function 對不同情況做處理
 * @param {*} vOldNode
 * @param {*} vNewNode
 */
const diff = (vOldNode, vNewNode) => {
   //此情況為舊的 vNode 將被刪除
   if (vNewNode === undefined) {
      return ($node) => {
         $node.remove();
         return undefined;
      };
   }

   //新舊節點的其中之一為字串
   if (typeof vOldNode === "string" || typeof vNewNode === "string") {
      if (vOldNode !== vNewNode) {
         //不同就直接用新的取代舊的
         return ($node) => {
            const $newNode = render(vNewNode);
            $node.replaceWith($newNode);
            return $newNode;
         };
      } else {
         //相同的話就不必做任何處理
         return ($node) => undefined;
      }
   }

   //tag name不同就直接當作是全新的, 直接用新的取代舊的
   if (vOldNode.tagName !== vNewNode.tagName) {
      return ($node) => {
         const $newNode = render(vNewNode);
         $node.replaceWith($newNode);
         return $newNode;
      };
   }

   //對 Attrs
   const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
   const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

   return ($node) => {
      patchAttrs($node);
      patchChildren($node);
      return $node;
   };
};

export default diff;
