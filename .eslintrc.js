module.exports = {
    root: true,
    env: {
        "node": true,
        "browser": true,
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "rules": {
        "indent": [2, 4, {SwitchCase: 1}],
        "quotes": [2, "double"],
        "consistent-return": [0, {"treatUndefinedAsUnspecified": true}],
        "curly": [2, "all"],
        "semi": [2, "always"],
        "space-before-function-paren": [2, {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }]
    }
};

/**
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */
