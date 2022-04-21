try {
    module.exports = require(`./env/${process.env.NODE_ENV}.js`);
} catch (err) {
    console.error("Couldn't load environment's config:", err);
}
