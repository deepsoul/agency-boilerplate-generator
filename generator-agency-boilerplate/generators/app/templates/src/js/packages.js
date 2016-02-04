module.exports = [
    {name: "./partials/components/Header", id: require.resolve("./partials/components/Header"), controller: require("./partials/components/Header")},
    {name: "./partials/components/DragDrop", id: require.resolve("./partials/components/DragDrop"), controller: require("./partials/components/DragDrop")},
    {name: "./partials/components/ParallaxContainer", id: require.resolve("./partials/components/ParallaxContainer"), controller: require("./partials/components/ParallaxContainer")},
    {name: "./partials/components/Animation", id: require.resolve("./partials/components/Animation"), controller: require("./partials/components/Animation")},
    {name: "./partials/common/AdBlocker", id: require.resolve("./partials/common/AdBlocker"), controller: require("./partials/common/AdBlocker")},
    {name: "./partials/common/OutdatedBrowser", id: require.resolve("./partials/common/OutdatedBrowser"), controller: require("./partials/common/OutdatedBrowser")}
];
