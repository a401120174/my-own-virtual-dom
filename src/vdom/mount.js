/**
 * mount function 將 $target 替換為 $node
 */
export default ($node, $target) => {
   $target.replaceWith($node);
   return $node;
};
