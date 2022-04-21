const tf = require("@tensorflow/tfjs");
// require("@tensorflow/tfjs-node");
require('tfjs-node-save');
const data = require("../data/heart.json");

const modelSaveLocation = "../model";


// Feature selection
const dataFeatures = tf.tensor2d(
  data.map((attr) => [
    attr.age,
    attr.cp,
    attr.sex,
    attr.trestbps,
    attr.chol,
    attr.thalach,
    attr.fbs,
    attr.exang
  ])
);

// Classification problem
// Target value: 1 - Heart deases predicted
const outputData = tf.tensor2d(data.map((attr) => [attr.target]));

// build neural network using a sequential model
//sigmoid activation function is good for predicting proabblities as its resricted between 0 and 1
const model = tf.sequential();
model.add(
  tf.layers.dense({
    inputShape: [8],
    activation: "sigmoid",
    units: 9, //dimension of output space (first hidden layer)
  })
);
model.add(
  tf.layers.dense({
    inputShape: [9],
    activation: "sigmoid",
    units: 1,
  })
);
model.add(
  tf.layers.dense({
    activation: "sigmoid",
    units: 1, // output shape
  })
);

//compile the model
// tf.Keras.losses.BinaryCrossentropy() function and this method is used to generate the cross-entropy loss between predicted values and actual values.
// In TensorFlow, the binary Cross-Entropy loss is used when there are only two label classes and it also comprises actual labels and predicted labels.
model.compile({
  loss: "binaryCrossentropy",
  optimizer: "adam",
  metrics: ["accuracy"],
});

console.log(model.summary())

model
  .fit(dataFeatures, outputData, {
    epochs: 1000,
    callbacks: {
      onEpochEnd: (epoch, log) => {
        if (epoch % 10 == 0) {
          console.log(`Epoch ${epoch}: loss = ${log.loss}`);
        }
      },
    },
  })
  .then((info) => {
    // Save model
    model.save(`file://` + modelSaveLocation).then(() => {
      console.log("Model saved");
    });
  });
