// 创建文本节点
function createTextNode(nodeValue) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue,
      children: [],
    },
  }
}

// 创建节点
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => (typeof child === 'string' ? createTextNode(child) : child)),
    },
  }
}

// 渲染节点树
function render(el, container) {
  // 1. 创建节点
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)
  // 2.设置节点属性
  Object.keys(el.props).forEach(key => {
    if (key !== 'children') {
      dom[key] = el.props[key]
    }
  })
  // 3.设置节点子节点
  const children = el.props.children
  children.forEach(child => {
    // 递归处理
    render(child, dom)
  })
  // 4.添加到dom上
  container.append(dom)
}

const React = {
  createElement,
  render,
}

export default React
