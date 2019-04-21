from math import exp
from random import random


# Initialize a network
def initialize_network(input_num, hidden_num, output_num):
    net_work = []
    # each neuron in the hidden layer has n_inputs + 1 weights, one for each input number
    # and an additional one for the bias.
    hidden_layer = [{'weights': [random() for i in range(input_num + 1)]} for i in range(hidden_num)]
    net_work.append(hidden_layer)
    output_layer = [{'weights': [random() for i in range(hidden_num + 1)]} for i in range(output_num)]
    net_work.append(output_layer)
    return net_work


# Calculate neuron activation for an input
def calculate_activate(weights, inputs):
    activation = weights[-1]
    for i in range(len(weights)-1):
        activation += weights[i] * inputs[i]
    # use the sigmoid function to calculate the activate function
    return 1.0 / (1.0 + exp(-activation))


# Forward propagate input to a network output
def forward_propagate(net_work, row):
    inputs = row
    for current_layer in net_work:
        new_inputs = []
        for neuron in current_layer:
            neuron['output'] = calculate_activate(neuron['weights'], inputs)
            new_inputs.append(neuron['output'])
        inputs = new_inputs
    return inputs


# Calculate the derivation ot the sigmoid function
def calculate_derivative(x):
    return x * (1.0 - x)


# apply the BP algorithm
def back_propagation(net_work, expect):
    for i in reversed(range(len(net_work))):
        current_layer = net_work[i]
        errors = list()
        if i != len(net_work) - 1:
            for j in range(len(current_layer)):
                error = 0.0
                for neuron in net_work[i + 1]:
                    error += (neuron['weights'][j] * neuron['delta'])
                errors.append(error)
        else:
            for j in range(len(current_layer)):
                neuron = current_layer[j]
                errors.append(expect[j] - neuron['output'])
        for j in range(len(current_layer)):
            neuron = current_layer[j]
            neuron['delta'] = errors[j] * calculate_derivative(neuron['output'])


# Update network weights with error
def update_weights(net_work, row, l_rate):
    for i in range(len(net_work)):
        inputs = row[:-1]
        if i != 0:
            inputs = [neuron['output'] for neuron in net_work[i - 1]]
        for neuron in net_work[i]:
            for j in range(len(inputs)):
                neuron['weights'][j] += l_rate * neuron['delta'] * inputs[j]
            neuron['weights'][-1] += l_rate * neuron['delta']


# Train a network for a fixed number of epochs
def train_network(net_work, train, l_rate, n_epoch, n_outputs):
    for epoch in range(n_epoch):
        sum_error = 0
        for row in train:
            outputs = forward_propagate(net_work, row)
            expect = [0 for i in range(n_outputs)]
            expect[row[-1]] = 1
            sum_error += sum([(expect[i] - outputs[i]) ** 2 for i in range(len(expect))])
            back_propagation(net_work, expect)
            update_weights(net_work, row, l_rate)
        # print('>epoch=%d, lrate=%.3f, error=%.3f' % (epoch, l_rate, sum_error))


# Predict the value of the function
def predict(network, row):
    outputs = forward_propagate(network, row)
    return outputs.index(max(outputs))


'''
dataset = [[0.457, 0.661, 0.44, 0.0, 0.128, 0.8482666666666667, 0.0803, 0.352, 0.5997480000000001, 0],
         [0.0192, 0.631, 0.696, 0.0, 0.0554, 0.9071333333333333, 0.348, 0.621, 0.371764, 0],
         [0.716, 0.639, 0.676, 0.906, 0.121, 0.72845, 0.0388, 0.523, 0.472012, 0],
         [0.0334, 0.459, 0.828, 0.0, 0.872, 0.8772666666666666, 0.168, 0.57, 0.30019999999999997, 0],
         [0.0165, 0.651, 0.696, 0.0, 0.0694, 0.9050833333333334, 0.36, 0.627, 0.371584, 0],
         [0.436, 0.494, 0.559, 0.0, 0.164, 0.90925, 0.0565, 0.264, 0.476988, 0],
         [0.0217, 0.472, 0.918, 0.0, 0.105, 0.9588833333333333, 0.0707, 0.388, 0.488832, 0],
         [0.462, 0.595, 0.657, 0.000597, 0.437, 0.8916999999999999, 0.183, 0.718, 0.6243719999999999, 0],
         [0.0323, 0.824, 0.396, 0.00289, 0.108, 0.83895, 0.332, 0.252, 0.47221199999999997, 0],
         [0.209, 0.488, 0.398, 0.0239, 0.0852, 0.77205, 0.0463, 0.357, 0.454072, 0],
         [0.18, 0.906, 0.382, 0.0, 0.113, 0.7851666666666667, 0.269, 0.391, 0.4161, 1],
         [0.161, 0.753, 0.66, 0.0, 0.236, 0.8909666666666667, 0.133, 0.182, 0.380012, 1],
         [0.0691, 0.719, 0.704, 0.0, 0.166, 0.9212666666666667, 0.0476, 0.628, 0.532008, 1],
         [0.482, 0.714, 0.754, 4.37e-05, 0.0438, 0.88325, 0.0376, 0.866, 0.40112000000000003, 1]]

n_inputs = len(dataset[0]) - 1
n_outputs = 2
network = initialize_network(n_inputs, 4, n_outputs)
train_network(network, dataset, 0.5, 200, n_outputs)

for row in dataset:
    prediction = predict(network, row)
    print('Expected=%d, Got=%d' % (row[-1], prediction))
'''