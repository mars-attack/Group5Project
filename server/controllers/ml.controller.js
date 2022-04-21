const tf = require("@tensorflow/tfjs");
// const tf_node = require("@tensorflow/tfjs-node");
require("tfjs-node-save");
const modelLocation = "./ml/model/model.json";

exports.predict = async (req, res) => {
  let data = req.body;
  // Load model
  const model = await tf.loadLayersModel(`file://` + modelLocation);

  const testData = [data];

  // set up test data
  const testDataTf = tf.tensor2d(
    testData.map((attr) => [
      attr.age,
      attr.sex,
      attr.cp,
      attr.trestbps,
      attr.chol,
      attr.fbs,
      attr.thalach,
      attr.exang,
    ])
  );
  console.log(testData);
  const results = model.predict(testDataTf);
  results.array().then((array) => {
    console.log(array);
    res.json(array[0][0]);
  });
};
