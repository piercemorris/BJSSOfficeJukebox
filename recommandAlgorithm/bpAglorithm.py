from math import exp
from random import seed
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
        print('>epoch=%d, lrate=%.3f, error=%.3f' % (epoch, l_rate, sum_error))


# Predict the value of the function
def predict(network, row):
    outputs = forward_propagate(network, row)
    return outputs.index(max(outputs))


dataset = []

n_inputs = len(dataset[0]) - 1
n_outputs = len(set([row[-1] for row in dataset]))
network = initialize_network(n_inputs, 2, n_outputs)
train_network(network, dataset, 0.5, 20, n_outputs)

for row in dataset:
    prediction = predict(network, row)
    print('Expected=%d, Got=%d' % (row[-1], prediction))