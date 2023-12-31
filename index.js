/**
 * @type {import('postcss').PluginCreator}
 */

module.exports = () => {
  const largeSize = 992;
  const mediumSize = 768;
  const smallSize = 576;

  return {
    postcssPlugin: "postcss-responsive-value",
    Root(root) {
      const largeScreenStyles = {};
      const mediumScreenStyles = {};
      const smallScreenStyles = {};
      let largeStyleRawString = "";
      let mediumStyleRawString = "";
      let smallStyleRawString = "";
      root.walkRules((rule) => {
        const nodes = rule.root().nodes;
        nodes.forEach((node) => {
          node.nodes.forEach((innerNode) => {
            if (innerNode.toString().includes("|")) {
              let rawValue = innerNode.value;
              rawValue = rawValue.replace(/\s/g, "");
              const arrayValues = rawValue.split("|");
              if (arrayValues && arrayValues[0]) {
                innerNode.value = arrayValues[0];
              }
              if (arrayValues[1]) {
                if (largeScreenStyles[node.selector]) {
                  largeScreenStyles[node.selector] = [
                    ...largeScreenStyles[node.selector],
                    { prop: innerNode.prop, value: arrayValues[1] },
                  ];
                } else {
                  largeScreenStyles[node.selector] = [
                    { prop: innerNode.prop, value: arrayValues[1] },
                  ];
                }
              }
              if (arrayValues[2]) {
                if (mediumScreenStyles[node.selector]) {
                  mediumScreenStyles[node.selector] = [
                    ...mediumScreenStyles[node.selector],
                    { prop: innerNode.prop, value: arrayValues[2] },
                  ];
                } else {
                  mediumScreenStyles[node.selector] = [
                    { prop: innerNode.prop, value: arrayValues[2] },
                  ];
                }
              }
              if (arrayValues[3]) {
                if (smallScreenStyles[node.selector]) {
                  smallScreenStyles[node.selector] = [
                    ...smallScreenStyles[node.selector],
                    { prop: innerNode.prop, value: arrayValues[3] },
                  ];
                } else {
                  smallScreenStyles[node.selector] = [
                    { prop: innerNode.prop, value: arrayValues[3] },
                  ];
                }
              }
            }
          });
        });
      });
      if (largeScreenStyles && Object.keys(largeScreenStyles).length) {
        Object.keys(largeScreenStyles).forEach(function (key) {
          const styleArray = largeScreenStyles[key];
          largeStyleRawString += startingStyleText(key);
          const styleData = styleDataGenerate(styleArray);
          largeStyleRawString += endingStyleText(styleData);
        });
        root.append(breakPointText(largeSize, largeStyleRawString));
      }
      if (mediumScreenStyles && Object.keys(mediumScreenStyles).length) {
        Object.keys(mediumScreenStyles).forEach(function (key) {
          const styleArray = mediumScreenStyles[key];
          mediumStyleRawString += startingStyleText(key);
          const styleData = styleDataGenerate(styleArray);
          mediumStyleRawString += endingStyleText(styleData);
        });
        root.append(breakPointText(mediumSize, mediumStyleRawString));
      }
      if (smallScreenStyles && Object.keys(smallScreenStyles).length) {
        Object.keys(smallScreenStyles).forEach(function (key) {
          const styleArray = smallScreenStyles[key];
          smallStyleRawString += startingStyleText(key);
          const styleData = styleDataGenerate(styleArray);
          smallStyleRawString += endingStyleText(styleData);
        });
        root.append(breakPointText(smallSize, smallStyleRawString));
      }
    },
  };
};

const breakPointText = (size, text) =>
  `\n @media screen and (min-width: ${size}px)\n{\n${text}\n}\n `;

const startingStyleText = (key) => `${key}{\n`;

const endingStyleText = (styleData) => `${styleData}}\n`;

const styleDataGenerate = (array) =>
  array.map((style) => `  ${style.prop}: ${style.value};\n`).join("");

module.exports.postcss = true;
